/* ============================================================
   viz.js — canvas renderers that read straight out of QSim.

   BlochSphere  : draggable 3D sphere with the state vector
   AmpBars      : amplitude bars, coloured by phase
   ============================================================ */

(function (global) {
  'use strict';

  var TAU = Math.PI * 2;

  /* Set up a canvas for the device pixel ratio so lines stay crisp. */
  function fitCanvas(canvas) {
    var dpr = global.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    var w = rect.width || canvas.clientWidth || 300;
    var h = rect.height || canvas.clientHeight || 300;
    canvas.width  = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: w, h: h };
  }

  /* ---------- Bloch sphere ---------------------------------- */

  function BlochSphere(canvas, opts) {
    opts = opts || {};
    this.canvas = canvas;
    this.az = opts.az !== undefined ? opts.az : -0.62;   // azimuth, radians
    this.el = opts.el !== undefined ? opts.el : 0.34;    // camera elevation
    this.label = opts.label || '';
    this.showAxes = opts.showAxes !== false;

    this.vec = { x: 0, y: 0, z: 1 };      // rendered vector (animated)
    this.target = { x: 0, y: 0, z: 1 };   // where it is heading
    this.trail = [];
    this.showTrail = !!opts.trail;

    this._drag = null;
    this._bindDrag();
    this._loop();
  }

  BlochSphere.prototype.set = function (v, immediate) {
    this.target = { x: v.x, y: v.y, z: v.z };
    if (immediate) this.vec = { x: v.x, y: v.y, z: v.z };
  };

  BlochSphere.prototype.clearTrail = function () { this.trail = []; };

  BlochSphere.prototype._bindDrag = function () {
    var self = this, c = this.canvas;
    function down(e) {
      var p = e.touches ? e.touches[0] : e;
      self._drag = { x: p.clientX, y: p.clientY, az: self.az, el: self.el };
    }
    function move(e) {
      if (!self._drag) return;
      var p = e.touches ? e.touches[0] : e;
      self.az = self._drag.az + (p.clientX - self._drag.x) * 0.011;
      self.el = self._drag.el + (p.clientY - self._drag.y) * 0.011;
      self.el = Math.max(-1.4, Math.min(1.4, self.el));
      if (e.cancelable) e.preventDefault();
    }
    function up() { self._drag = null; }

    c.addEventListener('mousedown', down);
    global.addEventListener('mousemove', move);
    global.addEventListener('mouseup', up);
    c.addEventListener('touchstart', down, { passive: true });
    c.addEventListener('touchmove', move, { passive: false });
    global.addEventListener('touchend', up);
    c.style.cursor = 'grab';
  };

  /* World -> screen. z is up; the camera orbits by (az, el). */
  BlochSphere.prototype._project = function (x, y, z, cx, cy, r) {
    var ca = Math.cos(this.az), sa = Math.sin(this.az);
    var x1 =  x * ca + y * sa;
    var y1 = -x * sa + y * ca;
    var ce = Math.cos(this.el), se = Math.sin(this.el);
    return {
      x: cx + x1 * r,
      y: cy - (z * ce - y1 * se) * r,
      d: y1 * ce + z * se          // depth: >0 is toward viewer
    };
  };

  BlochSphere.prototype._loop = function () {
    var self = this;
    function frame() {
      self.draw();
      global.requestAnimationFrame(frame);
    }
    frame();
  };

  BlochSphere.prototype.draw = function () {
    var f = fitCanvas(this.canvas), ctx = f.ctx;
    var cx = f.w / 2, cy = f.h / 2;
    var r = Math.min(f.w, f.h) * 0.36;
    var self = this;

    ctx.clearRect(0, 0, f.w, f.h);

    // ease the vector toward its target
    var k = 0.18;
    this.vec.x += (this.target.x - this.vec.x) * k;
    this.vec.y += (this.target.y - this.vec.y) * k;
    this.vec.z += (this.target.z - this.vec.z) * k;

    if (this.showTrail) {
      var last = this.trail[this.trail.length - 1];
      if (!last || Math.abs(last.x - this.vec.x) + Math.abs(last.y - this.vec.y) +
                   Math.abs(last.z - this.vec.z) > 0.012) {
        this.trail.push({ x: this.vec.x, y: this.vec.y, z: this.vec.z });
        if (this.trail.length > 190) this.trail.shift();
      }
    }

    function P(x, y, z) { return self._project(x, y, z, cx, cy, r); }

    /* Draw a great circle in the plane spanned by u and v, splitting
       it into front and back segments so the sphere reads as 3D. */
    function circle(ux, uy, uz, vx, vy, vz, frontStyle, backStyle) {
      var steps = 96, i, t, pts = [];
      for (i = 0; i <= steps; i++) {
        t = i / steps * TAU;
        var c = Math.cos(t), s = Math.sin(t);
        pts.push(P(ux*c + vx*s, uy*c + vy*s, uz*c + vz*s));
      }
      for (var pass = 0; pass < 2; pass++) {
        ctx.beginPath();
        var drawing = false;
        for (i = 0; i <= steps; i++) {
          var front = pts[i].d >= 0;
          if (front === (pass === 1)) {
            if (!drawing) { ctx.moveTo(pts[i].x, pts[i].y); drawing = true; }
            else ctx.lineTo(pts[i].x, pts[i].y);
          } else drawing = false;
        }
        ctx.strokeStyle = pass === 1 ? frontStyle : backStyle;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // sphere body
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, TAU);
    var grad = ctx.createRadialGradient(cx - r*0.35, cy - r*0.4, r*0.1, cx, cy, r);
    grad.addColorStop(0, 'rgba(124,108,255,0.10)');
    grad.addColorStop(1, 'rgba(124,108,255,0.02)');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    var FRONT = 'rgba(255,255,255,0.20)', BACK = 'rgba(255,255,255,0.06)';
    circle(1,0,0, 0,1,0, FRONT, BACK);   // equator
    circle(1,0,0, 0,0,1, FRONT, BACK);   // meridian
    circle(0,1,0, 0,0,1, FRONT, BACK);   // meridian

    // axes with |0>, |1>, |+>, |i> labels
    if (this.showAxes) {
      var axes = [
        { v: [0,0, 1.34], t: '|0⟩', c: 'rgba(255,255,255,0.55)' },
        { v: [0,0,-1.34], t: '|1⟩', c: 'rgba(255,255,255,0.55)' },
        { v: [1.32,0,0],  t: '|+⟩', c: 'rgba(79,214,232,0.6)' },
        { v: [0,1.32,0],  t: '|i⟩', c: 'rgba(242,181,68,0.6)' }
      ];
      ctx.save();
      ctx.setLineDash([3, 4]);
      axes.forEach(function (a) {
        var p = P(a.v[0], a.v[1], a.v[2]);
        var o = P(0,0,0);
        ctx.beginPath();
        ctx.moveTo(o.x, o.y); ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = p.d >= 0 ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.07)';
        ctx.stroke();
      });
      ctx.restore();
      ctx.font = '600 11px ui-monospace, Menlo, monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      axes.forEach(function (a) {
        var p = P(a.v[0]*1.13, a.v[1]*1.13, a.v[2]*1.10);
        ctx.fillStyle = a.c;
        ctx.fillText(a.t, p.x, p.y);
      });
    }

    // trail
    if (this.showTrail && this.trail.length > 1) {
      ctx.beginPath();
      for (var i = 0; i < this.trail.length; i++) {
        var tp = P(this.trail[i].x, this.trail[i].y, this.trail[i].z);
        if (i === 0) ctx.moveTo(tp.x, tp.y); else ctx.lineTo(tp.x, tp.y);
      }
      ctx.strokeStyle = 'rgba(79,214,232,0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // the state vector
    var v = this.vec;
    var len = Math.sqrt(v.x*v.x + v.y*v.y + v.z*v.z);
    var tip = P(v.x, v.y, v.z);
    var org = P(0, 0, 0);

    // shadow on the equatorial plane, helps read the 3D position
    var sh = P(v.x, v.y, 0);
    ctx.save();
    ctx.setLineDash([2, 3]);
    ctx.beginPath();
    ctx.moveTo(tip.x, tip.y); ctx.lineTo(sh.x, sh.y);
    ctx.strokeStyle = 'rgba(255,255,255,0.13)';
    ctx.stroke();
    ctx.restore();

    if (len > 0.008) {
      ctx.beginPath();
      ctx.moveTo(org.x, org.y); ctx.lineTo(tip.x, tip.y);
      ctx.strokeStyle = '#a493ff';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(164,147,255,0.75)';
      ctx.shadowBlur = 11;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 5.2, 0, TAU);
      ctx.fillStyle = '#c9befe';
      ctx.shadowColor = 'rgba(164,147,255,0.9)';
      ctx.shadowBlur = 13;
      ctx.fill();
      ctx.shadowBlur = 0;
    } else {
      // fully mixed: no direction at all. Draw the "no state" marker.
      ctx.beginPath();
      ctx.arc(org.x, org.y, 4.5, 0, TAU);
      ctx.fillStyle = 'rgba(242,100,140,0.85)';
      ctx.fill();
    }

    // centre dot
    ctx.beginPath();
    ctx.arc(org.x, org.y, 1.8, 0, TAU);
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fill();

    if (this.label) {
      ctx.font = '600 12px ui-monospace, Menlo, monospace';
      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillText(this.label, 10, 9);
    }
  };

  /* ---------- Amplitude bars -------------------------------- */

  function AmpBars(canvas) {
    this.canvas = canvas;
    this.state = null;
    this.anim = null;
  }

  AmpBars.prototype.render = function (state) {
    var f = fitCanvas(this.canvas), ctx = f.ctx;
    var n = state.n, size = state.size;
    ctx.clearRect(0, 0, f.w, f.h);

    var padL = 8, padR = 8, padTop = 12, labelH = 26;
    var plotH = f.h - labelH - padTop;
    var slot = (f.w - padL - padR) / size;
    var bw = Math.min(slot * 0.68, 52);

    // gridlines at 0.25 / 0.5 / 0.75 / 1.0
    ctx.strokeStyle = 'rgba(255,255,255,0.055)';
    ctx.lineWidth = 1;
    [0.25, 0.5, 0.75, 1].forEach(function (g) {
      var y = padTop + plotH * (1 - g);
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(f.w - padR, y); ctx.stroke();
    });

    for (var i = 0; i < size; i++) {
      var re = state.re[i], im = state.im[i];
      var p = re*re + im*im;
      var x = padL + slot * i + (slot - bw) / 2;
      var h = Math.max(p * plotH, p > 1e-9 ? 2 : 0);
      var y = padTop + plotH - h;

      // baseline slot
      ctx.fillStyle = 'rgba(255,255,255,0.032)';
      ctx.fillRect(x, padTop, bw, plotH);

      if (p > 1e-9) {
        var ph = Math.atan2(im, re);
        ctx.fillStyle = QSim.phaseColor(ph, 0.92);
        ctx.fillRect(x, y, bw, h);
        // bright cap
        ctx.fillStyle = QSim.phaseColor(ph, 1);
        ctx.fillRect(x, y, bw, Math.min(2.5, h));
      }

      // basis label
      ctx.font = (size > 8 ? '9px ' : '10px ') + 'ui-monospace, Menlo, monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillStyle = p > 1e-9 ? 'rgba(255,255,255,0.68)' : 'rgba(255,255,255,0.22)';
      ctx.fillText('|' + QSim.ket(i, n) + '⟩', x + bw/2, padTop + plotH + 7);

      // percentage, when there is room
      if (p > 0.015 && slot > 30) {
        ctx.font = '9px ui-monospace, Menlo, monospace';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = 'rgba(255,255,255,0.75)';
        ctx.fillText((p * 100).toFixed(0) + '%', x + bw/2, y - 2);
      }
    }
  };

  global.Viz = { BlochSphere: BlochSphere, AmpBars: AmpBars, fitCanvas: fitCanvas };

})(window);
