# Naming

## Decision: **Amplitwist**

`amplitwist.com` and `amplitwist.ai` were both confirmed unregistered
(whois returned "No match" for each) on 26 Aug 2026. **Register them before
you tell anyone the name** — that is the one time-sensitive item here.

**What it means.** An *amplitwist* is Tristan Needham's term, coined in
*Visual Complex Analysis* (1997), for what a complex derivative does
geometrically: it **ampli**fies a vector and **twist**s it. That is exactly
what a quantum amplitude is — a magnitude and a phase — so every unitary
gate in the simulator on this site is an amplitwist. The logo is a
logarithmic spiral, r = r0·e^(bθ), which grows and rotates at once: the
mark is the definition of the name.

**Why this one.** It names the whole company rather than one trick —
"Phasekick" is one mechanism, "Ansatz" is one method, and either could
become wrong if the work pivots. It is rare enough to actually own in
search, where "ansatz" would compete with a term physicists use daily.
And a coined portmanteau sits in the strongest trademark class.

**The cost, stated honestly:** nobody spells it right on first hearing.
Buy the obvious typos (`amplitwist.co`, `amplitwyst.com`) if they are cheap.

**Still to do:** a formal trademark clearance search before you file or
take money. Domain availability is not trademark availability.

---

## Why the original name was dropped

Kept as the record of the reasoning.

### On "Schrodinger Quantum Solutions"

Short version: **I would not build a brand on this name**, and the reason is
specific rather than general. This is not legal advice — I'm not a lawyer — but
the conflict is concrete enough that you should look at it before you print
business cards.

## The problem

**Schrödinger, Inc.** (NASDAQ: SDGR) is a real, large, and directly adjacent
company:

- Founded 1990, headquartered in New York
- ~$217M revenue (2023), ~1,000 employees
- Owns `schrodinger.com`
- Sells a physics-based computational platform for **drug discovery and
  materials science**
- Their toolset explicitly includes **quantum mechanics calculations**
- Two business segments: Software, and Drug Discovery

Now compare that to your plan: quantum algorithms for **drug discovery and
material discovery**.

Trademark conflict is decided mostly by *likelihood of confusion*, which is
roughly:

```
similarity of the names  ×  similarity of the goods/services
```

You would score high on both axes simultaneously. The name is essentially
identical (the umlaut and the added generic words "Quantum Solutions" do very
little work — generic descriptors are typically discounted in this analysis),
and the field of use is the same field, described in nearly the same words.

The unfortunate irony is that "Schrödinger" is a *fine* name in the abstract.
Erwin Schrödinger died in 1961; the name is common currency in physics and
nobody owns it generally. The collision is not with the physicist. It is with
an existing company that already occupies precisely the commercial space you
described.

## What is and isn't risky

Risk is not binary — it scales with what you do:

| What you're doing | Realistic risk |
|---|---|
| A personal portfolio site with your papers on it | Low |
| A named "company" website, no revenue, no funding | Low–moderate |
| Taking customers, especially in pharma or materials | High |
| Raising money (diligence *will* flag this) | High |
| Filing your own trademark application | Likely refused |

The last two are the ones that matter. Investors run trademark checks, and a
name collision with a public company in your own sector is the kind of finding
that stalls a round. Renaming a company with traction is painful and expensive;
renaming a website with eleven visitors costs an afternoon.

That asymmetry is the whole argument. The cost of changing now is nearly zero.
The cost of changing later is not.

## What to actually check (all free)

If you want to verify this yourself rather than take my word for it:

1. **USPTO** — <https://tmsearch.uspto.gov> — search `schrodinger`. Pay
   attention to the goods/services descriptions in classes 9 (software) and 42
   (scientific/software services), which is where you'd be filing.
2. **Your national registry** — e.g. India's public search at
   <https://tmrsearch.ipindia.gov.in>, EUIPO's eSearch for Europe, IPO for the
   UK. Trademarks are territorial; a US mark doesn't automatically bind you, but
   an established international brand usually has coverage in major markets.
3. **Companies register** — whether the name can even be incorporated where you
   are.
4. **Domains and handles** — `schrodinger.com` is gone. What you could get would
   be a compromise from day one, which is itself a signal.
5. **A trademark attorney** — a clearance search is typically a few hundred
   dollars and is worth it *before* you commit, not after.

## If you decide to rename

Some directions that keep the physics texture without landing on an occupied
name. These are starting points, **not cleared names** — run every one through
the same checks above:

- **Ansatz** — the trial wavefunction you guess and then optimise. Exactly what
  VQE does. Technical, memorable, and rare as a company name.
- **Trotter** — from Trotterization, how you decompose a Hamiltonian into gates
  you can actually run. A deep cut that practitioners will recognise.
- **Bloch** — the sphere every one of your visualisations is built on.
- **Amplitude / Phase / Interference** — the mechanism your whole course builds
  toward. More likely to be taken; check carefully.

A name that signals you know the field beats a name that signals "quantum" to
people who don't. "Ansatz Labs" tells a physicist you've done the work.
"Quantum Solutions" reads like a stock photo.

## Changing the name again later

Renaming still costs one line. Open [`assets/js/site.js`](assets/js/site.js):

```js
var SITE = {
  name:    'Amplitwist',        // <- the name, everywhere
  short:   'Amplitwist',
  tagline: 'Quantum algorithms for problems classical computers find hard.',
  email:   'hello@amplitwist.com',
  year:    new Date().getFullYear()
};
```

Every page header, footer, page title and contact link reads from that object.
If you change the name again, the logo would want revisiting too — the spiral
is specific to *this* name.

## Runners-up, if you change your mind

All verified unregistered at the same time:

| Name | Domains free | The idea |
|---|---|---|
| **Phasekick** | `.com` + `.ai` | Phase kickback — the mechanism behind Deutsch-Jozsa, Bernstein-Vazirani and Shor's period-finding |
| **Ansatz Computing** | `ansatzcomputing.com`, `ansatzworks.com`, `ansatzresearch.com` | The educated trial solution you then refine — what VQE does |
| **Braidstate** | `.com` + `.ai` | Braiding anyons in topological QC, where the braid *is* the computation |
| **Trotterize** | `.com` + `.ai` | Decomposing a Hamiltonian into gates you can actually run |

Also free: `braidwave.com`, `phaseweave.ai`, `interfera.ai`, `fringeweave.com`,
`nonlocallabs.com`, `singletlabs.com`, `krausquantum.com`, `floquetcomputing.com`,
`gatesetlabs.com`.

Already gone, so don't chase them: `entangle.ai`, `entangled.ai`, `magicstate.*`,
`catstate.*`, `zeno.ai`, `spookyaction.*`, `nonlocal.ai`, `statevector.*`,
`eigenwave.*`, `bellstate.*`, `manyworlds.ai`, `delayedchoice.com`,
`observereffect.com`. Entanglement and magic states are what everyone reaches
for first.
