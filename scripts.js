// --- Game Data ---
const games = [
  {
    name: "Slither.io",
    img: "Screenshot 2025-05-27 193429.png",
    url: "https://slither.io",
    category: ["Multiplayer", "Arcade"]
  },
  {
    name: "Krunker.io",
    img: "Screenshot 2025-05-27 193932.png",
    url: "https://krunker.io",
    category: ["Shooter", "Multiplayer"]
  },
  {
    name: "Paper.io 2",
    img: "Screenshot 2025-05-27 194400.png",
    url: "https://paper-io.com",
    category: ["Arcade", "Multiplayer"]
  },
  {
    name: "Little Alchemy 2",
    img: "Screenshot 2025-05-27 194714.png",
    url: "https://littlealchemy2.com",
    category: ["Puzzle", "Educational"]
  },
  {
    name: "Defly.io",
    img: "Screenshot 2025-05-27 195125.png",
    url: "https://defly.io",
    category: ["Shooter", "Strategy", "Multiplayer"]
  },
  {
    name: "Mini Royale: Nations",
    img: "Screenshot 2025-05-27 200059.png",
    url: "https://miniroyale.io",
    category: ["Shooter", "Battle Royale", "Multiplayer", "Action"]
  },
  {
    name: "Venge.io",
    img: "Screenshot 2025-05-27 200833.png",
    url: "https://venge.io",
    category: ["Shooter", "Multiplayer", "Action"]
  },
  {
    name: "Taming.io",
    img: "Screenshot 2025-05-27 201554.png",
    url: "https://taming.io",
    category: ["Survival", "Multiplayer"]
  },
  {
    name: "Dino Swords",
    img: "Screenshot 2025-05-27 201813.png",
    url: "https://dinoswords.gg",
    category: ["Arcade", "Action", "Multiplayer"]
  },
  {
    name: "Deadshot.io",
    img: "Screenshot 2025-05-27 202309.png",
    url: "https://deadshot.io",
    category: ["Shooter", "Multiplayer", "Action"]
  },
  {
    name: "Tanki Online",
    img: "Screenshot 2025-05-28 080816.png",
    url: "https://tankionline.com/play/",
    category: ["Vehicular Combat", "Shooter", "Multiplayer"]
  },
  {
    name: "War Brokers",
    img: "Screenshot 2025-05-28 081345.png",
    url: "https://warbrokers.io",
    category: ["Shooter", "Vehicular Combat", "Multiplayer"]
  },
  {
    name: "Little War Game",
    img: "Screenshot 2025-05-28 085315.png",
    url: "https://www.littlewargame.com/",
    category: ["Strategy", "RTS", "Multiplayer"]
  },
  {
    name: "Deeeep.io",
    img: "https://deeeep.io/favicon.ico",
    url: "https://deeeep.io/",
    category: ["Survival", "Multiplayer"]
  },
  {
    name: "Slow Roads",
    img: "Screenshot 2025-05-27 195758.png",
    url: "https://slowroads.io/",
    category: ["Driving", "Casual"]
  }
];

// --- DOM Elements ---
const gameGrid = document.getElementById('gameGrid');
const validCategories = ["All", "Action", "Multiplayer", "Shooter"];
let currentCategory = 'All';
let currentSearch = '';

function renderGames() {
  gameGrid.innerHTML = '';
  let filteredGames = games;
  if (currentCategory !== 'All') {
    filteredGames = games.filter(game => game.category && game.category.includes(currentCategory));
  }
  if (currentSearch.trim() !== '') {
    const searchLower = currentSearch.trim().toLowerCase();
    filteredGames = filteredGames.filter(game =>
      game.name.toLowerCase().includes(searchLower)
    );
  }
  // For 'All' section, show Krunker.io, Deadshot.io, Mini Royale: Nations as the first 3
  if (currentCategory === 'All' && currentSearch.trim() === '') {
    const topGames = [
      games.find(g => g.name === 'Krunker.io'),
      games.find(g => g.name === 'Deadshot.io'),
      games.find(g => g.name === 'Mini Royale: Nations')
    ].filter(Boolean);
    const topGameNames = topGames.map(g => g.name);
    filteredGames = [
      ...topGames,
      ...filteredGames.filter(g => !topGameNames.includes(g.name))
    ];
  }
  filteredGames.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <img class="game-thumb" src="${game.img}" alt="${game.name}">
      <div class="game-name">${game.name}</div>
    `;
    card.addEventListener('click', () => openGame(game.url, game.name));
    gameGrid.appendChild(card);
  });
  // Add placeholders to fill the last row if needed
  const cardsInRow = 3;
  const remainder = filteredGames.length % cardsInRow;
  if (remainder !== 0) {
    for (let i = 0; i < cardsInRow - remainder; i++) {
      const placeholder = document.createElement('div');
      placeholder.className = 'game-card placeholder';
      placeholder.innerHTML = `
        <div class="plus-icon">+</div>
        <div class="placeholder-text">More coming soon</div>
      `;
      gameGrid.appendChild(placeholder);
    }
  }
}

function openGame(url, gameName) {
  showFullscreenGame(url, gameName);
}

function showFullscreenGame(url, gameName) {
  let overlay = document.getElementById('fullscreenGameOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'fullscreenGameOverlay';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = '#111';
    overlay.style.zIndex = 2000;
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    document.body.appendChild(overlay);
  }
  // Branding section on left, game name above iframe, highlight close button
  overlay.innerHTML = `
    <div class="overlay-header">
      <div class="overlay-branding">GameBox</div>
      <button id="closeFullscreenGame" class="overlay-close">&times;</button>
    </div>
    <div class="overlay-game-title">${gameName}</div>
    <iframe id="fullscreenGameIframe" src="${url}" frameborder="0" allowfullscreen style="flex:1;width:98vw;height:80vh;margin:12px 0 0 0;border-radius:12px;background:#000;"></iframe>
  `;
  document.getElementById('closeFullscreenGame').onclick = () => {
    overlay.parentNode.removeChild(overlay);
    document.body.style.overflow = '';
  };
  document.body.style.overflow = 'hidden';
}

// Category filter logic
const sidebar = document.querySelector('.fronti-sidebar');
if (sidebar) {
  sidebar.addEventListener('click', function(e) {
    if (e.target.classList.contains('filter-btn')) {
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.getAttribute('data-category');
      renderGames();
    }
  });
}

// Search bar logic
const searchInput = document.getElementById('gameSearch');
if (searchInput) {
  searchInput.addEventListener('input', function(e) {
    currentSearch = e.target.value;
    renderGames();
  });
}

// --- Initial Render ---
renderGames();
