/* ============================================================
   playground.js — 3-qubit circuit sandbox with puzzles.

   The circuit is a plain list of ops. The state is rebuilt from
   scratch on every change, which makes undo trivial and keeps
   the displayed state guaranteed consistent with the diagram.
   ============================================================ */

(function () {
  'use strict';

  var N = 3;
  var STORE_KEY = 'sqs_puzzles_v1';

  var ops = [];          // [{type:'1', gate:'H', q:0} | {type:'c', gate:'X', c:0, t:1}]
  var state = new QSim.State(N);
  var activeQubit = 0;
  var shots = {}, shotTotal = 0;
  var activePuzzle = null;
  var solved = loadSolved();

  function el(id) { return document.getElementById(id); }

  /* ---------- puzzle definitions ----------
     Each `check` receives the state and the op list and returns
     true when the goal is reached. Tolerances are loose enough
     that any correct route counts. */

  function near(a, b, tol) { return Math.abs(a - b) < (tol || 0.02); }
  function prob(s, i) { return s.re[i]*s.re[i] + s.im[i]*s.im[i]; }

  var PUZZLES = [
    {
      id: 'super',
      name: 'Make a superposition',
      diff: 'easy',
      goal: 'Put q0 into an equal superposition of |0⟩ and |1⟩.',
      hint: 'One gate does this. It is the one that splits.',
      check: function (s) {
        var b = s.bloch(0);
        return b.len > 0.95 && near(b.z, 0, 0.05);
      }
    },
    {
      id: 'flip',
      name: 'Flip a qubit to |1⟩',
      diff: 'easy',
      goal: 'Get q0 into the definite state |1⟩.',
      hint: 'X is the quantum NOT gate.',
      check: function (s) { return near(s.bloch(0).z, -1, 0.02); }
    },
    {
      id: 'minus',
      name: 'Build the |−⟩ state',
      diff: 'easy',
      goal: 'Put q0 on the negative x-axis of the Bloch sphere — the |−⟩ state.',
      hint: 'Two ways in: flip then split, or split then phase-flip.',
      check: function (s) {
        var b = s.bloch(0);
        return b.len > 0.95 && near(b.x, -1, 0.04);
      }
    },
    {
      id: 'iplus',
      name: 'Point a qubit at |i⟩',
      diff: 'medium',
      goal: 'Get q0 onto the positive y-axis.',
      hint: 'Split it first, then apply a quarter turn of phase.',
      check: function (s) {
        var b = s.bloch(0);
        return b.len > 0.95 && near(b.y, 1, 0.04);
      }
    },
    {
      id: 'undo',
      name: 'Undo a superposition',
      diff: 'medium',
      goal: 'Use at least two gates, including an H, and end with all three qubits back in |000⟩.',
      hint: 'The Hadamard is its own inverse. Randomness could never do this.',
      check: function (s, o) {
        var usedH = o.some(function (x) { return x.gate === 'H'; });
        return usedH && o.length >= 2 && near(prob(s, 0), 1, 0.001);
      }
    },
    {
      id: 'interfere',
      name: 'Reach |1⟩ without using X',
      diff: 'medium',
      goal: 'Get q0 to a definite |1⟩ using only H, Z, S or T gates — no X or Y allowed.',
      hint: 'H, then a phase flip, then H again. This is Lesson 4.',
      check: function (s, o) {
        var clean = o.every(function (x) { return x.gate !== 'X' && x.gate !== 'Y'; });
        return clean && o.length > 0 && near(s.bloch(0).z, -1, 0.03);
      }
    },
    {
      id: 'bell',
      name: 'Create a Bell pair',
      diff: 'medium',
      goal: 'Maximally entangle q0 and q1, leaving q2 alone in |0⟩.',
      hint: 'Superposition on the control, then CNOT onto the target.',
      check: function (s) {
        return s.entanglement(0) > 0.95 && s.entanglement(1) > 0.95 &&
               s.entanglement(2) < 0.05 && near(s.bloch(2).z, 1, 0.05);
      }
    },
    {
      id: 'uniform',
      name: 'Uniform over all eight',
      diff: 'hard',
      goal: 'Give all eight basis states an equal 12.5% chance.',
      hint: 'Every qubit needs the same treatment.',
      check: function (s) {
        for (var i = 0; i < s.size; i++) if (!near(prob(s, i), 0.125, 0.01)) return false;
        return true;
      }
    },
    {
      id: 'ghz',
      name: 'Build a GHZ state',
      diff: 'hard',
      goal: 'Entangle all three qubits so only |000⟩ and |111⟩ have any probability.',
      hint: 'A Bell pair, then drag the third qubit into the correlation.',
      check: function (s) {
        if (!near(prob(s, 0), 0.5, 0.02)) return false;
        if (!near(prob(s, 7), 0.5, 0.02)) return false;
        for (var i = 1; i < 7; i++) if (prob(s, i) > 0.01) return false;
        return true;
      }
    }
  ];

  function loadSolved() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function saveSolved() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(solved)); } catch (e) {}
  }

  /* ---------- rebuild state from the op list ---------- */

  function rebuild() {
    state = new QSim.State(N);
    ops.forEach(function (op) {
      if (op.type === '1') state.apply1(QSim.G[op.gate], op.q);
      else state.applyC(QSim.G[op.gate], op.c, op.t);
    });
  }

  /* ---------- circuit diagram ---------- */

  function renderCircuit() {
    var host = el('pgCircuit');
    var cols = Math.max(ops.length, 8);
    var html = '';

    for (var q = 0; q < N; q++) {
      html += '<div class="circuit-wire">' +
                '<span class="wire-label">q' + q + '</span>' +
                '<div class="wire-line">';
      for (var c = 0; c < cols; c++) {
        var op = ops[c];
        var inner = '';
        if (op) {
          if (op.type === '1' && op.q === q) {
            var cls = op.gate === 'H' ? ' op-h' : '';
            inner = '<span class="op' + cls + '">' + op.gate + '</span>';
          } else if (op.type === 'c') {
            if (op.c === q) inner = '<span class="op-dot"></span>';
            else if (op.t === q) {
              inner = op.gate === 'X'
                ? '<span class="op-target"></span>'
                : '<span class="op-dot"></span>';
            } else if ((q > Math.min(op.c, op.t)) && (q < Math.max(op.c, op.t))) {
              inner = '<span class="ctrl-link" style="top:0;bottom:0"></span>';
            }
            // vertical connector between control and target
            if (op.c === q || op.t === q) {
              var goesDown = (op.c === q ? op.t > q : op.c > q);
              inner += '<span class="ctrl-link" style="' +
                       (goesDown ? 'top:50%;bottom:0' : 'top:0;bottom:50%') + '"></span>';
            }
          }
        }
        html += '<span class="slot">' + inner + '</span>';
      }
      html += '</div></div>';
    }
    host.innerHTML = html;
    el('pgDepth').textContent = ops.length + (ops.length === 1 ? ' gate' : ' gates');
  }

  /* ---------- readouts ---------- */

  var spheres = [];

  function renderState() {
    bars.render(state);

    for (var q = 0; q < N; q++) {
      spheres[q].set(state.bloch(q));
      var e = state.entanglement(q);
      el('pgF' + q).style.width = (e * 100) + '%';
      el('pgE' + q).textContent = e < 0.02 ? 'none' : e > 0.97 ? 'maximal' : (e * 100).toFixed(0) + '%';
    }

    var rows = [];
    for (var i = 0; i < state.size; i++) {
      var p = prob(state, i);
      if (p < 1e-9) continue;
      rows.push(
        '<span class="v">' + QSim.ampStr(state.re[i], state.im[i]) + '</span> ' +
        '<span class="k">|' + QSim.ket(i, N) + '⟩</span>' +
        '<span class="z">   ' + (p * 100).toFixed(1) + '%</span>'
      );
    }
    el('pgState').innerHTML = rows.length ? rows.join('\n') : '<span class="z">(empty)</span>';
  }

  function renderShots() {
    var host = el('pgShots');
    if (!shotTotal) {
      host.innerHTML = '<div class="dim mono" style="font-size:0.76rem">' +
                       'no measurements yet — hit “measure ×500”</div>';
      return;
    }
    var keys = Object.keys(shots).sort();
    var max = Math.max.apply(null, keys.map(function (k) { return shots[k]; }));
    host.innerHTML = keys.map(function (k) {
      return '<div class="shot-row">' +
        '<span class="shot-key">|' + k + '⟩</span>' +
        '<div class="shot-bar-track"><div class="shot-bar" style="width:' + (shots[k] / max * 100) + '%"></div></div>' +
        '<span class="shot-val">' + (shots[k] / shotTotal * 100).toFixed(1) + '%</span>' +
      '</div>';
    }).join('');
  }

  /* ---------- puzzles ---------- */

  function renderPuzzles() {
    var host = el('pgPuzzles');
    host.innerHTML = PUZZLES.map(function (p) {
      var done = !!solved[p.id];
      return '<button class="puzzle' + (done ? ' done' : '') +
             (activePuzzle === p.id ? ' active' : '') + '" data-puzzle="' + p.id + '">' +
        '<span class="puzzle-check">' + (done ? '✓' : '') + '</span>' +
        '<span class="puzzle-name">' + p.name + '</span>' +
        '<span class="puzzle-diff">' + p.diff + '</span>' +
      '</button>';
    }).join('');

    var count = PUZZLES.filter(function (p) { return solved[p.id]; }).length;
    el('pgScore').textContent = count + ' / ' + PUZZLES.length;
  }

  function setPuzzle(id) {
    activePuzzle = id;
    var p = PUZZLES.filter(function (x) { return x.id === id; })[0];
    var box = el('pgChallenge');
    if (!p) {
      box.className = 'challenge';
      el('pgChIcon').textContent = '◆';
      el('pgChTitle').textContent = 'Pick a puzzle';
      el('pgChDesc').textContent = 'Choose one below, or just experiment freely.';
    } else {
      box.className = 'challenge' + (solved[p.id] ? ' solved' : '');
      el('pgChIcon').textContent = solved[p.id] ? '✓' : '◆';
      el('pgChTitle').textContent = p.name;
      el('pgChDesc').innerHTML = p.goal +
        '<br><span class="dim" style="font-size:0.85em">Hint: ' + p.hint + '</span>';
    }
    renderPuzzles();
  }

  var toastTimer = null;
  function toast(msg) {
    var t = el('pgToast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 3400);
  }

  function checkPuzzles() {
    PUZZLES.forEach(function (p) {
      if (solved[p.id]) return;
      var passed = false;
      try { passed = p.check(state, ops); } catch (e) { passed = false; }
      if (passed) {
        solved[p.id] = true;
        saveSolved();
        toast('Solved: ' + p.name + '  ✓');
        if (activePuzzle === p.id) setPuzzle(p.id);
      }
    });
    renderPuzzles();
    if (activePuzzle) {
      var p = PUZZLES.filter(function (x) { return x.id === activePuzzle; })[0];
      if (p && solved[p.id]) {
        el('pgChallenge').className = 'challenge solved';
        el('pgChIcon').textContent = '✓';
      }
    }
  }

  /* ---------- main refresh ---------- */

  function refresh() {
    rebuild();
    renderCircuit();
    renderState();
    checkPuzzles();
  }

  /* ---------- wiring ---------- */

  var bars;

  function init() {
    bars = new Viz.AmpBars(el('pgBars'));
    for (var q = 0; q < N; q++) {
      spheres.push(new Viz.BlochSphere(el('pgB' + q), { az: -0.6, el: 0.32, showAxes: false }));
    }

    document.querySelectorAll('[data-q]').forEach(function (b) {
      b.addEventListener('click', function () {
        activeQubit = parseInt(b.dataset.q, 10);
        document.querySelectorAll('[data-q]').forEach(function (x) {
          x.className = 'gate' + (parseInt(x.dataset.q, 10) === activeQubit ? ' g-h' : '');
        });
      });
    });

    document.querySelectorAll('[data-gate]').forEach(function (b) {
      b.addEventListener('click', function () {
        ops.push({ type: '1', gate: b.dataset.gate, q: activeQubit });
        if (ops.length > 16) ops.shift();
        refresh();
      });
    });

    document.querySelectorAll('[data-cnot]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.dataset.cnot.split(',');
        ops.push({ type: 'c', gate: 'X', c: +v[0], t: +v[1] });
        if (ops.length > 16) ops.shift();
        refresh();
      });
    });

    document.querySelectorAll('[data-cz]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.dataset.cz.split(',');
        ops.push({ type: 'c', gate: 'Z', c: +v[0], t: +v[1] });
        if (ops.length > 16) ops.shift();
        refresh();
      });
    });

    document.querySelectorAll('[data-act]').forEach(function (b) {
      b.addEventListener('click', function () {
        var a = b.dataset.act;
        if (a === 'undo') { ops.pop(); refresh(); }
        else if (a === 'reset') { ops = []; shots = {}; shotTotal = 0; refresh(); renderShots(); }
        else if (a === 'clearshots') { shots = {}; shotTotal = 0; renderShots(); }
        else if (a === 'shots') {
          for (var i = 0; i < 500; i++) {
            var k = QSim.ket(state.sample(), N);
            shots[k] = (shots[k] || 0) + 1;
            shotTotal++;
          }
          renderShots();
        }
      });
    });

    el('pgPuzzles').addEventListener('click', function (e) {
      var b = e.target.closest('[data-puzzle]');
      if (b) setPuzzle(b.dataset.puzzle === activePuzzle ? null : b.dataset.puzzle);
    });

    el('pgWipe').addEventListener('click', function () {
      solved = {};
      saveSolved();
      setPuzzle(activePuzzle);
      renderPuzzles();
      toast('Puzzle progress cleared');
    });

    setPuzzle(null);
    refresh();
    renderShots();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
