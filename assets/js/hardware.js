/* ============================================================
   hardware.js: the qubit platforms, and who is building them.

   Edit this array to change the hardware page. Every entry is:

     id        : anchor, so hardware.html#ions deep-links
     icon      : one glyph, shown in the card badge
     name      : platform name
     carrier   : what the qubit physically is, one line
     temp      : operating temperature, for the at-a-glance table
     speed     : rough two-qubit gate time
     link      : connectivity model
     scale     : rough device size in published machines
     strength  : the single biggest advantage, for the table
     risk      : the single biggest open question, for the table
     blurb     : two short sentences, for the home page strip
     approach  : how it works, a paragraph
     pros      : list of advantages
     cons      : list of disadvantages
     players   : who is building it
     stands    : where it honestly stands today

   The figures are order-of-magnitude and move quickly. Bump
   REVIEWED whenever you check them against primary sources, so
   the page never quietly claims to be more current than it is.
   ============================================================ */

var REVIEWED = 'early 2026';

var PLATFORMS = [
  {
    id: 'superconducting',
    blurb:
      'Fast gates on a lithographed chip, and the furthest along on error correction. ' +
      'Getting the wiring into the fridge is the wall everyone expects to hit.',
    icon: '∿',
    name: 'Superconducting circuits',
    carrier: 'Microwave circuits on a chip, cooled to about 10 millikelvin',
    temp: '~10 mK',
    speed: '10 to 100 ns',
    link: 'Nearest neighbour',
    scale: 'Hundreds of qubits',
    strength: 'Error correction shown end to end',
    risk: 'Cryogenic wiring at scale',
    approach:
      'A superconducting loop interrupted by a Josephson junction behaves like a resonator with ' +
      'unevenly spaced energy levels, which lets the lowest two be used as |0⟩ and |1⟩ without ' +
      'accidentally driving the rest. Control is microwave pulses sent down coaxial lines into a ' +
      'dilution refrigerator. The chips are patterned with the same lithography that makes ' +
      'ordinary electronics, which is why this platform had a head start on engineering.',
    pros: [
      'Gates take tens of nanoseconds, so a round of error correction runs roughly a million times a second. Clock speed compounds over the billions of cycles a real algorithm needs.',
      'Fabrication is lithography on a wafer, a process the electronics industry already knows how to scale.',
      'The most mature control electronics, compilers and software stack in the field, and by some distance the largest cumulative investment.',
      'The first convincing demonstration that error correction can go below threshold, where adding more physical qubits made the logical qubit better rather than worse.'
    ],
    cons: [
      'Coherence times are measured in hundreds of microseconds at best, which is short relative to the number of gates a useful algorithm needs.',
      'Every qubit needs its own control lines running into the fridge. Wiring density and cooling power, not physics, are the wall people expect to hit.',
      'No two fabricated qubits are identical, so calibration is continuous and drifts.',
      'Fixed nearest-neighbour connectivity means shuffling states around with SWAP gates, which costs fidelity you did not want to spend.'
    ],
    players:
      'Google Quantum AI and IBM set the pace, with Rigetti, IQM, Fujitsu and RIKEN, and China’s ' +
      'Origin Quantum also building machines. AWS and Alice & Bob pursue a variant called cat ' +
      'qubits, which deliberately biases the noise toward one kind of error that is cheaper to ' +
      'correct.',
    stands:
      'The front-runner on demonstrated error correction and the deepest engineering base. IBM ' +
      'has published a dated roadmap toward a fault-tolerant machine around the end of the ' +
      'decade, using qLDPC codes that need fewer physical qubits per logical qubit than the ' +
      'surface code. The unresolved question is whether the wiring and refrigeration scale to ' +
      'the millions of physical qubits those codes still demand.',
    tags: ['Transmons', 'Surface code', 'qLDPC', 'Dilution fridge']
  },

  {
    id: 'ions',
    blurb:
      'The best qubits anyone has built, and the fewest of them. Gates are slow, and ' +
      'growing the machine means linking separate traps together.',
    icon: '⋯',
    name: 'Trapped ions',
    carrier: 'Single charged atoms held in vacuum by electric fields',
    temp: 'Room temp vacuum, laser cooled',
    speed: '10 μs to 1 ms',
    link: 'All to all within a trap',
    scale: 'Tens of qubits',
    strength: 'Best gate fidelities anywhere',
    risk: 'Slow gates, and scaling past one trap',
    approach:
      'Ytterbium or barium ions are suspended in vacuum by oscillating electric fields, either in ' +
      'a rod trap or above a chip patterned with electrodes. The qubit lives in two hyperfine ' +
      'ground states of the atom, which are extraordinarily stable. Entangling gates work by ' +
      'coupling the internal states to the shared vibration of the ion chain, so any ion can be ' +
      'entangled with any other. Larger machines shuttle ions between storage and gate zones ' +
      'rather than making one long chain.',
    pros: [
      'Every qubit is identical, because atoms are made by nature rather than by a fab. There is no device-to-device variability to calibrate away.',
      'Coherence runs to seconds, sometimes minutes, which is thousands of times longer than superconducting qubits manage.',
      'The highest two-qubit gate fidelities reported by anyone, comfortably past 99.9 percent in the best devices.',
      'All-to-all connectivity inside a trap. A circuit compiled for ions needs far fewer shuffling operations, which partly offsets the slow gates.'
    ],
    cons: [
      'Gates take microseconds to milliseconds, hundreds to thousands of times slower than superconducting. A fixed error budget buys much less computation per second.',
      'Scaling means either longer ion chains, which get harder to control, or shuttling ions between zones and linking traps photonically. Both add engineering the small machines never needed.',
      'A machine is racks of lasers, optics and vacuum equipment. The precision is optical rather than lithographic, and that is a different scaling curve.'
    ],
    players:
      'Quantinuum, formed from Honeywell’s quantum division, holds most of the fidelity ' +
      'records. IonQ is the other major player and bought Oxford Ionics in 2025 for its ' +
      'electronically controlled trap technology. AQT, eleQtron and Universal Quantum are ' +
      'building on the same physics in Europe.',
    stands:
      'The best qubits in the field, and the fewest of them. Trapped ions produced the earliest ' +
      'convincing logical-qubit demonstrations, but device sizes are in the tens while ' +
      'superconducting and neutral atoms count in the hundreds or thousands. Everything turns on ' +
      'whether shuttling and photonic interconnects can multiply that without giving back the ' +
      'fidelity advantage that makes the platform worth it.',
    tags: ['Hyperfine qubits', 'QCCD', 'Photonic interconnect', 'Laser control']
  },

  {
    id: 'atoms',
    blurb:
      'Thousands of atoms held in laser tweezers that can be rearranged while a circuit ' +
      'runs. Improving faster than anything else in the field.',
    icon: '∷',
    name: 'Neutral atoms',
    carrier: 'Uncharged atoms held in optical tweezers, entangled via Rydberg states',
    temp: 'Room temp vacuum, laser cooled',
    speed: 'Hundreds of ns',
    link: 'Reconfigurable, atoms move',
    scale: 'Hundreds to thousands of sites',
    strength: 'Scales in qubit count fastest',
    risk: 'Fidelity and atom loss',
    approach:
      'Focused laser beams act as tweezers, each holding one neutral atom, arranged into arrays ' +
      'of hundreds or thousands. Driving an atom into a Rydberg state, where the outer electron ' +
      'orbits far from the nucleus, makes it interact so strongly that it blocks its neighbour ' +
      'from being excited. That blockade is the entangling gate. Because the tweezers can be ' +
      'moved while a circuit runs, the connectivity graph is physically rearrangeable mid-computation.',
    pros: [
      'Qubit counts have grown faster here than on any other platform. Arrays of several thousand atom sites have been trapped and imaged.',
      'Atoms are identical, with the same no-variability advantage that ions enjoy.',
      'Movable atoms mean the connectivity can be reshaped to suit the code being run, which cuts error-correction overhead substantially.',
      'No per-qubit wiring. One laser and optics system addresses an entire array, which sidesteps the input-output bottleneck that worries the superconducting camp.'
    ],
    cons: [
      'Atoms escape their traps and have to be reloaded. Running continuously rather than in shots is a recent and hard-won capability.',
      'Gate fidelity still trails ions and superconducting, though the gap has closed quickly.',
      'Measuring some atoms mid-circuit without disturbing their neighbours is difficult, and error correction depends on doing exactly that, repeatedly.'
    ],
    players:
      'QuEra and Pasqal are the largest pure plays, with Atom Computing, Infleqtion and planqc ' +
      'also building machines. Much of the headline physics comes out of the Harvard and MIT ' +
      'groups. Microsoft, whose own bet is topological, hedged by partnering with a neutral-atom ' +
      'company, which tells you how seriously the platform is taken.',
    stands:
      'The fastest-improving platform and the one that has changed expectations most since 2023, ' +
      'when a single array ran dozens of logical qubits at once. It is still behind on raw gate ' +
      'fidelity and on the repetition rate that error correction wants, but it has been behind ' +
      'on fewer things every year.',
    tags: ['Optical tweezers', 'Rydberg blockade', 'Reconfigurable', 'Logical qubits']
  },

  {
    id: 'photonics',
    blurb:
      'Printable in an ordinary chip foundry, which no rival can match, and the least ' +
      'demonstrated of the serious platforms. Every lost photon is an error.',
    icon: '✧',
    name: 'Photonics',
    carrier: 'Single photons, or squeezed light, in waveguides on a chip',
    temp: 'Room temp, cryo detectors only',
    speed: 'Limited by detection, not gates',
    link: 'Reconfigurable and networkable',
    scale: 'Small processors, large roadmaps',
    strength: 'Made in commercial foundries',
    risk: 'Photon loss, and nothing small to fall back on',
    approach:
      'The qubit is a photon, encoded in which of two waveguides it travels down or in the shape ' +
      'of the light itself. Beam splitters and phase shifters do single-qubit gates for free. The ' +
      'difficulty is that photons barely interact, so entangling gates are performed by measuring ' +
      'them, which only succeeds part of the time. Architectures compensate with enormous ' +
      'multiplexing: build many small entangled resource states in parallel, fuse the ones that ' +
      'worked, discard the rest.',
    pros: [
      'The qubits themselves need no dilution refrigerator. The single-photon detectors run at a few kelvin, which is ordinary cryogenics rather than the millikelvin regime.',
      'Photons are already the way quantum information travels between machines, so networking modules uses the same technology as the computer itself.',
      'Chips are fabricated on commercial semiconductor lines, a manufacturing story no other platform can tell as convincingly.',
      'There is no decoherence in the usual sense. A photon that arrives has not been slowly degraded, it is simply either there or lost.'
    ],
    cons: [
      'Loss is the error, and it is everywhere: every waveguide, coupler and detector leaks photons, and a lost photon cannot be recovered.',
      'Probabilistic gates mean vast redundancy. Component counts for a useful machine run into the millions, which is precisely why the fabrication argument matters so much to this camp.',
      'The least demonstrated of the major platforms. There is no photonic equivalent yet of the below-threshold error-correction results from superconducting and neutral atoms.'
    ],
    players:
      'PsiQuantum is the largest bet, raising on the premise of skipping small machines entirely ' +
      'and building utility-scale sites, with facilities under construction in Brisbane and ' +
      'Chicago. Xanadu takes a different route through squeezed light and continuous-variable ' +
      'encodings. Quandela and ORCA Computing build smaller photonic processors, and Photonic Inc ' +
      'runs a hybrid where silicon spins talk to photons.',
    stands:
      'The boldest strategic position in the field. If loss rates fall far enough, the ability to ' +
      'print the machine in an existing foundry is decisive and the scale-up is fast. If they do ' +
      'not, there is no intermediate win to retreat to, because the small photonic machines that ' +
      'exist today are not useful on their own. High variance, in both directions.',
    tags: ['Fusion-based', 'Squeezed light', 'GKP', 'Foundry fabrication']
  },

  {
    id: 'silicon',
    blurb:
      'A qubit roughly the size of a transistor, made on the same production lines. ' +
      'Almost none of them working together yet.',
    icon: '⇅',
    name: 'Silicon spin qubits',
    carrier: 'The spin of one electron in a silicon quantum dot',
    temp: '~100 mK to 1 K',
    speed: '10 to 100 ns',
    link: 'Nearest neighbour',
    scale: 'Single or low double digits',
    strength: 'Same fabs as ordinary chips',
    risk: 'Very few working qubits so far',
    approach:
      'Voltages on tiny metal gates trap one electron in a dot of isotopically purified silicon, ' +
      'and the electron spin, up or down, is the qubit. Single-qubit gates are driven by ' +
      'microwaves or by shaking the electron in a magnetic field gradient. Two-qubit gates come ' +
      'from letting neighbouring dots exchange, which is a knob controlled by the same gate ' +
      'voltages. Structurally, a qubit looks a great deal like a transistor.',
    pros: [
      'The qubits are nanometres across. A single wafer could in principle hold millions of them, which no other platform can claim.',
      'They are made on the same CMOS lines as ordinary chips, so the industry that already builds billions of transistors a day could build these.',
      'Some designs operate above one kelvin rather than at millikelvin, and that difference in cooling power is enormous once control electronics have to sit near the chip.'
    ],
    cons: [
      'Device sizes are still in the single or low double digits, far behind every other platform on this page.',
      'Charge noise in the substrate, and variation between nominally identical dots, remain the hard problems.',
      'The best two-qubit fidelities are respectable but have not been reproduced across a large device, which is the whole question.'
    ],
    players:
      'Intel is the obvious name, fabricating spin-qubit test chips on production tooling. Diraq ' +
      'and Silicon Quantum Computing come out of Australia, Quantum Motion out of the UK, with ' +
      'HRL in the US and imec and CEA-Leti supplying much of the process development.',
    stands:
      'The long game. Everything about the physics says this should scale if the process ' +
      'engineering lands, and nothing about the current device counts says it has landed yet. ' +
      'Worth tracking on a different timescale from the others: the interesting signal is ' +
      'uniformity across a wafer, not a record fidelity on one device.',
    tags: ['Quantum dots', 'CMOS', 'Exchange coupling', 'Isotopic purification']
  },

  {
    id: 'topological',
    blurb:
      'Error protection built into the physics itself, which would change the economics ' +
      'entirely. Whether the physics is there at all is still disputed.',
    icon: '∞',
    name: 'Topological qubits',
    carrier: 'Majorana modes in hybrid semiconductor and superconductor devices',
    temp: '~10 mK',
    speed: 'Predicted fast, not yet measured',
    link: 'Not yet demonstrated',
    scale: 'Single digits, contested',
    strength: 'Protection built into the hardware',
    risk: 'The physics may not be there at all',
    approach:
      'The idea is to store information non-locally. A semiconductor nanowire coupled to a ' +
      'superconductor is predicted to host Majorana zero modes at its ends, and a qubit encoded ' +
      'across a pair of them cannot be read or corrupted by any local disturbance, because no ' +
      'local measurement sees the whole state. Gates would be done by braiding the modes around ' +
      'each other, or by measurement sequences that have the same effect.',
    pros: [
      'Error protection would be a property of the hardware rather than something bolted on in software, potentially cutting the physical-qubit overhead of error correction by orders of magnitude.',
      'The devices are small, fast in principle, and controlled digitally by voltages rather than by lasers or shaped microwave pulses.'
    ],
    cons: [
      'The underlying physics is not settled. Whether these devices host genuine topological states is still disputed, and signatures that look like Majorana modes have repeatedly turned out to have mundane explanations.',
      'A prominent result in this line was retracted in 2021 after the data did not hold up, which is why the field now reads every claim here with unusual care.',
      'Qubit counts are in the single digits, with no demonstrated logical operations to compare against anyone else.'
    ],
    players:
      'Microsoft is effectively the whole field, with Nokia Bell Labs and QuTech in Delft doing ' +
      'related work. Microsoft has also partnered with a neutral-atom company, which is a ' +
      'reasonable reading of its own risk.',
    stands:
      'The highest-risk position on the board. The 2025 Majorana 1 announcement drew immediate ' +
      'scepticism from parts of the community, including reviewers of the accompanying paper who ' +
      'noted that the measurements did not by themselves establish topological qubits. Worth ' +
      'watching precisely because the payoff would be so large, and worth discounting until the ' +
      'evidence is unambiguous.',
    tags: ['Majorana modes', 'Braiding', 'Nanowires', 'Unproven']
  }
];

(function () {
  'use strict';

  var note = document.getElementById('reviewNote');
  if (note) {
    note.textContent = 'State of play as of ' + REVIEWED + '. Figures are approximate and this ' +
                       'field moves quickly, so check a primary source before citing anything here.';
  }

  /* ---------- at-a-glance table ---------- */
  var table = document.getElementById('cmpTable');
  if (table) {
    var cols = [
      { head: 'Platform',      get: function (p) { return '<a href="#' + p.id + '">' + p.name + '</a>'; } },
      { head: 'Temperature',   get: function (p) { return p.temp; } },
      { head: '2-qubit gate',  get: function (p) { return p.speed; } },
      { head: 'Connectivity',  get: function (p) { return p.link; } },
      { head: 'Scale today',   get: function (p) { return p.scale; } },
      { head: 'Biggest strength', get: function (p) { return p.strength; } },
      { head: 'Biggest risk',  get: function (p) { return p.risk; } }
    ];

    table.innerHTML =
      '<thead><tr>' + cols.map(function (c) { return '<th>' + c.head + '</th>'; }).join('') + '</tr></thead>' +
      '<tbody>' + PLATFORMS.map(function (p) {
        return '<tr>' + cols.map(function (c, i) {
          return '<td' + (i === 0 ? ' class="cmp-name"' : '') + '>' + c.get(p) + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody>';
  }

  /* ---------- platform cards ---------- */
  function bullets(items, kind) {
    return '<ul class="pc-list pc-' + kind + '">' +
      items.map(function (t) { return '<li>' + t + '</li>'; }).join('') +
    '</ul>';
  }

  var host = document.getElementById('platformList');
  if (host) {
    host.innerHTML = PLATFORMS.map(function (p) {
      return '' +
      '<article class="card" id="' + p.id + '" style="padding:30px">' +
        '<div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap">' +
          '<div class="card-icon" style="margin:0;width:44px;height:44px;font-size:1.2rem;flex-shrink:0">' + p.icon + '</div>' +
          '<div style="flex:1;min-width:230px">' +
            '<h3 style="font-size:1.32rem;margin-bottom:4px">' + p.name + '</h3>' +
            '<div class="mono dim" style="font-size:0.78rem;margin-bottom:16px">' + p.carrier + '</div>' +

            '<h4 class="section-label">How it works</h4>' +
            '<p>' + p.approach + '</p>' +

            '<div class="grid grid-2" style="gap:20px;margin:20px 0 0">' +
              '<div>' +
                '<h4 class="section-label" style="color:var(--green)">What it is good at</h4>' +
                bullets(p.pros, 'good') +
              '</div>' +
              '<div>' +
                '<h4 class="section-label" style="color:var(--rose)">What it is bad at</h4>' +
                bullets(p.cons, 'bad') +
              '</div>' +
            '</div>' +

            '<h4 class="section-label" style="margin-top:22px">Who is building it</h4>' +
            '<p>' + p.players + '</p>' +

            '<h4 class="section-label" style="color:var(--amber)">Where it really stands</h4>' +
            '<p style="margin-bottom:0">' + p.stands + '</p>' +

            '<div class="tags">' + p.tags.map(function (t) {
              return '<span class="tag">' + t + '</span>';
            }).join('') + '</div>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  // deep links like hardware.html#ions
  if (location.hash) {
    var target = document.querySelector(location.hash);
    if (target) setTimeout(function () { target.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 90);
  }
})();
