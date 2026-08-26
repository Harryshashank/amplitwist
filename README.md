# Amplitwist

Learning quantum algorithms in public — interactive simulations, plain-language
explainers, and a curated reading list. Live at **[amplitwist.com](https://amplitwist.com)**.

Static site: no build step, no dependencies, no npm. Plain HTML, CSS and
JavaScript, so it deploys by uploading a folder and is edited with a refresh.

## What "amplitwist" means

An *amplitwist* is Tristan Needham's term, coined in *Visual Complex Analysis*
(1997), for what a complex derivative does geometrically: it **ampli**fies a
vector and **twist**s it. That is exactly what a quantum amplitude is — a
magnitude and a phase — so every unitary gate in the simulator here is an
amplitwist.

The logo is a logarithmic spiral, `r = r₀·e^(bθ)`, a curve that grows and
rotates at once.

## The simulator

`assets/js/qsim.js` is a genuine state-vector simulator in about 200 lines:
complex amplitudes held as parallel `Float64Array`s, unitary gate application,
partial trace for Bloch vectors, and projective measurement that really does
collapse the state.

Every visual on the site reads out of it. Nothing is keyframed or faked — if
the math were wrong, the pictures would be wrong. It was checked against known
results before anything was built on top of it: Bell and GHZ states, `H·Z·H`
interference, and Grover amplitude amplification matching the analytic
`sin²((2k+1)·arcsin(1/√N))` at every iteration.

Qubit 0 is the least significant bit, so `|q₂q₁q₀⟩` maps to array index
`q₂·4 + q₁·2 + q₀`.

## Run locally

```
python3 -m http.server 8765
```

Then open <http://localhost:8765>. Opening `index.html` directly also works —
everything is written to run from `file://` as well.

## Structure

```
index.html          home
algorithms.html     algorithm explainers, with honest status notes
research.html       curated reading list of key papers
books.html          recommended books, sorted by reader level
learn.html          seven-lesson visual course
playground.html     three-qubit circuit sandbox with puzzles

assets/js/qsim.js        state-vector simulator
assets/js/viz.js         Bloch sphere and amplitude-bar renderers
assets/js/course.js      the seven lesson simulations
assets/js/playground.js  circuit builder and puzzle checks
assets/js/site.js        site config, shared nav/footer/founder card
assets/js/papers.js      reading-list data
assets/js/books.js       book-list data

assets/css/site.css      design tokens, layout, components
assets/css/quantum.css   interactive lab components
```

Content lives in plain data arrays — `papers.js`, `books.js`, and `ALGORITHMS`
in `algorithms.html` — so pages are updated by editing a list, not markup.
Site-wide identity is in the `SITE` object at the top of `site.js`.

## Corrections

If something here is wrong, unclear, or overstates what quantum computing can
currently do, please open an issue. Accuracy matters more to this project than
polish.
