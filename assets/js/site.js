/* ============================================================
   site.js — brand config, shared nav/footer, small helpers.

   THE NAME LIVES HERE. Change SITE.name / SITE.short below and
   every page updates. Nothing else hardcodes the company name,
   so rebranding is a one-line edit.
   ============================================================ */

var SITE = {
  name:    'Amplitwist',
  short:   'Amplitwist',
  tagline: 'Quantum algorithms for problems classical computers find hard.',
  // Deliberately a placeholder — put whatever address you actually want
  // published here. Anything with [data-site-email] picks it up.
  email:   'shashank.gupta2@case.edu',
  year:    new Date().getFullYear()
};

var NAV = [
  { href: 'index.html',       label: 'Home' },
  { href: 'algorithms.html',  label: 'Algorithms' },
  { href: 'research.html',    label: 'Research' },
  { href: 'books.html',       label: 'Books' },
  { href: 'learn.html',       label: 'Learn' },
  { href: 'playground.html',  label: 'Playground' }
];

/* ------------------------------------------------------------
   FOUNDER — your details. Edit these.

   photo: drop a headshot at assets/img/founder.jpg (square works
   best, ~600x600). If the file is missing or fails to load, the
   page falls back to a monogram of your initials instead of
   showing a broken image, so it never looks unfinished.

   Any link with an empty url is skipped, so delete nothing —
   just leave the ones you don't have blank.
   ------------------------------------------------------------ */
var FOUNDER = {
  name:  'Shashank Gupta',
  role:  'Founder',   // kept short: the eyebrow is uppercase mono and wraps badly
  photo: 'assets/img/founder.jpg',
  bio:   'I am a PhD candidate in condensed matter physics at Case Western Reserve ' +
         'University, working with Dr. Ruihao Li on variational quantum algorithms and ' +
         'tensor-network methods. My current research asks what actually makes a quantum ' +
         'state hard to prepare — specifically how non-stabilizerness ("magic") and ' +
         'entanglement trade off against the trainability of a variational ansatz. Before ' +
         'that I simulated quantum skyrmion lattices using matrix product states, and my ' +
         'first-author work on electron–magnon cross diffusion appeared in Physical Review B. ' +
         'Masters in physics from IIT Madras; undergraduate at the University of Delhi.',
  links: [
    { label: 'GitHub',   url: 'https://github.com/Harryshashank' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/shashank-gupta-1282241a4/' },
    { label: 'Email',    url: 'mailto:shashank.gupta2@case.edu' }
  ]
};

/* Logo: two orbital rings around a nucleus. Inline SVG so it
   inherits currentColor and needs no image request. */
/* The mark is the name's definition: a logarithmic spiral, r = r0·e^(bθ),
   which grows and rotates at once — an amplitwist. Cyan inner turns hand off
   to violet outer turns, with an arrowhead on the tangent at the tip.
   Generated geometry; edit the path data only if you regenerate the spiral. */
var BRAND_MARK =
  '<svg class="brand-mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">' +
    '<path d="M 18.00 16.00 L 18.02 15.77 L 18.00 15.54 L 17.97 15.30 L 17.90 15.07 L 17.81 14.85 L 17.69 14.63 L 17.55 14.42 L 17.38 14.23 L 17.18 14.06 L 16.97 13.91 L 16.74 13.78 L 16.49 13.68 L 16.23 13.61 L 15.95 13.56 L 15.67 13.55 L 15.39 13.57 L 15.10 13.62 L 14.82 13.70 L 14.55 13.82 L 14.29 13.97 L 14.04 14.15 L 13.81 14.36 L 13.61 14.60 L 13.43 14.87 L 13.28 15.15 L 13.16 15.46 L 13.08 15.78 L 13.03 16.11 L 13.02 16.46 L 13.05 16.80 L 13.12 17.15 L 13.23 17.49 L 13.38 17.82 L 13.57 18.13 L 13.79 18.43 L 14.06 18.70 L 14.35 18.95 L 14.68 19.16 L 15.03 19.34 L 15.41 19.47 L 15.80 19.57 L 16.21 19.62 L 16.63 19.62 L 17.05 19.58 L 17.47 19.49 L 17.88 19.34 L 18.28 19.15 L 18.66 18.92 L 19.01 18.63 L 19.34 18.31 L 19.63 17.94 L 19.88 17.54 L 20.09 17.10 L 20.25 16.64 L 20.35 16.16 L 20.41 15.66 L 20.40 15.15 L 20.34 14.64 L 20.21 14.13 L 20.03 13.63 L 19.79 13.15 L 19.49 12.69 L 19.14 12.26 L 18.73 11.87 L 18.28 11.53 L 17.78 11.23 L 17.25 10.99" stroke="#4fd6e8" stroke-width="1.7" stroke-linecap="round"/>' +
    '<path d="M 17.25 10.99 L 16.68 10.81 L 16.09 10.69 L 15.48 10.64 L 14.86 10.66 L 14.24 10.75 L 13.62 10.91 L 13.01 11.14 L 12.43 11.45 L 11.88 11.82 L 11.37 12.26 L 10.90 12.77 L 10.49 13.33 L 10.14 13.94 L 9.86 14.60 L 9.65 15.29 L 9.52 16.02 L 9.47 16.76 L 9.51 17.52 L 9.64 18.27 L 9.85 19.02 L 10.15 19.75 L 10.53 20.46 L 11.00 21.12 L 11.55 21.73 L 12.18 22.29 L 12.87 22.77 L 13.63 23.19 L 14.43 23.52 L 15.29 23.75 L 16.17 23.90 L 17.08 23.94 L 18.00 23.87 L 18.92 23.70 L 19.83 23.43 L 20.71 23.04 L 21.56 22.56 L 22.36 21.97 L 23.09 21.28 L 23.75 20.51 L 24.33 19.65 L 24.82 18.72 L 25.20 17.73 L 25.47 16.69 L 25.62 15.60 L 25.65 14.50 L 25.55 13.37 L 25.32 12.26 L 24.96 11.16 L 24.48 10.09 L 23.86 9.07 L 23.13 8.11 L 22.27 7.23 L 21.32 6.44 L 20.26 5.76 L 19.11 5.19 L 17.89 4.75 L 16.62 4.44 L 15.29 4.28 L 13.94 4.27 L 12.57 4.42 L 11.22 4.72 L 9.88 5.19 L 8.59 5.81" stroke="#7c6cff" stroke-width="1.9" stroke-linecap="round"/>' +
    '<path d="M 4.83 7.88 L 7.39 3.62 L 9.80 8.00 Z" fill="#a493ff"/>' +
    '<circle cx="16" cy="16" r="2.1" fill="#a493ff"/>' +
  '</svg>';

(function () {
  'use strict';

  function currentPage() {
    var p = location.pathname.split('/').pop();
    return (!p || p === '') ? 'index.html' : p;
  }

  function buildNav() {
    var here = currentPage();
    var links = NAV.map(function (item) {
      var active = item.href === here ? ' class="active"' : '';
      return '<a href="' + item.href + '"' + active + '>' + item.label + '</a>';
    }).join('');

    return '' +
      '<header class="nav">' +
        '<div class="nav-inner">' +
          '<a class="brand" href="index.html">' + BRAND_MARK + '<span>' + SITE.name + '</span></a>' +
          '<button class="nav-toggle" aria-label="Menu" aria-expanded="false">☰</button>' +
          '<nav class="nav-links">' + links + '</nav>' +
        '</div>' +
      '</header>';
  }

  function buildFooter() {
    var links = NAV.map(function (i) {
      return '<a href="' + i.href + '">' + i.label + '</a>';
    }).join('');

    return '' +
      '<footer><div class="wrap">' +
        '<div class="footer-inner">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:9px;color:var(--text);font-weight:600;margin-bottom:7px">' +
              BRAND_MARK + '<span>' + SITE.name + '</span>' +
            '</div>' +
            '<div class="dim">' + SITE.tagline + '</div>' +
          '</div>' +
          '<div class="footer-links">' + links + '</div>' +
        '</div>' +
        '<div class="footer-note">' +
          '&copy; ' + SITE.year + ' ' + SITE.name + '. ' +
          'Simulations on this site run in your browser on a classical computer — ' +
          'they reproduce the mathematics of small quantum systems, not quantum hardware.' +
        '</div>' +
      '</div></footer>';
  }

  /* Initials, for the photo fallback. "Ada Lovelace" -> "AL" */
  function initials(name) {
    var parts = String(name).trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function buildFounder() {
    var links = (FOUNDER.links || [])
      .filter(function (l) { return l.url; })
      .map(function (l) {
        return '<a class="btn btn-sm" href="' + l.url + '" target="_blank" rel="noopener">' +
               l.label + ' ↗</a>';
      }).join('');

    return '' +
      '<div class="founder">' +
        '<div class="founder-photo">' +
          '<img src="' + FOUNDER.photo + '" alt="' + FOUNDER.name + '" ' +
               'onerror="this.parentNode.classList.add(\'is-fallback\');this.remove();">' +
          '<span class="founder-monogram" aria-hidden="true">' + initials(FOUNDER.name) + '</span>' +
        '</div>' +
        '<div class="founder-body">' +
          '<span class="eyebrow">' + FOUNDER.role + '</span>' +
          '<h3 class="founder-name">' + FOUNDER.name + '</h3>' +
          '<p>' + FOUNDER.bio + '</p>' +
          (links ? '<div class="founder-links">' + links + '</div>' : '') +
        '</div>' +
      '</div>';
  }

  function mount() {
    var founderSlot = document.querySelector('[data-founder]');
    if (founderSlot) founderSlot.outerHTML = buildFounder();

    var navSlot = document.querySelector('[data-nav]');
    if (navSlot) navSlot.outerHTML = buildNav();

    var footSlot = document.querySelector('[data-footer]');
    if (footSlot) footSlot.outerHTML = buildFooter();

    var toggle = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.nav-links');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        var open = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
    }

    // Any element with data-site-name gets the brand injected
    document.querySelectorAll('[data-site-name]').forEach(function (el) {
      el.textContent = SITE.name;
    });
    document.querySelectorAll('[data-site-short]').forEach(function (el) {
      el.textContent = SITE.short;
    });

    // Contact links: fill both the href and the visible text from SITE.email
    document.querySelectorAll('[data-site-email]').forEach(function (el) {
      el.setAttribute('href', 'mailto:' + SITE.email);
      if (el.dataset.siteEmail === 'text') el.textContent = SITE.email;
    });

    // Title suffix, unless the page opted out. Guarded so that including
    // this script twice cannot append the suffix twice.
    if (!document.body.hasAttribute('data-no-title-suffix') &&
        document.title.indexOf(SITE.name) === -1) {
      document.title = document.title + ' · ' + SITE.name;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
