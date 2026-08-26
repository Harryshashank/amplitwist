# Amplitwist — website

A static site. No build step, no dependencies, no npm. Every page is plain
HTML/CSS/JS, so you can edit a file and hit refresh.

## Registering the name

See [REGISTRATION.md](REGISTRATION.md) for the full checklist — domains,
handles, trademark and entity, in the order worth doing them. The only urgent
item is registering `amplitwist.com` and `amplitwist.ai`.

## Run it locally

```
python3 -m http.server 8765
```

Then open http://localhost:8765

(You can also just double-click `index.html` — everything is written to work
from `file://` too.)

## Deploy it

Drag this whole folder onto https://app.netlify.com/drop — that is the entire
deployment process. GitHub Pages, Cloudflare Pages and Vercel all work the same
way: point them at this folder, no build command, no output directory.

## What to edit

| I want to change...          | Edit this file                               |
|------------------------------|----------------------------------------------|
| The company name             | `assets/js/site.js` — the `SITE` object, top  |
| **Your name, bio, photo**    | `assets/js/site.js` — the `FOUNDER` object   |
| Your publications            | `assets/js/papers.js` — one array            |
| The reading list             | `assets/js/books.js` — one array             |
| The algorithm write-ups      | `algorithms.html` — the `ALGORITHMS` array   |
| Colours, fonts, spacing      | `assets/css/site.css` — the `:root` tokens   |
| Course lessons               | `learn.html` + `assets/js/course.js`         |
| Playground puzzles           | `assets/js/playground.js` — `PUZZLES` array  |
| Nav menu items               | `assets/js/site.js` — the `NAV` array        |

### Your photo

Drop a square headshot at `assets/img/founder.jpg` (~600x600 is plenty) and set
your name in `FOUNDER`. Until that file exists the card shows a monogram of your
initials on a dashed circle — deliberately, so a missing photo looks unfinished
*on purpose* rather than looking broken. Both paths are tested.

### Your books

`assets/js/books.js` has two shelves, set per entry via `shelf`:

- `'authored'` — books you wrote. Shown first, in their own section with its own
  heading. The section is hidden entirely while there are none, so the page
  never displays an empty shelf. There are no entries yet; a commented-out
  template sits at the top of the file.
- `'recommended'` — the curated list, currently ten real books.

Book entries have no hardcoded product URLs. When `url` is empty the card links
to a Google Books search for that exact title and author, which always resolves.
Set `url` to override with a publisher page or your own affiliate link.

The company name appears in exactly one place (`SITE.name`). Change it there and
the whole site follows — see [NAMING.md](NAMING.md) for how the name was chosen
and what still needs doing (register the domains; get a trademark clearance
search before you file or raise).

## The simulator

`assets/js/qsim.js` is a real state-vector simulator: complex amplitudes,
unitary gate application, partial trace for the Bloch vectors, and projective
measurement. Every visual on the site reads out of it — nothing is keyframed or
faked. Its math was verified against known results (Bell states, GHZ, Grover
amplitude amplification, H-Z-H interference) before the pages were built.

Qubit 0 is the least significant bit, so `|q2 q1 q0>` maps to array index
`q2*4 + q1*2 + q0`.

## Files

```
index.html          home (incl. founder card)
algorithms.html     algorithm portfolio
research.html       publications (reads papers.js)
books.html          reading list (reads books.js)
learn.html          7-lesson visual course
playground.html     circuit sandbox + 9 puzzles

assets/css/site.css      design tokens, layout, nav, cards
assets/css/quantum.css   interactive lab components
assets/js/qsim.js        quantum simulator
assets/js/viz.js         Bloch sphere + amplitude bar renderers
assets/js/site.js        brand + founder config, shared nav/footer/founder card
assets/js/papers.js      publication data
assets/js/books.js       reading-list data
assets/img/              put founder.jpg here
assets/js/course.js      the 7 lesson simulations
assets/js/playground.js  circuit builder + puzzle checks
```
