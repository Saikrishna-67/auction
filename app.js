/**
 * Anime Draft Wheel - 1,000+ Characters & Roster Editor Game Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM References
  const body = document.body;
  const spinBtn = document.getElementById('spin-btn');
  const spinText = document.getElementById('spin-text');
  const quickRandomBtn = document.getElementById('quick-random-btn');
  const resetGameBtn = document.getElementById('reset-game-btn');
  const soundBtn = document.getElementById('sound-btn');
  const openSetupBtn = document.getElementById('open-setup-btn');
  const openRosterBtn = document.getElementById('open-roster-btn');

  const tabOp = document.getElementById('tab-onepiece');
  const tabNr = document.getElementById('tab-naruto');
  const tabAll = document.getElementById('tab-all');
  const badgeOpCount = document.getElementById('badge-op-count');
  const badgeNrCount = document.getElementById('badge-nr-count');
  const badgeAllCount = document.getElementById('badge-all-count');
  const btnTotalCount = document.getElementById('btn-total-count');
  const remainingCountEl = document.getElementById('remaining-count');
  const tickerName = document.getElementById('ticker-name');
  const playersDock = document.getElementById('players-dock');

  // Reveal Modal Elements
  const modal = document.getElementById('character-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const playerAssignBtns = document.getElementById('player-assign-btns');
  const posterCard = document.getElementById('poster-card');
  const claimBanner = document.getElementById('claim-banner');
  const cardHeaderTitle = document.getElementById('card-header-title');
  const cardHeaderSubtext = document.getElementById('card-header-subtext');
  const charImg = document.getElementById('char-img');
  const charEpithet = document.getElementById('char-epithet');
  const charName = document.getElementById('char-name');
  const currencySymbol = document.getElementById('currency-symbol');
  const charBounty = document.getElementById('char-bounty');
  const charAffiliation = document.getElementById('char-affiliation');
  const charRole = document.getElementById('char-role');
  const charPower = document.getElementById('char-power');
  const charOrigin = document.getElementById('char-origin');
  const charTechniques = document.getElementById('char-techniques');
  const charQuote = document.getElementById('char-quote');

  const labelAffiliation = document.getElementById('label-affiliation');
  const labelRole = document.getElementById('label-role');
  const labelPower = document.getElementById('label-power');
  const labelTechniques = document.getElementById('label-techniques');

  // Bidding Arena Elements
  const biddingArena = document.querySelector('.bidding-arena');
  const bidTabBtns = document.querySelectorAll('.bid-tab-btn');
  const panelLiveBid = document.getElementById('panel-live-bid');
  const panelSecretBid = document.getElementById('panel-secret-bid');
  const panelDirectAssign = document.getElementById('panel-direct-assign');

  // Live Auction Elements
  const liveHighestBid = document.getElementById('live-highest-bid');
  const liveHighestBidder = document.getElementById('live-highest-bidder');
  const liveActiveTurnBadge = document.getElementById('live-active-turn-badge');
  const liveActivePurse = document.getElementById('live-active-purse');
  const quickRaiseBtns = document.querySelectorAll('.btn-raise');
  const liveCustomBidInput = document.getElementById('live-custom-bid-input');
  const liveSubmitCustomBtn = document.getElementById('live-submit-custom-btn');
  const livePassBtn = document.getElementById('live-pass-btn');
  const liveSkipBtn = document.getElementById('live-skip-btn');
  const directSkipBtn = document.getElementById('direct-skip-btn');
  const liveAuctionLog = document.getElementById('live-auction-log');

  // Secret Auction Elements
  const secretInputStage = document.getElementById('secret-input-stage');
  const secretRevealStage = document.getElementById('secret-reveal-stage');
  const secretCurrentPlayerName = document.getElementById('secret-current-player-name');
  const secretCurrentPlayerPurse = document.getElementById('secret-current-player-purse');
  const secretBidInput = document.getElementById('secret-bid-input');
  const secretPeekToggle = document.getElementById('secret-peek-toggle');
  const secretPresetBtns = document.querySelectorAll('.btn-quick-secret');
  const secretProgressFill = document.getElementById('secret-progress-fill');
  const secretProgressText = document.getElementById('secret-progress-text');
  const secretLockBidBtn = document.getElementById('secret-lock-bid-btn');
  const secretBidsGrid = document.getElementById('secret-bids-grid');
  const secretClaimWinnerBtn = document.getElementById('secret-claim-winner-btn');

  // Character Manager Modal Elements
  const rosterModal = document.getElementById('roster-modal');
  const closeRosterBtn = document.getElementById('close-roster-btn');
  const rosterSearchInput = document.getElementById('roster-search-input');
  const rosterUniverseFilter = document.getElementById('roster-universe-filter');
  const deleteAllRosterBtn = document.getElementById('delete-all-roster-btn');
  const rosterTableBody = document.getElementById('roster-table-body');
  const editorTotalCount = document.getElementById('editor-total-count');
  const toggleAddFormBtn = document.getElementById('toggle-add-form-btn');
  const resetDefaultRosterBtn = document.getElementById('reset-default-roster-btn');

  // Edit Form Elements
  const editFormCard = document.getElementById('character-edit-form');
  const editCharId = document.getElementById('edit-char-id');
  const formCharName = document.getElementById('form-char-name');
  const formCharUniverse = document.getElementById('form-char-universe');
  const formCharEpithet = document.getElementById('form-char-epithet');
  const formCharAffiliation = document.getElementById('form-char-affiliation');
  const formCharBounty = document.getElementById('form-char-bounty');
  const formCharPower = document.getElementById('form-char-power');
  const cancelEditBtn = document.getElementById('cancel-edit-btn');
  const saveCharFormBtn = document.getElementById('save-char-form-btn');

  // Setup Modal
  const setupModal = document.getElementById('setup-modal');
  const closeSetupBtn = document.getElementById('close-setup-btn');
  const budgetSlider = document.getElementById('budget-slider');
  const budgetDisplay = document.getElementById('budget-display');
  const startGameBtn = document.getElementById('start-game-btn');
  const pCountBtns = document.querySelectorAll('.p-count-btn[data-count]');
  const playerNamesInputsContainer = document.getElementById('player-names-inputs');

  // --- GAME STATE ---
  let masterRoster = getSavedRoster(); // 1,000+ characters loaded
  let currentUniverse = 'onepiece'; // 'onepiece', 'naruto', 'all'
  let activePools = {
    onepiece: [],
    naruto: [],
    all: []
  };

  let numPlayers = 2;
  let startingBudget = 75000;
  let currentPlayerIndex = 0;
  let players = [];

  let pendingCharacter = null;
  let pendingSliceIndex = -1;

  // Bidding & Auction State
  let activeBiddingTab = 'live'; // 'live', 'secret', 'direct'
  let liveAuction = {
    currentBid: 0,
    highestBidderIndex: -1,
    activeBidders: [],
    turnPointer: 0,
    hasConcluded: false
  };
  let secretAuction = {
    stepIndex: 0,
    bids: {},
    winnerIndex: -1,
    winningBid: 0,
    hasConcluded: false
  };

  // Setup Confetti
  const confetti = new ConfettiCannon('confetti-canvas');

  // Setup Wheel Engine with Live Ticker onTick Listener
  const wheel = new AnimeWheel(
    'wheel-canvas',
    'flapper-svg',
    (selectedChar, sliceIndex) => {
      pendingCharacter = selectedChar;
      pendingSliceIndex = sliceIndex;
      showDraftModal(selectedChar);
    },
    (passingChar) => {
      // Real-time Live Ticker HUD update
      if (passingChar) {
        const icon = passingChar.universe === 'naruto' ? '🍃' : '☠️';
        tickerName.textContent = `${icon} ${passingChar.name} (${passingChar.affiliation || ''})`;
      }
    }
  );

  // Initialize Game
  initGame(2, 75000);

  // --- INITIALIZATION & REPLAY ---

  function initGame(count, budget, customNames = []) {
    numPlayers = count;
    startingBudget = budget;
    currentPlayerIndex = 0;
    pendingCharacter = null;
    pendingSliceIndex = -1;

    // Repopulate pools from current master roster
    refreshActivePools();

    // Build Player Objects
    const playerColors = ['p1', 'p2', 'p3', 'p4'];
    players = [];
    for (let i = 0; i < numPlayers; i++) {
      const pName = (customNames[i] && customNames[i].trim()) || (players[i] && players[i].name) || `Player ${i + 1}`;
      players.push({
        id: i + 1,
        name: pName,
        colorClass: playerColors[i % 4],
        money: startingBudget,
        characters: []
      });
    }

    renderPlayerDock();
    setUniverse(currentUniverse);
    spinBtn.disabled = false;
  }

  function renderSetupPlayerInputs(count) {
    if (!playerNamesInputsContainer) return;
    playerNamesInputsContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const row = document.createElement('div');
      row.className = 'player-name-row';
      const defaultName = (players[i] && players[i].name) ? players[i].name : `Player ${i + 1}`;
      row.innerHTML = `
        <label class="player-name-label">Player ${i + 1}:</label>
        <input type="text" class="player-name-input" id="custom-pname-${i}" value="${defaultName}" placeholder="Enter name...">
      `;
      playerNamesInputsContainer.appendChild(row);
    }
  }

  function refreshActivePools() {
    activePools.onepiece = masterRoster.filter(c => c.universe === 'onepiece');
    activePools.naruto = masterRoster.filter(c => c.universe === 'naruto');
    activePools.all = [...masterRoster];
  }

  function resetGame() {
    const currentNames = players.map(p => p.name);
    initGame(numPlayers, startingBudget, currentNames);
    wheel.sound.playVictory();
  }

  // --- UNIVERSE SWITCHING ---

  function setUniverse(universe) {
    currentUniverse = universe;
    const isNaruto = universe === 'naruto';

    body.className = isNaruto ? 'theme-naruto' : 'theme-onepiece';

    tabOp.classList.toggle('active', universe === 'onepiece');
    tabNr.classList.toggle('active', universe === 'naruto');
    tabAll.classList.toggle('active', universe === 'all');

    spinText.textContent = isNaruto ? 'SPIN CHAKRA' : (universe === 'all' ? 'SPIN ANIME WHEEL' : 'SPIN THE HELM');

    wheel.setTheme(universe === 'naruto' ? 'naruto' : 'onepiece');
    const pool = activePools[universe] || activePools.onepiece;
    wheel.setItems(pool);

    if (pool.length > 0) {
      tickerName.textContent = `${pool[0].universe === 'naruto' ? '🍃' : '☠️'} ${pool[0].name}`;
    }

    updateCounters();
    renderPlayerDock();
  }

  function updateCounters() {
    const opCount = masterRoster.filter(c => c.universe === 'onepiece').length;
    const nrCount = masterRoster.filter(c => c.universe === 'naruto').length;
    const totalCount = masterRoster.length;

    badgeOpCount.textContent = `${activePools.onepiece.length}/${opCount}`;
    badgeNrCount.textContent = `${activePools.naruto.length}/${nrCount}`;
    badgeAllCount.textContent = `${activePools.all.length}/${totalCount}`;
    btnTotalCount.textContent = `${totalCount} Characters`;

    const activeLen = (activePools[currentUniverse] || []).length;
    remainingCountEl.textContent = activeLen;
  }

  // --- SCOREBOARD RENDERING ---

  function renderPlayerDock() {
    playersDock.innerHTML = '';
    const currency = currentUniverse === 'naruto' ? 'Ryo' : '฿';

    players.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = `player-card ${p.colorClass} ${idx === currentPlayerIndex ? 'active-turn' : ''}`;
      card.id = `player-card-${idx}`;

      let chipsHtml = '';
      if (p.characters.length > 0) {
        chipsHtml = p.characters.map((c, cIdx) => `
          <button class="squad-chip" data-player="${idx}" data-char-idx="${cIdx}" title="Click to view ${c.name} stats">
            ${c.universe === 'naruto' ? '🍃' : '☠️'} ${c.name}
          </button>
        `).join('');
      } else {
        chipsHtml = `<span class="squad-empty">No characters drafted yet</span>`;
      }

      card.innerHTML = `
        <div class="player-header">
          <div class="player-name">
            <span class="player-name-text" data-player="${idx}" title="Click to rename player">👤 ${p.name} ✏️</span>
            <span class="turn-pill">SPIN TURN</span>
          </div>
          <div class="player-money">${p.money.toLocaleString()} ${currency}</div>
        </div>
        <div class="squad-tray">
          ${chipsHtml}
        </div>
      `;

      playersDock.appendChild(card);
    });

    // Click to rename directly on scoreboard
    document.querySelectorAll('.player-name-text').forEach(el => {
      el.addEventListener('click', () => {
        const pIdx = parseInt(el.getAttribute('data-player'));
        const p = players[pIdx];
        if (!p) return;
        const newName = prompt(`Enter new custom name for ${p.name}:`, p.name);
        if (newName && newName.trim()) {
          p.name = newName.trim();
          renderPlayerDock();
          if (modal.open && pendingCharacter) {
            renderLiveAuctionUI();
            renderSecretInputUI();
            renderDirectAssignBtns();
          }
        }
      });
    });

    document.querySelectorAll('.squad-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const pIdx = parseInt(btn.getAttribute('data-player'));
        const cIdx = parseInt(btn.getAttribute('data-char-idx'));
        const inspectedChar = players[pIdx].characters[cIdx];
        if (inspectedChar) {
          showInspectModal(inspectedChar, players[pIdx]);
        }
      });
    });
  }

  // --- CHARACTER DRAFT & BIDDING MODAL ---

  function showDraftModal(char) {
    populateModalData(char);

    claimBanner.textContent = `🎯 Character Selected! Place Bids or Assign:`;
    claimBanner.style.background = char.universe === 'naruto' ? '#f77f00' : '#2b9348';

    initBiddingArena(char);

    modal.showModal();
    confetti.fire(char.universe);
  }

  function initBiddingArena(char) {
    biddingArena.style.display = 'block';

    // Reset Live Auction State
    liveAuction = {
      currentBid: 0,
      highestBidderIndex: -1,
      activeBidders: players.map((_, idx) => idx),
      turnPointer: currentPlayerIndex % players.length,
      hasConcluded: false
    };

    // Reset Secret Auction State
    secretAuction = {
      stepIndex: 0,
      bids: {},
      winnerIndex: -1,
      winningBid: 0,
      hasConcluded: false
    };

    liveAuctionLog.innerHTML = `<div class="log-entry">Auction started for <strong>${char.name}</strong>! Min raise: 1,000.</div>`;
    
    switchBiddingTab(activeBiddingTab || 'live');
    renderDirectAssignBtns();
  }

  function switchBiddingTab(mode) {
    activeBiddingTab = mode;
    bidTabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
    });

    panelLiveBid.style.display = mode === 'live' ? 'block' : 'none';
    panelSecretBid.style.display = mode === 'secret' ? 'block' : 'none';
    panelDirectAssign.style.display = mode === 'direct' ? 'block' : 'none';

    if (mode === 'live') {
      renderLiveAuctionUI();
    } else if (mode === 'secret') {
      if (secretAuction.hasConcluded) {
        secretInputStage.style.display = 'none';
        secretRevealStage.style.display = 'block';
      } else {
        secretInputStage.style.display = 'block';
        secretRevealStage.style.display = 'none';
        renderSecretInputUI();
      }
    } else if (mode === 'direct') {
      renderDirectAssignBtns();
    }
  }

  // --- MODE 1: LIVE 1-BY-1 AUCTION ---

  function renderLiveAuctionUI() {
    const currency = currentUniverse === 'naruto' ? 'Ryo' : '฿';
    liveHighestBid.textContent = `${liveAuction.currentBid.toLocaleString()} ${currency}`;

    if (liveAuction.highestBidderIndex !== -1) {
      const leader = players[liveAuction.highestBidderIndex];
      liveHighestBidder.textContent = `👑 ${leader.name} leads`;
      liveHighestBidder.style.color = '#38bdf8';
    } else {
      liveHighestBidder.textContent = '(No bids yet)';
      liveHighestBidder.style.color = '#94a3b8';
    }

    if (liveAuction.hasConcluded) {
      liveActiveTurnBadge.textContent = 'AUCTION CONCLUDED';
      liveActiveTurnBadge.style.color = '#4ade80';
      liveActivePurse.textContent = '';
      quickRaiseBtns.forEach(b => b.disabled = true);
      liveSubmitCustomBtn.disabled = true;
      livePassBtn.disabled = true;
      return;
    }

    if (liveAuction.activeBidders.length === 0) {
      liveActiveTurnBadge.textContent = 'ALL PASSED';
      liveActiveTurnBadge.style.color = '#ef4444';
      liveActivePurse.textContent = 'No winner';
      quickRaiseBtns.forEach(b => b.disabled = true);
      liveSubmitCustomBtn.disabled = true;
      livePassBtn.disabled = true;
      return;
    }

    const currentTurnPlayerIdx = liveAuction.activeBidders[liveAuction.turnPointer];
    const turnPlayer = players[currentTurnPlayerIdx];

    liveActiveTurnBadge.textContent = `👉 ${turnPlayer.name}`;
    liveActiveTurnBadge.style.color = turnPlayer.colorClass === 'p1' ? '#ef4444' : (turnPlayer.colorClass === 'p2' ? '#38bdf8' : (turnPlayer.colorClass === 'p3' ? '#10b981' : '#a855f7'));
    liveActivePurse.textContent = `Purse: ${turnPlayer.money.toLocaleString()} ${currency}`;

    // Update Raise Buttons with exact budget checks
    quickRaiseBtns.forEach(btn => {
      const addVal = parseInt(btn.getAttribute('data-add') || '1000');
      const targetBid = liveAuction.currentBid + addVal;
      btn.disabled = targetBid > turnPlayer.money;
    });

    liveSubmitCustomBtn.disabled = false;
    livePassBtn.disabled = false;
    liveCustomBidInput.value = '';
    liveCustomBidInput.min = liveAuction.currentBid + 1000;
    liveCustomBidInput.placeholder = `Min: ${(liveAuction.currentBid + 1000).toLocaleString()} ${currency}`;
  }

  function handleLiveRaise(amountToAdd) {
    if (liveAuction.hasConcluded || liveAuction.activeBidders.length === 0) return;
    const currentTurnPlayerIdx = liveAuction.activeBidders[liveAuction.turnPointer];
    const player = players[currentTurnPlayerIdx];
    const newBid = liveAuction.currentBid + amountToAdd;

    if (newBid > player.money) {
      alert(`⚠️ ${player.name} does not have enough funds for ${newBid.toLocaleString()}! Available: ${player.money.toLocaleString()}`);
      return;
    }

    const currency = currentUniverse === 'naruto' ? 'Ryo' : '฿';
    liveAuction.currentBid = newBid;
    liveAuction.highestBidderIndex = currentTurnPlayerIdx;

    addAuctionLog(`💰 <strong>${player.name}</strong> raised bid to <strong>${newBid.toLocaleString()} ${currency}</strong>!`, 'log-raise');
    wheel.sound.playTick();

    advanceLiveTurn();
  }

  function handleLiveCustomBid() {
    if (liveAuction.hasConcluded || liveAuction.activeBidders.length === 0) return;
    const currentTurnPlayerIdx = liveAuction.activeBidders[liveAuction.turnPointer];
    const player = players[currentTurnPlayerIdx];
    const entered = parseInt(liveCustomBidInput.value);

    if (isNaN(entered) || entered <= liveAuction.currentBid) {
      alert(`⚠️ Bid must be higher than current bid of ${liveAuction.currentBid.toLocaleString()}!`);
      return;
    }

    if (entered > player.money) {
      alert(`⚠️ ${player.name} cannot bid more than available purse (${player.money.toLocaleString()})!`);
      return;
    }

    const currency = currentUniverse === 'naruto' ? 'Ryo' : '฿';
    liveAuction.currentBid = entered;
    liveAuction.highestBidderIndex = currentTurnPlayerIdx;

    addAuctionLog(`💰 <strong>${player.name}</strong> placed bid of <strong>${entered.toLocaleString()} ${currency}</strong>!`, 'log-raise');
    wheel.sound.playTick();

    advanceLiveTurn();
  }

  function handleLivePass() {
    if (liveAuction.hasConcluded || liveAuction.activeBidders.length === 0) return;
    const passedPlayerIdx = liveAuction.activeBidders[liveAuction.turnPointer];
    const player = players[passedPlayerIdx];

    addAuctionLog(`✋ <strong>${player.name}</strong> passed.`, 'log-pass');

    // Remove this player from active bidders
    liveAuction.activeBidders.splice(liveAuction.turnPointer, 1);

    // Check if only 1 active bidder remains who also holds the highest bid
    if (liveAuction.activeBidders.length === 1 && liveAuction.highestBidderIndex === liveAuction.activeBidders[0]) {
      concludeLiveAuction(liveAuction.highestBidderIndex);
      return;
    }

    // If no one is left
    if (liveAuction.activeBidders.length === 0) {
      if (liveAuction.highestBidderIndex !== -1) {
        concludeLiveAuction(liveAuction.highestBidderIndex);
      } else {
        liveAuction.hasConcluded = true;
        addAuctionLog(`❌ All players passed! Character discarded.`, 'log-pass');
        renderLiveAuctionUI();
        setTimeout(() => {
          cancelAndDiscardCharacter();
        }, 1400);
      }
      return;
    }

    // Adjust turn pointer if out of bounds
    if (liveAuction.turnPointer >= liveAuction.activeBidders.length) {
      liveAuction.turnPointer = 0;
    }

    renderLiveAuctionUI();
  }

  function advanceLiveTurn() {
    if (liveAuction.activeBidders.length <= 1) {
      if (liveAuction.highestBidderIndex !== -1) {
        concludeLiveAuction(liveAuction.highestBidderIndex);
        return;
      }
    }

    liveAuction.turnPointer = (liveAuction.turnPointer + 1) % liveAuction.activeBidders.length;
    renderLiveAuctionUI();
  }

  function concludeLiveAuction(winnerIndex) {
    liveAuction.hasConcluded = true;
    const winner = players[winnerIndex];
    const currency = currentUniverse === 'naruto' ? 'Ryo' : '฿';
    addAuctionLog(`🏆 <strong>${winner.name} WINS</strong> at <strong>${liveAuction.currentBid.toLocaleString()} ${currency}</strong>!`, 'log-win');
    renderLiveAuctionUI();

    wheel.sound.playVictory();
    confetti.fire(pendingCharacter ? pendingCharacter.universe : 'onepiece');

    setTimeout(() => {
      assignCharacterToPlayer(winnerIndex, liveAuction.currentBid);
    }, 1300);
  }

  function addAuctionLog(msg, typeClass = '') {
    const div = document.createElement('div');
    div.className = `log-entry ${typeClass}`;
    div.innerHTML = msg;
    liveAuctionLog.appendChild(div);
    liveAuctionLog.scrollTop = liveAuctionLog.scrollHeight;
  }

  // --- MODE 2: SECRET BLIND BIDDING ---

  function renderSecretInputUI() {
    const currency = currentUniverse === 'naruto' ? 'Ryo' : '฿';
    const currentP = players[secretAuction.stepIndex];

    secretCurrentPlayerName.textContent = `👤 ${currentP.name}'s Turn (Private)`;
    secretCurrentPlayerPurse.textContent = `Purse: ${currentP.money.toLocaleString()} ${currency}`;
    secretBidInput.value = '';
    secretBidInput.type = 'password';
    secretBidInput.max = currentP.money;
    secretBidInput.placeholder = `Enter 0 to ${currentP.money.toLocaleString()}...`;

    const progressPct = ((secretAuction.stepIndex) / players.length) * 100;
    secretProgressFill.style.width = `${progressPct}%`;
    secretProgressText.textContent = `Player ${secretAuction.stepIndex + 1} of ${players.length} ready`;
  }

  function handleSecretLockBid() {
    const currentP = players[secretAuction.stepIndex];
    let bidVal = parseInt(secretBidInput.value);
    if (isNaN(bidVal) || bidVal < 0) bidVal = 0;

    if (bidVal > currentP.money) {
      alert(`⚠️ Bid cannot exceed available purse (${currentP.money.toLocaleString()})!`);
      return;
    }

    secretAuction.bids[secretAuction.stepIndex] = bidVal;
    wheel.sound.playTick();

    secretAuction.stepIndex++;
    if (secretAuction.stepIndex < players.length) {
      renderSecretInputUI();
    } else {
      // All bids collected -> Proceed to Reveal Stage
      secretAuction.hasConcluded = true;
      renderSecretRevealUI();
    }
  }

  function renderSecretRevealUI() {
    secretInputStage.style.display = 'none';
    secretRevealStage.style.display = 'block';

    const currency = currentUniverse === 'naruto' ? 'Ryo' : '฿';
    secretBidsGrid.innerHTML = '';

    // Calculate highest bid
    let highest = -1;
    let winnerIdx = -1;

    players.forEach((p, idx) => {
      const bid = secretAuction.bids[idx] || 0;
      if (bid > highest) {
        highest = bid;
        winnerIdx = idx;
      }
    });

    secretAuction.winnerIndex = winnerIdx;
    secretAuction.winningBid = highest;

    players.forEach((p, idx) => {
      const bid = secretAuction.bids[idx] || 0;
      const isWinner = (idx === winnerIdx && highest > 0);

      const card = document.createElement('div');
      card.className = `secret-bid-card ${isWinner ? 'winner' : ''}`;
      card.innerHTML = `
        <div class="card-bidder-name">${p.name}</div>
        <div class="card-bid-val">${bid.toLocaleString()} ${currency}</div>
        <div class="card-bid-status" style="color: ${isWinner ? '#ffd166' : (bid === 0 ? '#94a3b8' : '#38bdf8')}">
          ${isWinner ? '🏆 HIGHEST BID!' : (bid === 0 ? 'Passed (0)' : 'Outbid')}
        </div>
      `;
      secretBidsGrid.appendChild(card);
    });

    if (highest > 0) {
      secretClaimWinnerBtn.disabled = false;
      secretClaimWinnerBtn.textContent = `Award to ${players[winnerIdx].name} (${highest.toLocaleString()} ${currency}) 🏆`;
      wheel.sound.playVictory();
      confetti.fire(pendingCharacter ? pendingCharacter.universe : 'onepiece');
    } else {
      secretClaimWinnerBtn.disabled = false;
      secretClaimWinnerBtn.textContent = `❌ All Players Passed (0) - Discard Character`;
    }
  }

  function handleSecretClaimWinner() {
    if (secretAuction.winnerIndex !== -1 && secretAuction.winningBid > 0) {
      assignCharacterToPlayer(secretAuction.winnerIndex, secretAuction.winningBid);
    } else {
      cancelAndDiscardCharacter();
    }
  }

  // --- MODE 3: DIRECT ASSIGN ---

  function renderDirectAssignBtns() {
    playerAssignBtns.innerHTML = '';
    players.forEach((p, pIdx) => {
      const btn = document.createElement('button');
      btn.className = `assign-player-btn ${p.colorClass}`;
      btn.innerHTML = `👤 Give to ${p.name} (Free)`;
      btn.addEventListener('click', () => {
        assignCharacterToPlayer(pIdx, 0); // 0 cost
      });
      playerAssignBtns.appendChild(btn);
    });
  }

  // --- AWARD & BUDGET DEDUCTION ---

  function cancelAndDiscardCharacter() {
    pendingCharacter = null;
    pendingSliceIndex = -1;
    modal.close();
    spinBtn.disabled = false;
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    renderPlayerDock();
  }

  function assignCharacterToPlayer(playerIndex, winningBidAmount = 0) {
    if (!pendingCharacter) {
      modal.close();
      return;
    }

    const recipient = players[playerIndex];
    recipient.characters.push(pendingCharacter);

    // DEDUCT WINNING BID FROM WINNER'S BUDGET
    if (winningBidAmount > 0) {
      recipient.money = Math.max(0, recipient.money - winningBidAmount);
    }

    // Eliminate from active wheel pool (No repetition in game)
    const pool = activePools[currentUniverse];
    if (pendingSliceIndex >= 0 && pendingSliceIndex < pool.length) {
      pool.splice(pendingSliceIndex, 1);
    } else {
      const idx = pool.findIndex(c => c.id === pendingCharacter.id);
      if (idx !== -1) pool.splice(idx, 1);
    }

    wheel.setItems(pool);
    updateCounters();

    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    renderPlayerDock();

    pendingCharacter = null;
    pendingSliceIndex = -1;

    modal.close();
    spinBtn.disabled = false;
    wheel.sound.playVictory();
  }

  function showInspectModal(char, owner) {
    populateModalData(char);

    claimBanner.textContent = `🛡️ Recruited in ${owner.name}'s Squad`;
    claimBanner.style.background = '#4a5568';

    biddingArena.style.display = 'none';

    modal.showModal();
  }

  function populateModalData(char) {
    const isNaruto = char.universe === 'naruto';

    posterCard.className = `wanted-poster-card ${isNaruto ? 'naruto-card' : ''}`;
    cardHeaderTitle.textContent = isNaruto ? 'SHINOBI CLASSIFIED' : 'WANTED';
    cardHeaderSubtext.textContent = isNaruto ? 'BINGO BOOK S-RANK' : 'DEAD OR ALIVE';
    currencySymbol.textContent = isNaruto ? 'Ryo' : '฿';

    charEpithet.textContent = char.epithet || 'Elite Fighter';
    charName.textContent = char.name;
    charBounty.textContent = char.bounty > 0 ? char.bounty.toLocaleString() : '100,000';

    labelAffiliation.textContent = isNaruto ? 'Hidden Village' : 'Affiliation / Crew';
    charAffiliation.textContent = char.affiliation || 'Grand Line / Shinobi World';

    labelRole.textContent = isNaruto ? 'Ninja Rank / Title' : 'Role / Rank';
    charRole.textContent = char.role || 'Combatant';

    labelPower.textContent = isNaruto ? 'Kekkei Genkai / Chakra' : 'Devil Fruit / Power';
    charPower.textContent = char.power || 'None';

    charOrigin.textContent = char.origin || (isNaruto ? 'Shinobi World' : 'Grand Line');
    charQuote.textContent = char.quote || '...';

    charTechniques.innerHTML = '';
    labelTechniques.textContent = isNaruto ? 'Signature Jutsu' : 'Signature Techniques';
    (char.techniques || [char.power]).filter(Boolean).forEach(tech => {
      const span = document.createElement('span');
      span.className = 'haki-badge';
      span.textContent = tech;
      if (isNaruto) {
        span.style.background = '#e85d04';
        span.style.color = '#fff';
      }
      charTechniques.appendChild(span);
    });

    const fallback = createFallbackAvatar(char);
    charImg.onerror = () => {
      charImg.onerror = null;
      charImg.src = fallback;
    };
    charImg.src = char.thumb || fallback;
    charImg.alt = char.name;
  }

  function createFallbackAvatar(char) {
    const initials = char.name.split(' ').map(n => n[0]).slice(0, 2).join('');
    const bg = char.color || (char.universe === 'naruto' ? '#f77f00' : '#851c14');
    const emblem = char.universe === 'naruto' ? '🍃 NARUTO 🍃' : '☠️ ONE PIECE ☠️';
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
        <rect width="300" height="300" fill="${bg}"/>
        <circle cx="150" cy="150" r="110" fill="none" stroke="#f6ecdc" stroke-width="4" stroke-dasharray="8 6"/>
        <text x="150" y="130" font-family="'Cinzel', serif" font-size="70" font-weight="bold" fill="#fff" text-anchor="middle" dominant-baseline="central">${initials}</text>
        <text x="150" y="210" font-family="'Cinzel', serif" font-size="24" fill="#ffd166" text-anchor="middle">${emblem}</text>
      </svg>
    `;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  // --- CHARACTER MANAGER / ROSTER EDITOR ---

  function openRosterManager() {
    if (rosterUniverseFilter) {
      rosterUniverseFilter.value = currentUniverse === 'naruto' ? 'naruto' : (currentUniverse === 'onepiece' ? 'onepiece' : 'all');
    }
    renderRosterTable(rosterSearchInput.value, rosterUniverseFilter ? rosterUniverseFilter.value : 'all');
    rosterModal.showModal();
  }

  function renderRosterTable(query = '', universe = 'all') {
    const q = (query || '').toLowerCase().trim();
    let filtered = masterRoster;

    // Filter by universe (One Piece / Naruto / All)
    if (universe && universe !== 'all') {
      filtered = filtered.filter(c => c.universe === universe);
    }

    // Filter by search query
    if (q) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(q) ||
        (c.affiliation && c.affiliation.toLowerCase().includes(q)) ||
        (c.power && c.power.toLowerCase().includes(q)) ||
        (c.epithet && c.epithet.toLowerCase().includes(q))
      );
    }

    editorTotalCount.textContent = `${filtered.length} of ${masterRoster.length}`;
    rosterTableBody.innerHTML = '';

    // Render up to 500 characters so all Naruto/One Piece characters can be browsed and edited
    const displayList = filtered.slice(0, 500);

    displayList.forEach((c, idx) => {
      const tr = document.createElement('tr');
      const isNaruto = c.universe === 'naruto';
      const currency = isNaruto ? 'Ryo' : '฿';

      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td><strong>${c.name}</strong><br><small style="color:#94a3b8;">${c.epithet || ''}</small></td>
        <td><span class="haki-badge" style="background:${isNaruto ? '#ea580c' : '#b91c1c'}">${isNaruto ? '🍃 Naruto' : '🏴‍☠️ One Piece'}</span></td>
        <td>${c.affiliation || '-'}</td>
        <td>${(c.bounty || 0).toLocaleString()} ${currency}</td>
        <td><small>${c.power || '-'}</small></td>
        <td>
          <button class="btn-sm btn-edit" data-id="${c.id}" type="button">✏️ Edit</button>
          <button class="btn-sm btn-del" data-id="${c.id}" type="button">🗑️ Del</button>
        </td>
      `;

      rosterTableBody.appendChild(tr);
    });

    if (filtered.length > 500) {
      const noteTr = document.createElement('tr');
      noteTr.innerHTML = `<td colspan="7" style="text-align:center;color:#ffd166;">... Showing first 500 matches. Use search bar to find specific characters ...</td>`;
      rosterTableBody.appendChild(noteTr);
    }

    // Attach row button events
    rosterTableBody.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openEditForm(id);
      });
    });

    rosterTableBody.querySelectorAll('.btn-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        deleteCharacter(id);
      });
    });
  }

  function openEditForm(id = null) {
    editFormCard.style.display = 'grid';
    if (id) {
      const c = masterRoster.find(x => x.id === id);
      if (c) {
        editCharId.value = c.id;
        formCharName.value = c.name;
        formCharUniverse.value = c.universe || 'onepiece';
        formCharEpithet.value = c.epithet || '';
        formCharAffiliation.value = c.affiliation || '';
        formCharBounty.value = c.bounty || 100000;
        formCharPower.value = c.power || '';
      }
    } else {
      // New Character Form
      const defaultUni = rosterUniverseFilter && rosterUniverseFilter.value !== 'all' ? rosterUniverseFilter.value : (currentUniverse === 'naruto' ? 'naruto' : 'onepiece');
      editCharId.value = '';
      formCharName.value = '';
      formCharUniverse.value = defaultUni;
      formCharEpithet.value = '';
      formCharAffiliation.value = '';
      formCharBounty.value = 100000;
      formCharPower.value = '';
    }
    editFormCard.scrollIntoView({ behavior: 'smooth' });
  }

  function saveCharacterForm() {
    const id = editCharId.value;
    const name = formCharName.value.trim();
    if (!name) {
      alert('Please enter a character name!');
      return;
    }

    const universe = formCharUniverse.value;
    const epithet = formCharEpithet.value.trim();
    const affiliation = formCharAffiliation.value.trim();
    const bounty = parseInt(formCharBounty.value) || 100000;
    const power = formCharPower.value.trim();

    if (id) {
      // Update existing
      const c = masterRoster.find(x => x.id === id);
      if (c) {
        c.name = name;
        c.universe = universe;
        c.epithet = epithet;
        c.affiliation = affiliation;
        c.bounty = bounty;
        c.power = power;
        c.techniques = [power];
      }
    } else {
      // Add new
      const newId = `custom_${Date.now()}_${name.toLowerCase().replace(/\s+/g, '_')}`;
      masterRoster.unshift({
        id: newId,
        universe: universe,
        name: name,
        epithet: epithet || 'Custom Warrior',
        affiliation: affiliation || 'Custom Clan',
        role: 'Custom Fighter',
        bounty: bounty,
        power: power,
        techniques: [power],
        origin: universe === 'naruto' ? 'Shinobi World' : 'Grand Line',
        quote: "I make my own destiny!",
        color: universe === 'naruto' ? '#f77f00' : '#b91c1c'
      });
    }

    // Save to LocalStorage
    saveRosterToStorage(masterRoster);
    refreshActivePools();
    setUniverse(currentUniverse);

    editFormCard.style.display = 'none';
    renderRosterTable(rosterSearchInput.value, rosterUniverseFilter ? rosterUniverseFilter.value : 'all');
    wheel.sound.playVictory();
  }

  function deleteCharacter(id) {
    if (!confirm('Are you sure you want to delete this character from the wheel?')) return;
    masterRoster = masterRoster.filter(c => c.id !== id);
    saveRosterToStorage(masterRoster);
    refreshActivePools();
    setUniverse(currentUniverse);
    renderRosterTable(rosterSearchInput.value, rosterUniverseFilter ? rosterUniverseFilter.value : 'all');
  }

  function deleteAllCharacters() {
    const filterUni = rosterUniverseFilter ? rosterUniverseFilter.value : 'all';
    let confirmMsg = '⚠️ Are you sure you want to DELETE ALL characters from the wheel? This will clear the entire wheel!';
    if (filterUni === 'onepiece') {
      confirmMsg = '⚠️ Are you sure you want to DELETE ALL One Piece characters from the wheel?';
    } else if (filterUni === 'naruto') {
      confirmMsg = '⚠️ Are you sure you want to DELETE ALL Naruto characters from the wheel?';
    }

    if (!confirm(confirmMsg)) return;

    if (filterUni === 'all') {
      masterRoster = [];
    } else {
      masterRoster = masterRoster.filter(c => c.universe !== filterUni);
    }

    saveRosterToStorage(masterRoster);
    refreshActivePools();
    setUniverse(currentUniverse);
    renderRosterTable(rosterSearchInput.value, filterUni);
    wheel.sound.playVictory();
  }

  // --- EVENT HANDLERS ---

  // Roster Editor Handlers
  openRosterBtn.addEventListener('click', () => openRosterManager());
  closeRosterBtn.addEventListener('click', () => rosterModal.close());

  if (rosterUniverseFilter) {
    rosterUniverseFilter.addEventListener('change', () => {
      renderRosterTable(rosterSearchInput.value, rosterUniverseFilter.value);
    });
  }

  if (deleteAllRosterBtn) {
    deleteAllRosterBtn.addEventListener('click', () => {
      deleteAllCharacters();
    });
  }

  rosterSearchInput.addEventListener('input', (e) => {
    renderRosterTable(e.target.value, rosterUniverseFilter ? rosterUniverseFilter.value : 'all');
  });

  toggleAddFormBtn.addEventListener('click', () => openEditForm(null));
  cancelEditBtn.addEventListener('click', () => {
    editFormCard.style.display = 'none';
  });
  saveCharFormBtn.addEventListener('click', () => saveCharacterForm());

  resetDefaultRosterBtn.addEventListener('click', () => {
    if (confirm('🔄 Reset all characters to the default master 1,000+ roster? Any custom added characters will be refreshed.')) {
      masterRoster = resetRosterToDefault();
      refreshActivePools();
      setUniverse(currentUniverse);
      renderRosterTable(rosterSearchInput.value, rosterUniverseFilter ? rosterUniverseFilter.value : 'all');
      wheel.sound.playVictory();
    }
  });

  // Spin Button
  spinBtn.addEventListener('click', () => {
    const pool = activePools[currentUniverse];
    if (wheel.isSpinning || pool.length === 0) return;
    spinBtn.disabled = true;
    wheel.spin();
  });

  // Quick Random Pick
  quickRandomBtn.addEventListener('click', () => {
    const pool = activePools[currentUniverse];
    if (wheel.isSpinning || pool.length === 0) return;
    const randomIndex = Math.floor(Math.random() * pool.length);
    wheel.sound.playVictory();
    pendingCharacter = pool[randomIndex];
    pendingSliceIndex = randomIndex;
    showDraftModal(pendingCharacter);
  });

  // Universe Tabs
  tabOp.addEventListener('click', () => {
    if (wheel.isSpinning) return;
    setUniverse('onepiece');
  });

  tabNr.addEventListener('click', () => {
    if (wheel.isSpinning) return;
    setUniverse('naruto');
  });

  tabAll.addEventListener('click', () => {
    if (wheel.isSpinning) return;
    setUniverse('all');
  });

  // Sound Toggle
  soundBtn.addEventListener('click', () => {
    const isEnabled = wheel.sound.toggle();
    soundBtn.textContent = isEnabled ? '🔊' : '🔇';
  });

  // Reset Game Button
  resetGameBtn.addEventListener('click', () => {
    if (confirm('🔄 Reset the current game? This will restore all characters back to the wheel and reset player inventories.')) {
      resetGame();
    }
  });

  // --- BIDDING ARENA EVENT LISTENERS ---

  // Bidding Tab Switcher
  bidTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchBiddingTab(btn.getAttribute('data-mode'));
    });
  });

  // Live Auction Raise Controls
  quickRaiseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const addVal = parseInt(btn.getAttribute('data-add') || '1000');
      handleLiveRaise(addVal);
    });
  });

  liveSubmitCustomBtn.addEventListener('click', () => handleLiveCustomBid());
  liveCustomBidInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleLiveCustomBid();
  });

  livePassBtn.addEventListener('click', () => handleLivePass());

  if (liveSkipBtn) {
    liveSkipBtn.addEventListener('click', () => cancelAndDiscardCharacter());
  }

  if (directSkipBtn) {
    directSkipBtn.addEventListener('click', () => cancelAndDiscardCharacter());
  }

  // Secret Bidding Controls
  secretPeekToggle.addEventListener('click', () => {
    secretBidInput.type = secretBidInput.type === 'password' ? 'text' : 'password';
  });

  secretPresetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pct = parseInt(btn.getAttribute('data-pct') || '0');
      const currentP = players[secretAuction.stepIndex];
      if (currentP) {
        secretBidInput.value = Math.floor((currentP.money * pct) / 100);
      }
    });
  });

  secretLockBidBtn.addEventListener('click', () => handleSecretLockBid());
  secretBidInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSecretLockBid();
  });

  secretClaimWinnerBtn.addEventListener('click', () => handleSecretClaimWinner());

  // Close Modal Handler (Cancels character draft & proceeds without awarding)
  closeModalBtn.addEventListener('click', () => {
    cancelAndDiscardCharacter();
  });

  // Backdrop click dismiss for dialogs
  [rosterModal, setupModal, modal].forEach(dlg => {
    if (!dlg) return;
    dlg.addEventListener('click', (e) => {
      const rect = dlg.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        if (dlg === modal) {
          cancelAndDiscardCharacter();
        } else {
          dlg.close();
        }
      }
    });
  });

  // Setup Modal Handling
  openSetupBtn.addEventListener('click', () => {
    const activePBtn = document.querySelector('.p-count-btn[data-count].active');
    const count = parseInt(activePBtn ? activePBtn.getAttribute('data-count') : '2');
    renderSetupPlayerInputs(count);
    setupModal.showModal();
  });

  if (closeSetupBtn) {
    closeSetupBtn.addEventListener('click', () => setupModal.close());
  }

  budgetSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    budgetDisplay.textContent = `${val.toLocaleString()} ฿/Ryo`;
  });

  pCountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pCountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const count = parseInt(btn.getAttribute('data-count') || '2');
      renderSetupPlayerInputs(count);
    });
  });

  startGameBtn.addEventListener('click', () => {
    const activePBtn = document.querySelector('.p-count-btn[data-count].active');
    const count = parseInt(activePBtn ? activePBtn.getAttribute('data-count') : '2');
    const budget = parseInt(budgetSlider.value || '75000');

    const customNames = [];
    for (let i = 0; i < count; i++) {
      const inp = document.getElementById(`custom-pname-${i}`);
      customNames.push(inp && inp.value.trim() ? inp.value.trim() : `Player ${i + 1}`);
    }

    setupModal.close();
    initGame(count, budget, customNames);
  });
});
