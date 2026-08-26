# Claiming "Amplitwist"

**Decision: `amplitwist.com`, renewed yearly. No `.ai`, no trademark, no
company.** Steps 1 and 2 below are all you need. Everything after that is
reference for later.

---


This is written for what this actually is: **a learning project that might
become something later.** The expensive path (trademark, incorporation) is at
the bottom, greyed out until you need it. You almost certainly don't.

Verified available on **26 Aug 2026**: `amplitwist.com`, `amplitwist.ai`,
`amplitwist.org`, `amplitwist.net`, `amplitwyst.com`.

---

## The short answer

**You do not need to "claim the name" at all right now.**

A trademark protects a name *used in commerce*. If you aren't selling anything,
there is nothing to protect and nobody to infringe. Filing one would cost
$700–2,700 to defend a claim you aren't making. Skip it entirely.

What's actually worth doing is holding the name in the two or three places
people would look for it — and all of those are **free and never expire.**

---

## Free, permanent, no renewal — do this

### 1. GitHub organisation named `amplitwist`

This is the single best move. It's free, it never expires, and it gets you:

- The name held on the platform that matters most for a technical project
- A free URL that costs nothing forever: **`amplitwist.github.io`**
- Somewhere to actually put the code

Create it at [github.com/organizations/new](https://github.com/organizations/new)
(pick the Free plan), then make a repository named exactly
`amplitwist.github.io`. Push this folder to it and the site is live at that
address with no build step, no config, and no bill — ever.

- [ ] GitHub org `amplitwist`
- [ ] Repo `amplitwist.github.io`
- [ ] Settings → Pages → Source: `main` branch, `/` root

### 2. Free handles, if you care

Ten minutes, no cost, no renewal:

- [ ] X / Twitter `@amplitwist`
- [ ] LinkedIn page
- [ ] Bluesky

### Other free URLs

If you'd rather not use GitHub Pages:

| Host | Free URL | Renewal |
|---|---|---|
| GitHub Pages | `amplitwist.github.io` | never |
| Cloudflare Pages | `amplitwist.pages.dev` | never |
| Netlify | `amplitwist.netlify.app` | never |

All three serve this site as-is. It has no build step, so "deploying" means
uploading the folder.

---

## The one thing worth paying for (optional)

### `amplitwist.com` — about $10–12/year, forever

Only worth it for two reasons:

1. It looks real. `amplitwist.com` on a CV or in a talk reads differently from
   `amplitwist.github.io`.
2. **Insurance.** If this ever does become something, you'll badly want the
   name, and by then someone may have it. Ten dollars a year is cheap
   insurance against that specific regret.

If you buy it, buy it at [Cloudflare Registrar](https://domains.cloudflare.com/)
— wholesale cost, no markup, no cheap-first-year trick, WHOIS privacy free.

**On renewals:**

- Yes, every year, indefinitely. You are renting, not buying.
- Turn on **auto-renew** and use a card that won't expire soon. Forgetting is
  the most common way people lose a domain.
- You can **prepay up to 10 years** at once. For a project you'll neglect for
  stretches, this is the right move — ~$100 once and you stop thinking about it
  until 2036.
- You can point a `.com` at GitHub Pages for free. Paying for the domain does
  not mean paying for hosting.

### Skip `.ai`

It's $70–100/year — five to ten times the `.com`, forever, for a project that
isn't earning. If Amplitwist ever becomes a company, buy it then. The risk of
losing it in the meantime is real but small, and it isn't worth $100/year
against a maybe.

### Skip the defensive misspellings

`amplitwyst.com` and friends only matter when you have traffic to lose.

---

## Realistic budget

| Path | Up front | Per year |
|---|---|---|
| **Free only** — GitHub org + Pages | $0 | **$0** |
| **Recommended** — the above + `.com` | ~$11 | **~$11** |
| The above, prepaid 10 years | ~$110 | $0 until 2036 |

Use **™** next to the name if you like — it needs no registration and signals a
claim. **®** is illegal until a mark actually registers.

---

## Pointing `amplitwist.com` at the site

The repo is already prepared: a `CNAME` file containing `amplitwist.com` sits in
the root, which is how GitHub Pages learns your custom domain. Do this after the
domain is registered and the repo is pushed.

### At Cloudflare — DNS tab, add these records

Four A records, all with name `@` (the apex). These were verified against
GitHub's published list on 26 Aug 2026:

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `amplitwist.github.io` |

Optionally add the IPv6 equivalents, same `@` name:
`2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`,
`2606:50c0:8003::153`

### The Cloudflare gotcha that catches everyone

Set the proxy status to **DNS only** — the **grey** cloud, not the orange one.

If you leave Cloudflare proxying enabled, GitHub cannot complete its certificate
check and HTTPS will fail; and with Cloudflare's SSL mode set to "Flexible" you
get an infinite redirect loop. Grey cloud, wait for GitHub to issue the
certificate, and only then turn the proxy on if you want it (setting SSL/TLS
mode to **Full** at the same time).

### Then, on GitHub

1. Repo → Settings → Pages
2. Custom domain: `amplitwist.com` → Save
3. Wait for the DNS check to go green (usually minutes, occasionally an hour)
4. Tick **Enforce HTTPS** once it becomes available — it is greyed out until
   the certificate is issued, which is normal

### Checking it worked

```
dig +short amplitwist.com
curl -sI https://amplitwist.com | head -1
```

The first should return the four GitHub IPs; the second `HTTP/2 200`.

---

## Later, if it becomes real

Ignore all of this until you are taking money for something.

- **Trademark (USPTO):** $350 per class, flat, via Trademark Center. Classes 9
  (software) and 42 (SaaS / research services) ≈ $700 government fees, plus
  $1,000–2,000 for an attorney. Roughly 8–14 months. File "intent to use"
  (Section 1(b)) to reserve a priority date before you sell.
  Note: foreign-domiciled applicants are **required** to use a US-licensed
  attorney.
- **Entity:** an LLC in your home state (~$50–500) when you're signing
  contracts; a Delaware C-Corp (~$500) only if raising venture capital.
- **Clearance search first:** [tmsearch.uspto.gov](https://tmsearch.uspto.gov),
  classes 9 and 42, plus phonetic near-misses. Domain availability is not
  trademark availability — unrelated systems.

Not legal advice; I'm not a lawyer. But none of the above applies to a project
that isn't selling anything.
