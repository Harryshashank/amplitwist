/* ============================================================
   course.js — the seven lesson simulations.
   Every readout below comes from a real QSim.State.
   ============================================================ */

(function () {
  'use strict';

  var LESSONS = [
    'Qubits', 'Superposition', 'Phase', 'Interference',
    'Entanglement', 'Measurement', "Grover's search"
  ];

  /* ---------- lesson tab navigation ---------- */
  (function () {
    var nav = document.getElementById('lessonNav');
    var panels = document.querySelectorAll('.lesson');
    if (!nav) return;

    nav.innerHTML = LESSONS.map(function (name, i) {
      return '<button data-go="' + i + '"' + (i === 0 ? ' class="active"' : '') + '>' +
             (i + 1) + ' · ' + name + '</button>';
    }).join('');

    function show(i) {
      nav.querySelectorAll('button').forEach(function (b, j) {
        b.classList.toggle('active', j === i);
      });
      panels.forEach(function (p, j) { p.classList.toggle('active', j === i); });
      if (location.hash !== '#l' + (i + 1)) history.replaceState(null, '', '#l' + (i + 1));
      window.scrollTo({ top: nav.offsetTop - 80, behavior: 'smooth' });
    }

    nav.addEventListener('click', function (e) {
      var b = e.target.closest('[data-go]');
      if (b) show(parseInt(b.dataset.go, 10));
    });

    var m = /^#l(\d)$/.exec(location.hash);
    if (m) {
      var idx = parseInt(m[1], 10) - 1;
      if (idx >= 0 && idx < LESSONS.length) {
        nav.querySelectorAll('button').forEach(function (b, j) { b.classList.toggle('active', j === idx); });
        panels.forEach(function (p, j) { p.classList.toggle('active', j === idx); });
      }
    }
  })();

  /* ---------- shared helpers ---------- */

  function el(id) { return document.getElementById(id); }

  /* Render a shots histogram into a container. counts is {key: n}. */
  function renderShots(host, counts, total) {
    if (!host) return;
    if (!total) { host.innerHTML = '<div class="dim mono" style="font-size:0.76rem">no measurements yet</div>'; return; }
    var keys = Object.keys(counts).sort();
    var max = Math.max.apply(null, keys.map(function (k) { return counts[k]; }));
    host.innerHTML = keys.map(function (k) {
      var n = counts[k];
      var pct = (n / total * 100);
      return '<div class="shot-row">' +
        '<span class="shot-key">|' + k + '⟩</span>' +
        '<div class="shot-bar-track"><div class="shot-bar" style="width:' + (n / max * 100) + '%"></div></div>' +
        '<span class="shot-val">' + n + ' · ' + pct.toFixed(1) + '%</span>' +
      '</div>';
    }).join('');
  }

  /* Format the full state vector as ket notation lines. */
  function stateLines(s, maxRows) {
    var rows = [], i;
    for (i = 0; i < s.size; i++) {
      var re = s.re[i], im = s.im[i];
      var p = re*re + im*im;
      if (p < 1e-9) continue;
      rows.push({ i: i, re: re, im: im, p: p });
    }
    if (!rows.length) return '<span class="z">(zero state)</span>';
    return rows.slice(0, maxRows || 8).map(function (r) {
      return '<span class="v">' + QSim.ampStr(r.re, r.im) + '</span> ' +
             '<span class="k">|' + QSim.ket(r.i, s.n) + '⟩</span>' +
             '<span class="z">   → ' + (r.p * 100).toFixed(1) + '%</span>';
    }).join('\n');
  }

  /* =========================================================
     LESSON 1 — the Bloch sphere
     ========================================================= */
  (function () {
    var canvas = el('l1bloch');
    if (!canvas) return;
    var sphere = new Viz.BlochSphere(canvas);
    var tS = el('l1theta'), pS = el('l1phi');
    var tV = el('l1tv'), pV = el('l1pv'), out = el('l1out');

    function update() {
      var th = tS.value * Math.PI / 180;
      var ph = pS.value * Math.PI / 180;

      // |psi> = cos(th/2)|0> + e^{i ph} sin(th/2)|1>
      var s = new QSim.State(1);
      s.apply1(QSim.RY(th), 0);
      s.apply1(QSim.PHASE(ph), 0);

      sphere.set(s.bloch(0));
      tV.textContent = tS.value + '°';
      pV.textContent = pS.value + '°';

      var b = s.bloch(0);
      out.innerHTML =
        stateLines(s) + '\n\n' +
        '<span class="z">Bloch  x=' + b.x.toFixed(3) +
        '  y=' + b.y.toFixed(3) + '  z=' + b.z.toFixed(3) +
        '\nlength = ' + b.len.toFixed(3) + '</span>';
    }

    tS.addEventListener('input', update);
    pS.addEventListener('input', update);

    document.querySelectorAll('[data-l1preset]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.dataset.l1preset.split(',');
        tS.value = v[0]; pS.value = v[1];
        update();
      });
    });

    update();
  })();

  /* =========================================================
     LESSON 2 — superposition
     ========================================================= */
  (function () {
    var canvas = el('l2bloch');
    if (!canvas) return;
    var sphere = new Viz.BlochSphere(canvas);
    var bars = new Viz.AmpBars(el('l2bars'));
    var out = el('l2out'), seq = el('l2seq'), shotsHost = el('l2shots');

    var state = new QSim.State(1);
    var history = [];
    var counts = {}, total = 0;

    function refresh() {
      sphere.set(state.bloch(0));
      bars.render(state);
      seq.textContent = 'circuit: ' + (history.length ? history.join(' → ') : '(empty)');
      out.innerHTML = stateLines(state);
      renderShots(shotsHost, counts, total);
    }

    document.querySelectorAll('[data-l2]').forEach(function (b) {
      b.addEventListener('click', function () {
        var g = b.dataset.l2;
        if (g === 'reset') {
          state = new QSim.State(1); history = []; counts = {}; total = 0;
        } else {
          state.apply1(QSim.G[g], 0);
          history.push(g);
          if (history.length > 9) history.shift();
        }
        refresh();
      });
    });

    document.querySelectorAll('[data-l2shots]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.dataset.l2shots;
        if (v === 'clear') { counts = {}; total = 0; refresh(); return; }
        var n = parseInt(v, 10);
        // Sampling without collapsing, so the state survives for more shots —
        // equivalent to re-preparing the circuit before each measurement.
        for (var i = 0; i < n; i++) {
          var k = QSim.ket(state.sample(), state.n);
          counts[k] = (counts[k] || 0) + 1;
          total++;
        }
        refresh();
      });
    });

    refresh();
  })();

  /* =========================================================
     LESSON 3 — phase is invisible to measurement
     ========================================================= */
  (function () {
    var canvas = el('l3bloch');
    if (!canvas) return;
    var sphere = new Viz.BlochSphere(canvas, { trail: true });
    var bars = new Viz.AmpBars(el('l3bars'));
    var slider = el('l3phi'), pv = el('l3pv'), out = el('l3out');

    function update() {
      var ph = slider.value * Math.PI / 180;
      var s = new QSim.State(1);
      s.apply1(QSim.G.H, 0);
      s.apply1(QSim.PHASE(ph), 0);

      sphere.set(s.bloch(0));
      bars.render(s);
      pv.textContent = slider.value + '°';

      var p0 = s.re[0]*s.re[0] + s.im[0]*s.im[0];
      var p1 = s.re[1]*s.re[1] + s.im[1]*s.im[1];
      out.innerHTML =
        stateLines(s) + '\n\n' +
        '<span class="z">P(0) = ' + p0.toFixed(4) + '   ← fixed at 0.5\n' +
        'P(1) = ' + p1.toFixed(4) + '   ← fixed at 0.5</span>';
    }

    slider.addEventListener('input', update);
    update();
  })();

  /* =========================================================
     LESSON 4 — interference
     ========================================================= */
  (function () {
    var barsCanvas = el('l4bars');
    if (!barsCanvas) return;
    var bars = new Viz.AmpBars(barsCanvas);
    var slider = el('l4phi'), pv = el('l4pv');
    var p0El = el('l4p0'), p1El = el('l4p1');
    var f0 = el('l4f0'), f1 = el('l4f1'), out = el('l4out');

    function update() {
      var ph = slider.value * Math.PI / 180;
      var s = new QSim.State(1);
      s.apply1(QSim.G.H, 0);
      s.apply1(QSim.PHASE(ph), 0);
      s.apply1(QSim.G.H, 0);

      bars.render(s);
      pv.textContent = slider.value + '°';

      var p0 = s.re[0]*s.re[0] + s.im[0]*s.im[0];
      var p1 = s.re[1]*s.re[1] + s.im[1]*s.im[1];

      p0El.textContent = (p0 * 100).toFixed(1) + '%';
      p1El.textContent = (p1 * 100).toFixed(1) + '%';
      f0.style.width = (p0 * 100) + '%';
      f1.style.width = (p1 * 100) + '%';

      var note = p0 > 0.995 ? 'total constructive interference → |0⟩'
               : p1 > 0.995 ? 'total destructive interference on |0⟩ → |1⟩'
               : 'partial interference';
      out.innerHTML = stateLines(s) + '\n\n<span class="z">' + note + '</span>';
    }

    slider.addEventListener('input', update);
    update();
  })();

  /* =========================================================
     LESSON 5 — entanglement
     ========================================================= */
  (function () {
    var c0 = el('l5b0');
    if (!c0) return;
    var s0 = new Viz.BlochSphere(c0, { label: 'q0' });
    var s1 = new Viz.BlochSphere(el('l5b1'), { label: 'q1' });
    var bars = new Viz.AmpBars(el('l5bars'));
    var seq = el('l5seq'), evEl = el('l5ev'), efEl = el('l5ef');
    var shotsHost = el('l5shots');

    var state = new QSim.State(2);
    var history = [], counts = {}, total = 0;

    function refresh() {
      s0.set(state.bloch(0));
      s1.set(state.bloch(1));
      bars.render(state);
      seq.textContent = 'circuit: ' + (history.length ? history.join(' → ') : '(empty)');

      var e = state.entanglement(0);
      efEl.style.width = (e * 100) + '%';
      evEl.textContent = e < 0.02 ? 'none'
                       : e > 0.97 ? 'maximal'
                       : (e * 100).toFixed(0) + '%';
      renderShots(shotsHost, counts, total);
    }

    document.querySelectorAll('[data-l5]').forEach(function (b) {
      b.addEventListener('click', function () {
        var g = b.dataset.l5;
        if (g === 'reset') {
          state = new QSim.State(2); history = []; counts = {}; total = 0;
        } else if (g === 'H0') { state.apply1(QSim.G.H, 0); history.push('H(q0)'); }
        else if (g === 'X0')   { state.apply1(QSim.G.X, 0); history.push('X(q0)'); }
        else if (g === 'Z0')   { state.apply1(QSim.G.Z, 0); history.push('Z(q0)'); }
        else if (g === 'CNOT') { state.applyC(QSim.G.X, 0, 1); history.push('CNOT'); }
        if (history.length > 7) history.shift();
        refresh();
      });
    });

    document.querySelectorAll('[data-l5shots]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.dataset.l5shots;
        if (v === 'clear') { counts = {}; total = 0; refresh(); return; }
        var n = parseInt(v, 10);
        for (var i = 0; i < n; i++) {
          var k = QSim.ket(state.sample(), state.n);
          counts[k] = (counts[k] || 0) + 1;
          total++;
        }
        refresh();
      });
    });

    refresh();
  })();

  /* =========================================================
     LESSON 6 — measurement collapses the state
     ========================================================= */
  (function () {
    var canvas = el('l6bloch');
    if (!canvas) return;
    var sphere = new Viz.BlochSphere(canvas);
    var bars = new Viz.AmpBars(el('l6bars'));
    var log = el('l6log'), cap = el('l6cap');

    var state = new QSim.State(1);
    var lines = [];
    var collapsed = false;

    function refresh() {
      sphere.set(state.bloch(0));
      bars.render(state);
      log.innerHTML = lines.length
        ? lines.slice(-5).join('\n')
        : '<span class="z">no measurements yet</span>';
      cap.textContent = collapsed ? 'collapsed — superposition destroyed'
                                  : 'superposition intact';
    }

    document.querySelectorAll('[data-l6]').forEach(function (b) {
      b.addEventListener('click', function () {
        var a = b.dataset.l6;
        if (a === 'reset') {
          state = new QSim.State(1); lines = []; collapsed = false;
        } else if (a === 'H') {
          state.apply1(QSim.G.H, 0);
          collapsed = false;
          lines.push('<span class="z">applied H — now in superposition</span>');
        } else if (a === 'M') {
          var was = collapsed;
          var r = state.measure(0);
          collapsed = true;
          lines.push('<span class="k">measured →</span> <span class="v">' + r + '</span>' +
            (was ? '  <span class="z">(same as before — nothing left to collapse)</span>'
                 : '  <span class="z">(state has now collapsed)</span>'));
        }
        refresh();
      });
    });

    refresh();
  })();

  /* =========================================================
     LESSON 7 — Grover's search on 3 qubits (8 items)
     ========================================================= */
  (function () {
    var barsCanvas = el('l7bars');
    if (!barsCanvas) return;
    var bars = new Viz.AmpBars(barsCanvas);
    var stepEl = el('l7step'), out = el('l7out');
    var pv = el('l7pv'), pf = el('l7pf'), marksHost = el('l7marks');

    var N = 3, SIZE = 8;
    var marked = 5;
    var state, steps, phase;

    function init() {
      state = new QSim.State(N);
      for (var q = 0; q < N; q++) state.apply1(QSim.G.H, q);   // uniform superposition
      steps = 0;
      phase = 'initialise';
      refresh();
    }

    /* Oracle: flip the sign of the marked amplitude only. */
    function oracle() {
      state.re[marked] = -state.re[marked];
      state.im[marked] = -state.im[marked];
    }

    /* Diffusion: reflect every amplitude about the mean. */
    function diffuse() {
      var mr = 0, mi = 0, i;
      for (i = 0; i < SIZE; i++) { mr += state.re[i]; mi += state.im[i]; }
      mr /= SIZE; mi /= SIZE;
      for (i = 0; i < SIZE; i++) {
        state.re[i] = 2 * mr - state.re[i];
        state.im[i] = 2 * mi - state.im[i];
      }
    }

    function refresh() {
      bars.render(state);
      var p = state.re[marked]*state.re[marked] + state.im[marked]*state.im[marked];
      pv.textContent = (p * 100).toFixed(1) + '%';
      pf.style.width = (p * 100) + '%';
      stepEl.textContent = 'step ' + steps + ' · ' + phase;

      var note;
      if (p > 0.9)        note = 'peak — measure now, further iterations will overshoot';
      else if (steps >= 3) note = 'overshot — the amplitude has rotated past the target';
      else if (p > 0.4)   note = 'amplitude is building on the marked item';
      else                note = 'run a full iteration to amplify';

      out.innerHTML =
        '<span class="z">marked item: </span><span class="k">|' + QSim.ket(marked, N) + '⟩</span>\n' +
        '<span class="z">amplitude:   </span><span class="v">' +
          QSim.ampStr(state.re[marked], state.im[marked]) + '</span>\n' +
        '<span class="z">probability: </span><span class="v">' + (p * 100).toFixed(2) + '%</span>' +
        '   <span class="z">(classical random guess = 12.5%)</span>\n\n' +
        '<span class="z">' + note + '</span>';
    }

    marksHost.innerHTML = '';
    for (var i = 0; i < SIZE; i++) {
      (function (idx) {
        var b = document.createElement('button');
        b.className = 'gate' + (idx === marked ? ' g-h' : '');
        b.textContent = '|' + QSim.ket(idx, N) + '⟩';
        b.addEventListener('click', function () {
          marked = idx;
          marksHost.querySelectorAll('.gate').forEach(function (x, j) {
            x.className = 'gate' + (j === idx ? ' g-h' : '');
          });
          init();
        });
        marksHost.appendChild(b);
      })(i);
    }

    document.querySelectorAll('[data-l7]').forEach(function (b) {
      b.addEventListener('click', function () {
        var a = b.dataset.l7;
        if (a === 'reset')   { init(); return; }
        if (a === 'oracle')  { oracle();  phase = 'oracle applied — phase flipped'; }
        if (a === 'diffuse') { diffuse(); phase = 'diffusion applied'; steps++; }
        if (a === 'iterate') { oracle(); diffuse(); steps++; phase = 'full iteration'; }
        refresh();
      });
    });

    init();
  })();

})();
