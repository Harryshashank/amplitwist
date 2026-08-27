/* ============================================================
   papers.js: curated reading list of published work.

   >>> EDIT THIS FILE TO ADD OR REMOVE A PAPER. <<<
   research.html and the home page both read from this array.

   These are landmark papers by other researchers, not our own
   work. Every entry below was verified against the arXiv API:
   titles, first authors, years and journal references are exact
   as of Aug 2026, not typed from memory.

   arXiv links are used in preference to publisher DOIs because
   they are free to read, stable, and never sit behind a paywall.

   Fields:
     title    : exact paper title
     authors  : 'First Author et al.' for long author lists
     venue    : journal reference, or 'arXiv preprint' if unpublished
     year     : year of the version being cited
     arxiv    : arXiv ID; the link is built from this
     topic    : groups and filters the list (see TOPICS below)
     note     : why this one is worth your time, in plain language
     tags     : filter chips
   ============================================================ */

var TOPICS = [
  'Foundations',
  'Variational algorithms',
  'Optimisation',
  'Chemistry & materials',
  'Tensor networks',
  'Limits & reality checks',
  'Machine learning'
];

var PAPERS = [
  /* ---------------- Foundations ---------------- */
  {
    title: 'Polynomial-Time Algorithms for Prime Factorization and Discrete Logarithms on a Quantum Computer',
    authors: 'Peter W. Shor',
    venue: 'SIAM J. Comput. 26, 1484',
    year: 1997,
    arxiv: 'quant-ph/9508027',
    topic: 'Foundations',
    note: 'The paper that made everyone care. An exponential speedup for factoring, ' +
          'which is why quantum computing has a budget. Read it for the structure of ' +
          'the argument: period finding is the actual engine, and factoring is a ' +
          'corollary.',
    tags: ['Shor', 'Factoring', 'Period finding']
  },
  {
    title: 'A fast quantum mechanical algorithm for database search',
    authors: 'Lov K. Grover',
    venue: 'STOC \'96',
    year: 1996,
    arxiv: 'quant-ph/9605043',
    topic: 'Foundations',
    note: 'Four pages, and the cleanest demonstration in the literature that ' +
          'interference does real work. Quadratic rather than exponential, but ' +
          'provable, and general enough to apply to any unstructured search.',
    tags: ['Grover', 'Amplitude amplification', 'Search']
  },
  {
    title: 'Quantum Computation by Adiabatic Evolution',
    authors: 'Edward Farhi et al.',
    venue: 'arXiv preprint',
    year: 2000,
    arxiv: 'quant-ph/0001106',
    topic: 'Foundations',
    note: 'The origin of the adiabatic model and everything annealing-shaped that ' +
          'followed. Start in the ground state of something easy, deform slowly to ' +
          'something hard. The whole question is how slowly, and that is set by the ' +
          'spectral gap, which is where the difficulty hides.',
    tags: ['Adiabatic', 'Annealing', 'Spectral gap']
  },

  /* ---------------- Variational algorithms ---------------- */
  {
    title: 'A variational eigenvalue solver on a quantum processor',
    authors: 'Alberto Peruzzo et al.',
    venue: 'Nature Communications 5, 4213',
    year: 2014,
    arxiv: '1304.3061',
    topic: 'Variational algorithms',
    note: 'The original VQE paper. Worth reading precisely because the hardware was ' +
          'so limited: it forced the hybrid design where the quantum device only ' +
          'prepares and measures, and a classical optimiser does the rest. That ' +
          'compromise is why VQE runs on noisy machines at all.',
    tags: ['VQE', 'Hybrid', 'Foundational']
  },
  {
    title: 'The theory of variational hybrid quantum-classical algorithms',
    authors: 'Jarrod R. McClean et al.',
    venue: 'New J. Phys. 18, 023023',
    year: 2016,
    arxiv: '1509.04279',
    topic: 'Variational algorithms',
    note: 'The theoretical footing under VQE, and why the variational principle gives ' +
          'you a genuine upper bound, and how measurement cost scales. Read this ' +
          'before you trust any VQE result, including your own.',
    tags: ['VQE', 'Theory', 'Measurement cost']
  },
  {
    title: 'Hardware-efficient Variational Quantum Eigensolver for Small Molecules and Quantum Magnets',
    authors: 'Abhinav Kandala et al.',
    venue: 'Nature 549, 242',
    year: 2017,
    arxiv: '1704.05018',
    topic: 'Variational algorithms',
    note: 'Introduced the hardware-efficient ansatz: build the circuit from gates the ' +
          'device actually has rather than from chemistry. Enormously influential, and ' +
          'the direct cause of the barren-plateau problem below, a good lesson in how ' +
          'a fix at one layer creates a failure at another.',
    tags: ['Ansatz', 'Hardware-efficient', 'Chemistry']
  },
  {
    title: 'Variational Quantum Algorithms',
    authors: 'M. Cerezo et al.',
    venue: 'Nature Reviews Physics 3, 625',
    year: 2021,
    arxiv: '2012.09265',
    topic: 'Variational algorithms',
    note: 'The review to read if you only read one. Covers the whole variational ' +
          'family, the training problems, and the open questions, without overselling ' +
          'any of it.',
    tags: ['Review', 'VQA', 'Start here']
  },

  /* ---------------- Optimisation ---------------- */
  {
    title: 'A Quantum Approximate Optimization Algorithm',
    authors: 'Edward Farhi, Jeffrey Goldstone, Sam Gutmann',
    venue: 'arXiv preprint',
    year: 2014,
    arxiv: '1411.4028',
    topic: 'Optimisation',
    note: 'The QAOA paper. A fixed alternating structure of cost and mixer layers, ' +
          'with the depth p as the knob. Short and readable, and note how carefully ' +
          'it avoids claiming an advantage, which later work has often not.',
    tags: ['QAOA', 'Optimisation', 'Foundational']
  },
  {
    title: 'Ising formulations of many NP problems',
    authors: 'Andrew Lucas',
    venue: 'Frontiers in Physics 2, 5',
    year: 2014,
    arxiv: '1302.5843',
    topic: 'Optimisation',
    note: 'The single most practically useful paper on this page. A catalogue of NP ' +
          'problems written explicitly as Ising Hamiltonians: partitioning, covering, ' +
          'colouring, Hamiltonian cycles, and more. If you need to map a problem to a ' +
          'QUBO, the mapping is probably already in here.',
    tags: ['QUBO', 'Ising', 'Problem mapping', 'Practical']
  },

  /* ---------------- Chemistry & materials ---------------- */
  {
    title: 'Quantum computational chemistry',
    authors: 'Sam McArdle et al.',
    venue: 'Rev. Mod. Phys. 92, 015003',
    year: 2020,
    arxiv: '1808.10402',
    topic: 'Chemistry & materials',
    note: 'A Reviews of Modern Physics treatment of quantum chemistry on quantum ' +
          'computers. Thorough and honest about what remains out of reach. The best ' +
          'single entry point if molecules are your target.',
    tags: ['Chemistry', 'Review', 'Rigorous']
  },
  {
    title: 'Quantum Chemistry in the Age of Quantum Computing',
    authors: 'Yudong Cao et al.',
    venue: 'Chemical Reviews 119, 10856',
    year: 2019,
    arxiv: '1812.09976',
    topic: 'Chemistry & materials',
    note: 'Broader and more accessible than the RMP review, with a thirteen-author ' +
          'sweep across encodings, algorithms and error mitigation. Good for finding ' +
          'the sub-area you actually want.',
    tags: ['Chemistry', 'Review', 'Broad']
  },
  {
    title: 'Quantum algorithms for quantum chemistry and quantum materials science',
    authors: 'Bela Bauer et al.',
    venue: 'Chemical Reviews 120, 12685',
    year: 2020,
    arxiv: '2001.03685',
    topic: 'Chemistry & materials',
    note: 'Extends the chemistry picture to materials: lattice models, correlated ' +
          'electrons, and embedding methods that keep the quantum part small enough ' +
          'to run. The closest thing to a roadmap for materials discovery.',
    tags: ['Materials', 'Embedding', 'Correlated electrons']
  },

  /* ---------------- Tensor networks ---------------- */
  {
    title: 'The density-matrix renormalization group in the age of matrix product states',
    authors: 'Ulrich Schollwöck',
    venue: 'Annals of Physics 326, 96',
    year: 2011,
    arxiv: '1008.3477',
    topic: 'Tensor networks',
    note: 'DMRG and MPS, explained properly. Essential context: this is the classical ' +
          'method your quantum algorithm has to beat, and for 1D systems it is very ' +
          'hard to beat. Knowing where it fails tells you where quantum might win.',
    tags: ['MPS', 'DMRG', 'Classical baseline']
  },
  {
    title: 'A Practical Introduction to Tensor Networks: Matrix Product States and Projected Entangled Pair States',
    authors: 'Román Orús',
    venue: 'Annals of Physics 349, 117',
    year: 2014,
    arxiv: '1306.2164',
    topic: 'Tensor networks',
    note: 'The gentler way in. Builds the diagrammatic notation from scratch, which is ' +
          'the thing that makes every later tensor-network paper readable.',
    tags: ['Tensor networks', 'Introduction', 'PEPS']
  },

  /* ---------------- Limits & reality checks ---------------- */
  {
    title: 'Quantum Computing in the NISQ era and beyond',
    authors: 'John Preskill',
    venue: 'Quantum 2, 79',
    year: 2018,
    arxiv: '1801.00862',
    topic: 'Limits & reality checks',
    note: 'Coined "NISQ" and set the terms of the entire near-term debate. Read it for ' +
          'the calibration: enthusiastic about the long run, unsparing about what ' +
          'current devices can actually do.',
    tags: ['NISQ', 'Essential', 'Perspective']
  },
  {
    title: 'Barren plateaus in quantum neural network training landscapes',
    authors: 'Jarrod R. McClean et al.',
    venue: 'Nature Communications 9, 4812',
    year: 2018,
    arxiv: '1803.11173',
    topic: 'Limits & reality checks',
    note: 'The result that constrains every variational algorithm. As circuits get ' +
          'deeper and more expressive, gradients vanish exponentially and training ' +
          'stops working. This is the central obstacle in near-term quantum computing ' +
          'and any serious VQA proposal has to answer it.',
    tags: ['Barren plateaus', 'Trainability', 'Essential']
  },
  {
    title: 'Noisy intermediate-scale quantum (NISQ) algorithms',
    authors: 'Kishor Bharti et al.',
    venue: 'Rev. Mod. Phys. 94, 015004',
    year: 2022,
    arxiv: '2101.08448',
    topic: 'Limits & reality checks',
    note: 'A comprehensive survey of what has actually been tried on NISQ hardware and ' +
          'how it went. Useful as a reality check against marketing claims, including ' +
          'ones you might be tempted to make yourself.',
    tags: ['NISQ', 'Survey', 'Benchmarks']
  },
  {
    title: 'A Theory of Trotter Error',
    authors: 'Andrew M. Childs et al.',
    venue: 'Phys. Rev. X 11, 011020',
    year: 2021,
    arxiv: '1912.08854',
    topic: 'Limits & reality checks',
    note: 'Tight bounds on the error from splitting a Hamiltonian into implementable ' +
          'gates. Matters because Trotter error sets your circuit depth, and circuit ' +
          'depth sets whether the computation survives the noise.',
    tags: ['Trotter', 'Simulation', 'Error bounds']
  },

  /* ---------------- Machine learning ---------------- */
  {
    title: 'Supervised learning with quantum enhanced feature spaces',
    authors: 'Vojtěch Havlíček et al.',
    venue: 'Nature 567, 209',
    year: 2019,
    arxiv: '1804.11326',
    topic: 'Machine learning',
    note: 'The quantum kernel method, run on real hardware. The idea is elegant: map ' +
          'data into a Hilbert space that is hard to simulate classically, then use ' +
          'ordinary SVM machinery. Whether that helps on real datasets is still open.',
    tags: ['QML', 'Kernels', 'Feature maps']
  },
  {
    title: 'Quantum machine learning in feature Hilbert spaces',
    authors: 'Maria Schuld, Nathan Killoran',
    venue: 'Phys. Rev. Lett. 122, 040504',
    year: 2019,
    arxiv: '1803.07128',
    topic: 'Machine learning',
    note: 'The companion framing of the same idea, and the clearer explanation of why ' +
          'a quantum feature map is a kernel. Schuld is also reliably sceptical about ' +
          'quantum ML hype, which makes her worth following.',
    tags: ['QML', 'Kernels', 'Theory']
  }
];
