/* ============================================================
   papers.js — the publication list.

   >>> THIS IS THE FILE YOU EDIT TO ADD A PAPER. <<<
   research.html and the home page both read from this array.

   The first entry is your real, published paper — title, authors,
   journal, volume, article number and DOI all verified against
   Crossref. The rest are drawn from your CV and are marked
   honestly as in progress: no invented venue, no invented DOI.
   Move one up to 'Published' and paste its DOI in when it lands.

   Fields:
     title, authors, venue, year, url, summary, tags
     status      — 'Published' | 'Preprint' | 'In review' | 'In progress'
     statusClass — 'live' (green) | 'research' (cyan) | '' (amber)
     placeholder — true shows a visible "needs link" marker. Keep it
                   false unless an entry is genuinely a stub.
   ============================================================ */

var PAPERS = [
  {
    title: 'Roles of electron–magnon cross diffusion in unidirectional ' +
           'magnetoresistance of metallic magnetic bilayers',
    authors: 'Shashank Gupta, Steven S.-L. Zhang',
    venue: 'Physical Review B 113, 094434',
    year: 2026,
    url: 'https://doi.org/10.1103/pnl1-7vcl',
    summary: 'A coupled nonequilibrium transport framework for electron–magnon ' +
             'interactions, cross diffusion and their statistical distribution ' +
             'functions. The coupled kinetic equations are solved both analytically ' +
             'and numerically to explain the microscopic origins of unidirectional ' +
             'magnetoresistance in metallic bilayers.',
    tags: ['Spintronics', 'Magnon transport', 'UMR', 'Kinetic theory'],
    status: 'Published',
    statusClass: 'live',
    placeholder: false
  },
  {
    title: 'Magic–entanglement trade-offs in the cluster–Ising model',
    authors: 'Shashank Gupta, Ruihao Li',
    venue: 'Manuscript in preparation',
    year: 2026,
    url: '',
    summary: 'How does quantum magic (non-stabilizerness) compete with entanglement ' +
             'in governing variational algorithm performance? Using a custom ansatz ' +
             'that tunes the two independently, alongside a benchmarking pipeline ' +
             'measuring stabilizer Rényi entropy, Pauli mana, entanglement spectra and ' +
             'string-order parameters across the SPT, trivial and symmetry-broken phases.',
    tags: ['Quantum magic', 'Non-stabilizerness', 'VQA', 'Cluster–Ising', 'SRE'],
    status: 'In progress',
    statusClass: '',
    placeholder: false
  },
  {
    title: 'Entanglement-driven complexity in variational quantum algorithms',
    authors: 'Shashank Gupta, Ruihao Li',
    venue: 'Manuscript in preparation',
    year: 2026,
    url: '',
    summary: 'The interplay between ground-state entanglement structure and ansatz ' +
             'trainability for 1D and 2D XXZ Heisenberg models. Hamiltonian-inspired ' +
             'brickwall and ladder circuits are benchmarked under general and restricted ' +
             'two-qubit decompositions, exposing the trade-off between expressibility ' +
             'and trainability that makes deep ansätze fail.',
    tags: ['VQA', 'Trainability', 'Expressibility', 'XXZ Heisenberg', 'Rényi entropy'],
    status: 'In progress',
    statusClass: '',
    placeholder: false
  },
  {
    title: 'Quantum skyrmion lattices: state preparation and phase diagnostics',
    authors: 'Shashank Gupta, Ruihao Li, Shulei Zhang',
    venue: 'Manuscript in preparation',
    year: 2025,
    url: '',
    summary: 'Simulation of quantum skyrmions and neighbouring phases using matrix ' +
             'product states and variational algorithms (VQE, QITE), with a modular ' +
             'simulation framework for scalable state preparation. Results are ' +
             'cross-validated between classical tensor-network and quantum-circuit ' +
             'approaches.',
    tags: ['Quantum skyrmions', 'MPS', 'VQE', 'QITE', 'Tensor networks'],
    status: 'In progress',
    statusClass: '',
    placeholder: false
  },
  {
    title: 'Quantum-assisted standard cell placement for VLSI physical design',
    authors: 'Shashank Gupta',
    venue: 'Early-stage work',
    year: 2026,
    url: '',
    summary: 'Formulating standard-cell placement as a QUBO and testing annealing and ' +
             'QAOA-style approaches against established classical placers on wirelength ' +
             'and congestion. Exploratory — delete this entry if it does not become a paper.',
    tags: ['Cell placement', 'QUBO', 'EDA', 'QAOA'],
    status: 'In progress',
    statusClass: '',
    placeholder: false
  }
];
