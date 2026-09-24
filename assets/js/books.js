/* ============================================================
   books.js: the reading list.

   >>> EDIT THIS FILE TO CHANGE THE BOOKSHELF. <<<

   Two shelves, controlled by the `shelf` field:
     'authored'    = books YOU wrote. Shown first, in their own section.
                     There are none yet; add them as they exist.
     'recommended' = books you point people at.

   Titles, authors and publishers below are real and accurate, but
   `url` is left empty on purpose: I won't guess at specific product
   pages. When `url` is empty the card links to a Google Books search
   for that exact title and author, which always resolves. Paste a
   real link (publisher page, DOI, your affiliate link) into `url`
   whenever you want to override that.

   Fields:
     title, authors, publisher, year
     level     : 'Start here' | 'Core' | 'Deeper' | 'Reference' | 'Context'
     shelf     : 'authored' | 'recommended'
     note      : why YOU are recommending it, in your own voice
     tags      : filter chips
     url       : optional; overrides the search fallback
   ============================================================ */

var BOOKS = [
  /* ---- Books you've written. Add them here. ----
  {
    title: 'Your Book Title',
    authors: 'Your Name',
    publisher: 'Publisher',
    year: 2026,
    level: 'Core',
    shelf: 'authored',
    note: 'One paragraph on who it is for and what it covers.',
    tags: ['Quantum algorithms'],
    url: ''
  },
  */

  {
    title: 'Quantum Computation and Quantum Information',
    authors: 'Michael A. Nielsen and Isaac L. Chuang',
    publisher: 'Cambridge University Press',
    year: 2010,
    level: 'Reference',
    shelf: 'recommended',
    note: 'Universally called "Mike & Ike". It is the standard reference and has been ' +
          'for more than two decades. Not a first book, but every serious practitioner ends up ' +
          'owning a copy, and most arguments in the field are settled by opening it.',
    tags: ['Reference', 'Rigorous', 'Graduate'],
    url: ''
  },
  {
    title: 'Quantum Computing Since Democritus',
    authors: 'Scott Aaronson',
    publisher: 'Cambridge University Press',
    year: 2013,
    level: 'Context',
    shelf: 'recommended',
    note: 'Complexity theory, philosophy, and quantum computing, written by someone ' +
          'genuinely funny. It will not teach you to build a circuit. It will teach you ' +
          'to think clearly about what quantum computers can and cannot do, which is ' +
          'the skill most often missing.',
    tags: ['Complexity', 'Philosophy', 'Opinionated'],
    url: ''
  },
  {
    title: 'Programming Quantum Computers: Essential Algorithms and Code Samples',
    authors: 'Eric R. Johnston, Nic Harrigan and Mercedes Gimeno-Segovia',
    publisher: "O'Reilly Media",
    year: 2019,
    level: 'Start here',
    shelf: 'recommended',
    note: 'The most practical entry point if you come from software rather than physics. ' +
          'Circuit-first, code-first, and it leans hard on visual intuition instead of ' +
          'asking you to accept the linear algebra up front.',
    tags: ['Practical', 'Beginner', 'Code'],
    url: ''
  },
  {
    title: 'Quantum Computing for Computer Scientists',
    authors: 'Noson S. Yanofsky and Mirco A. Mannucci',
    publisher: 'Cambridge University Press',
    year: 2008,
    level: 'Start here',
    shelf: 'recommended',
    note: 'Builds the mathematics from complex numbers upward, assuming a CS background ' +
          'and no physics. If the linear algebra is what is blocking you, start here ' +
          'rather than with Nielsen & Chuang.',
    tags: ['Beginner', 'Mathematics', 'CS background'],
    url: ''
  },
  {
    title: 'An Introduction to Quantum Computing',
    authors: 'Phillip Kaye, Raymond Laflamme and Michele Mosca',
    publisher: 'Oxford University Press',
    year: 2007,
    level: 'Core',
    shelf: 'recommended',
    note: 'Short, tight and rigorous: the algorithms without the doorstop. A good ' +
          'bridge between a first practical book and the full reference.',
    tags: ['Algorithms', 'Concise', 'Rigorous'],
    url: ''
  },
  {
    title: 'Quantum Computing: An Applied Approach',
    authors: 'Jack D. Hidary',
    publisher: 'Springer',
    year: 2021,
    level: 'Core',
    shelf: 'recommended',
    note: 'Strong on the applied side, covering hardware, toolchains and the actual ' +
          'state of the industry, with a maths refresher in the back. Useful if you care about what ' +
          'runs today rather than what is provable in principle.',
    tags: ['Applied', 'Industry', 'Hardware'],
    url: ''
  },
  {
    title: 'Dancing with Qubits',
    authors: 'Robert S. Sutor',
    publisher: 'Packt Publishing',
    year: 2019,
    level: 'Start here',
    shelf: 'recommended',
    note: 'Patient and unusually well-paced, from complex numbers through to algorithms. ' +
          'Good for a motivated reader with no physics who is willing to go slowly.',
    tags: ['Beginner', 'Patient', 'Self-contained'],
    url: ''
  },
  {
    title: 'Quantum Mechanics: The Theoretical Minimum',
    authors: 'Leonard Susskind and Art Friedman',
    publisher: 'Basic Books',
    year: 2014,
    level: 'Context',
    shelf: 'recommended',
    note: 'Not a quantum computing book but a quantum mechanics book, aimed at adults who ' +
          'want the real formalism without a degree. Read it if the physics underneath ' +
          'the gates feels like a black box.',
    tags: ['Physics', 'Foundations', 'Accessible'],
    url: ''
  },
  {
    title: 'Modern Quantum Mechanics',
    authors: 'J. J. Sakurai and Jim Napolitano',
    publisher: 'Cambridge University Press',
    year: 2020,
    level: 'Deeper',
    shelf: 'recommended',
    note: 'The graduate QM text. Relevant here because the algorithms that matter for ' +
          'materials and molecules are simulating real Hamiltonians, and at some point ' +
          'you need to actually know quantum mechanics.',
    tags: ['Graduate', 'Physics', 'Hamiltonians'],
    url: ''
  },
  {
    title: 'The Feynman Lectures on Physics, Vol. III: Quantum Mechanics',
    authors: 'Richard P. Feynman, Robert B. Leighton and Matthew Sands',
    publisher: 'Addison-Wesley / Caltech',
    year: 1965,
    level: 'Context',
    shelf: 'recommended',
    note: 'Sixty years old and still the best explanation of amplitude and interference ' +
          'ever written. The two-slit chapter is the intuition every part of this site ' +
          'is trying to rebuild. Free to read online from Caltech.',
    tags: ['Classic', 'Intuition', 'Free online'],
    url: 'https://www.feynmanlectures.caltech.edu/III_toc.html'
  }
];
