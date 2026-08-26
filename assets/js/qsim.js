/* ============================================================
   qsim.js — a small, honest state-vector quantum simulator.

   No dependencies, no build step. Amplitudes are held as two
   parallel Float64Arrays (real, imaginary) of length 2^n.

   This is the real thing, not an animation: every visual on the
   site reads out of these amplitudes. If the math here is wrong,
   the pictures are wrong — so it is kept deliberately simple.

   Convention: qubit 0 is the LEAST significant bit, so basis
   state |q2 q1 q0> maps to index (q2<<2 | q1<<1 | q0).
   ============================================================ */

(function (global) {
  'use strict';

  var SQRT1_2 = Math.SQRT1_2;

  function State(n) {
    this.n = n;
    this.size = 1 << n;
    this.re = new Float64Array(this.size);
    this.im = new Float64Array(this.size);
    this.re[0] = 1;                    // start in |00...0>
  }

  State.prototype.reset = function () {
    this.re.fill(0); this.im.fill(0); this.re[0] = 1;
    return this;
  };

  State.prototype.clone = function () {
    var s = new State(this.n);
    s.re.set(this.re); s.im.set(this.im);
    return s;
  };

  /* --- Single-qubit gate ------------------------------------
     m is [[a,b],[c,d]] with each entry [re,im].
     Walks every index whose target bit is 0 and mixes it with
     its partner that has the bit set. */
  State.prototype.apply1 = function (m, q) {
    var bit = 1 << q, re = this.re, im = this.im;
    var a = m[0], b = m[1], c = m[2], d = m[3];
    for (var i = 0; i < this.size; i++) {
      if (i & bit) continue;
      var j = i | bit;
      var x0r = re[i], x0i = im[i], x1r = re[j], x1i = im[j];
      re[i] = a[0]*x0r - a[1]*x0i + b[0]*x1r - b[1]*x1i;
      im[i] = a[0]*x0i + a[1]*x0r + b[0]*x1i + b[1]*x1r;
      re[j] = c[0]*x0r - c[1]*x0i + d[0]*x1r - d[1]*x1i;
      im[j] = c[0]*x0i + c[1]*x0r + d[0]*x1i + d[1]*x1r;
    }
    return this;
  };

  /* Controlled version: same mix, but only where control bit is 1 */
  State.prototype.applyC = function (m, control, target) {
    var cb = 1 << control, tb = 1 << target;
    var re = this.re, im = this.im;
    var a = m[0], b = m[1], c = m[2], d = m[3];
    for (var i = 0; i < this.size; i++) {
      if (i & tb) continue;
      if (!(i & cb)) continue;
      var j = i | tb;
      var x0r = re[i], x0i = im[i], x1r = re[j], x1i = im[j];
      re[i] = a[0]*x0r - a[1]*x0i + b[0]*x1r - b[1]*x1i;
      im[i] = a[0]*x0i + a[1]*x0r + b[0]*x1i + b[1]*x1r;
      re[j] = c[0]*x0r - c[1]*x0i + d[0]*x1r - d[1]*x1i;
      im[j] = c[0]*x0i + c[1]*x0r + d[0]*x1i + d[1]*x1r;
    }
    return this;
  };

  State.prototype.swap = function (q1, q2) {
    var b1 = 1 << q1, b2 = 1 << q2, re = this.re, im = this.im;
    for (var i = 0; i < this.size; i++) {
      var hasB1 = (i & b1) !== 0, hasB2 = (i & b2) !== 0;
      if (hasB1 && !hasB2) {
        var j = (i & ~b1) | b2;
        var tr = re[i]; re[i] = re[j]; re[j] = tr;
        var ti = im[i]; im[i] = im[j]; im[j] = ti;
      }
    }
    return this;
  };

  /* --- Gate library ----------------------------------------- */
  var G = {
    I: [[1,0],[0,0],[0,0],[1,0]],
    X: [[0,0],[1,0],[1,0],[0,0]],
    Y: [[0,0],[0,-1],[0,1],[0,0]],
    Z: [[1,0],[0,0],[0,0],[-1,0]],
    H: [[SQRT1_2,0],[SQRT1_2,0],[SQRT1_2,0],[-SQRT1_2,0]],
    S: [[1,0],[0,0],[0,0],[0,1]],
    Sdg: [[1,0],[0,0],[0,0],[0,-1]],
    T: [[1,0],[0,0],[0,0],[SQRT1_2,SQRT1_2]],
    Tdg: [[1,0],[0,0],[0,0],[SQRT1_2,-SQRT1_2]]
  };

  function RX(t) {
    var c = Math.cos(t/2), s = Math.sin(t/2);
    return [[c,0],[0,-s],[0,-s],[c,0]];
  }
  function RY(t) {
    var c = Math.cos(t/2), s = Math.sin(t/2);
    return [[c,0],[-s,0],[s,0],[c,0]];
  }
  function RZ(t) {
    var c = Math.cos(t/2), s = Math.sin(t/2);
    return [[c,-s],[0,0],[0,0],[c,s]];
  }
  function PHASE(t) {
    return [[1,0],[0,0],[0,0],[Math.cos(t),Math.sin(t)]];
  }

  /* --- Readout ----------------------------------------------- */

  State.prototype.probs = function () {
    var p = new Float64Array(this.size);
    for (var i = 0; i < this.size; i++) p[i] = this.re[i]*this.re[i] + this.im[i]*this.im[i];
    return p;
  };

  /* Reduced density matrix of one qubit, traced over the rest.
     Returns {r00, r11, r01re, r01im}. This is what lets us draw a
     Bloch sphere for a qubit that is entangled with others. */
  State.prototype.rdm1 = function (q) {
    var bit = 1 << q, r00 = 0, r11 = 0, r01re = 0, r01im = 0;
    for (var i = 0; i < this.size; i++) {
      var a = this.re[i], b = this.im[i];
      if (i & bit) { r11 += a*a + b*b; continue; }
      r00 += a*a + b*b;
      var j = i | bit, c = this.re[j], d = this.im[j];
      // psi_i * conj(psi_j)
      r01re += a*c + b*d;
      r01im += b*c - a*d;
    }
    return { r00: r00, r11: r11, r01re: r01re, r01im: r01im };
  };

  /* Bloch vector for qubit q.
       x = 2 Re(rho01),  y = -2 Im(rho01),  z = rho00 - rho11
     Its length is 1 for an unentangled qubit and shrinks toward 0
     as the qubit becomes entangled with the rest of the register —
     which is exactly the visual the playground leans on. */
  State.prototype.bloch = function (q) {
    var r = this.rdm1(q);
    var x = 2 * r.r01re, y = -2 * r.r01im, z = r.r00 - r.r11;
    return { x: x, y: y, z: z, len: Math.sqrt(x*x + y*y + z*z) };
  };

  /* Linear entropy 1 - Tr(rho^2), in [0, 0.5] for one qubit.
     Normalised here to [0,1] and used as the "entanglement" meter. */
  State.prototype.entanglement = function (q) {
    var L = this.bloch(q).len;
    return Math.max(0, Math.min(1, 1 - L * L));
  };

  /* Sample an outcome without collapsing. */
  State.prototype.sample = function () {
    var p = this.probs(), r = Math.random(), acc = 0;
    for (var i = 0; i < this.size; i++) {
      acc += p[i];
      if (r <= acc) return i;
    }
    return this.size - 1;
  };

  /* Measure one qubit: pick an outcome, then project and renormalise.
     This genuinely destroys the superposition, as it should. */
  State.prototype.measure = function (q) {
    var bit = 1 << q, p1 = 0, i;
    for (i = 0; i < this.size; i++) if (i & bit) p1 += this.re[i]*this.re[i] + this.im[i]*this.im[i];
    var outcome = (Math.random() < p1) ? 1 : 0;
    var norm = Math.sqrt(outcome ? p1 : 1 - p1);
    if (norm < 1e-12) norm = 1;
    for (i = 0; i < this.size; i++) {
      var keep = ((i & bit) !== 0) === (outcome === 1);
      if (keep) { this.re[i] /= norm; this.im[i] /= norm; }
      else      { this.re[i] = 0;     this.im[i] = 0; }
    }
    return outcome;
  };

  /* Measure the whole register at once. Returns an integer. */
  State.prototype.measureAll = function () {
    var out = this.sample();
    this.re.fill(0); this.im.fill(0);
    this.re[out] = 1;
    return out;
  };

  /* --- Formatting helpers ------------------------------------ */

  function ket(index, n) {
    var s = index.toString(2);
    while (s.length < n) s = '0' + s;
    return s;
  }

  /* Amplitude as a readable string, e.g. "0.707" or "0.5+0.5i" */
  function ampStr(re, im, dp) {
    dp = dp === undefined ? 3 : dp;
    var r = Math.abs(re) < 1e-10 ? 0 : re;
    var i = Math.abs(im) < 1e-10 ? 0 : im;
    if (i === 0) return r.toFixed(dp);
    if (r === 0) return (i > 0 ? '' : '-') + Math.abs(i).toFixed(dp) + 'i';
    return r.toFixed(dp) + (i > 0 ? '+' : '-') + Math.abs(i).toFixed(dp) + 'i';
  }

  /* Phase in radians, for colouring amplitude bars. */
  function phase(re, im) { return Math.atan2(im, re); }

  /* Map a phase angle to a hue so that relative phase is visible.
     Phase is the thing beginners never see in a probability bar
     chart, so every amplitude display on the site is phase-coloured. */
  function phaseColor(ph, alpha) {
    var deg = (ph * 180 / Math.PI + 360) % 360;
    return 'hsla(' + (deg + 250) % 360 + ', 78%, 66%, ' + (alpha === undefined ? 1 : alpha) + ')';
  }

  global.QSim = {
    State: State,
    G: G, RX: RX, RY: RY, RZ: RZ, PHASE: PHASE,
    ket: ket, ampStr: ampStr, phase: phase, phaseColor: phaseColor
  };

})(window);
