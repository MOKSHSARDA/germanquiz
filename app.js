/* ==================== 1. CONFIGURATION & SAMPLE QUESTION BANK ==================== */
// Tera Google Apps Script URL (Scores & Leaderboard ke liye)
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyhjOC5eCgzpVbhhpVkkCZXF_at0tmpxeE-CTSeqz6urB2hXJVZxY0fapzlAIS-zHAv/exec";

// Fallback Starter Questions (Jab tak data/questions.json mein 2000 Qs na daale jayein)
const SAMPLE_QUESTIONS = [
  // A1
  { id: 1, level: "A1", category: "vocab", german: "Der Bahnhof", q: "'Der Bahnhof' ka English meaning kya hai?", options: ["Railway station", "Airport", "Hospital", "Library"], ans: "Railway station" },
  { id: 2, level: "A1", category: "numbers", german: "Siebenundvierzig", q: "German number 'Siebenundvierzig' kaunsa ank hai?", options: ["47", "74", "40", "17"], ans: "47" },
  { id: 3, level: "A1", category: "grammar", german: "Ich komme aus Indien.", q: "Sahi verb form chunein: 'Ich ___ aus Indien.'", options: ["komme", "kommst", "kommt", "kommen"], ans: "komme" },
  // A2
  { id: 4, level: "A2", category: "vocab", german: "Die Öffnungszeiten", q: "'Die Öffnungszeiten' kis cheez ko kehte hain?", options: ["Opening hours", "Closing sale", "Holidays", "Ticket price"], ans: "Opening hours" },
  { id: 5, level: "A2", category: "numbers", german: "Dreihundertfünfzehn", q: "'Dreihundertfünfzehn' kitna hota hai?", options: ["315", "350", "135", "513"], ans: "315" },
  { id: 6, level: "A2", category: "grammar", german: "Ich fahre mit dem Bus.", q: "Sahi preposition chunein: 'Ich fahre ___ dem Bus.'", options: ["mit", "nach", "zu", "in"], ans: "mit" },
  // B1
  { id: 7, level: "B1", category: "vocab", german: "Die Erfahrung", q: "'Die Erfahrung' ka sahi arth kya hai?", options: ["Experience", "Education", "Permission", "Explanation"], ans: "Experience" },
  { id: 8, level: "B1", category: "grammar", german: "Obwohl es regnet, gehe ich spazieren.", q: "Word order complete karein: 'Obwohl es regnet, ___ ich spazieren.'", options: ["gehe", "ich gehe", "gehen", "gehst"], ans: "gehe" },
  // B2
  { id: 9, level: "B2", category: "vocab", german: "Die Voraussetzung", q: "'Die Voraussetzung' ka matlab kya hai?", options: ["Prerequisite / Condition", "Disadvantage", "Result", "Suggestion"], ans: "Prerequisite / Condition" },
  { id: 10, level: "B2", category: "grammar", german: "Je mehr man lernt, desto besser spricht man.", q: "Double connector complete karein: 'Je mehr..., ___ besser...'", options: ["desto", "als", "wie", "ob"], ans: "desto" }
];

// 10-Step KBC Point Pyramid (Q3 & Q7 are Safe Havens)
const LADDER = [
  { step: 1, pts: 100, safe: false },
  { step: 2, pts: 250, safe: false },
  { step: 3, pts: 500, safe: true },    // Safe Haven 1
  { step: 4, pts: 1000, safe: false },
  { step: 5, pts: 2500, safe: false },
  { step: 6, pts: 4000, safe: false },
  { step: 7, pts: 5000, safe: true },    // Safe Haven 2
  { step: 8, pts: 10000, safe: false },
  { step: 9, pts: 15000, safe: false },
  { step: 10, pts: 25000, safe: true }   // Jackpot
];

/* ==================== 2. APP & WALLET STATE ==================== */
let wallet = JSON.parse(localStorage.getItem("kbc_deutsch_wallet")) || {
  playerName: "",
  totalPoints: 0,
  solvedIds: [],
  bestStreak: 0,
  localScores: []
};

let allQuestions = [...SAMPLE_QUESTIONS];
let selectedMode = "MIXED";
let selectedLevel = "ALL";
let soundEnabled = true;

let roundQuestions = [];
let currentIdx = 0;
let selectedOption = null;
let timerInterval = null;
let timeLeft = 30;
let currentStreak = 0;
let mistakes = [];
let lifelines = { fifty: false, poll: false, flip: false };

// Flashcard state
let fcList = [];
let fcIndex = 0;

/* ==================== 3. INITIALIZATION & JSON LOADER ==================== */
document.addEventListener("DOMContentLoaded", () => {
  // Restore saved player name
  const nameInput = document.getElementById("playerName");
  if (wallet.playerName && nameInput) {
    nameInput.value = wallet.playerName;
  }

  // Load 2000 questions from external JSON if present
  fetch("data/questions.json")
    .then(res => (res.ok ? res.json() : null))
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        allQuestions = data;
        console.log(`Loaded ${allQuestions.length} questions from JSON.`);
      }
    })
    .catch(() => console.log("Running with built-in sample bank."));

  setupFilterChips();
  updateTopWallet();
});

function setupFilterChips() {
  document.querySelectorAll("#modeChips .chip").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#modeChips .chip").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedMode = btn.dataset.mode;
    });
  });

  document.querySelectorAll("#levelChips .chip").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#levelChips .chip").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedLevel = btn.dataset.level;
    });
  });
}

/* ==================== 4. NAVIGATION & AUDIO ENGINE ==================== */
function navigateTo(screenId) {
  clearInterval(timerInterval);
  document.getElementById("ladderSidebar")?.classList.remove("open");
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(screenId)?.classList.add("active");
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  document.getElementById("soundToggleBtn").textContent = soundEnabled ? "🔊" : "🔇";
}

function playTone(freq, type = "sine", duration = 0.25) {
  if (!soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Ignore audio autoplay block if user hasn't interacted yet
  }
}

function speakGermanText(text) {
  if (!text || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "de-DE";
  utter.rate = 0.92;
  window.speechSynthesis.speak(utter);
}

function speakGerman() {
  const qObj = roundQuestions[currentIdx];
  if (qObj) speakGermanText(qObj.german || qObj.q);
}

/* ==================== 5. SMART 10-QUESTION ROUND BUILDER ==================== */
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildRoundQuestions() {
  const filtered = allQuestions.filter(q => {
    const modeMatch = selectedMode === "MIXED" || q.category === selectedMode;
    const levelMatch = selectedLevel === "ALL" || q.level === selectedLevel;
    return modeMatch && levelMatch;
  });

  // Prioritize unseen questions so 2000 questions don't repeat quickly
  let pool = filtered.filter(q => !wallet.solvedIds.includes(q.id));
  if (pool.length < 10) pool = filtered;
  if (pool.length === 0) pool = [...allQuestions];

  // If "ALL" levels selected, build a KBC difficulty curve: 3 A1 -> 3 A2 -> 2 B1 -> 2 B2
  if (selectedLevel === "ALL") {
    const pick = (lvl, count) => shuffleArray(pool.filter(q => q.level === lvl)).slice(0, count);
    let balanced = [
      ...pick("A1", 3),
      ...pick("A2", 3),
      ...pick("B1", 2),
      ...pick("B2", 2)
    ];

    if (balanced.length < 10) {
      const usedIds = new Set(balanced.map(q => q.id));
      const filler = shuffleArray(pool.filter(q => !usedIds.has(q.id))).slice(0, 10 - balanced.length);
      balanced = [...balanced, ...filler];
    }
    return balanced.slice(0, 10);
  }

  return shuffleArray(pool).slice(0, 10);
}

/* ==================== 6. KBC GAMEPLAY & LOCK MECHANIC ==================== */
function startGame() {
  const nameVal = document.getElementById("playerName").value.trim();
  wallet.playerName = nameVal || "Deutsch Khiladi";
  saveWallet();

  roundQuestions = buildRoundQuestions();
  currentIdx = 0;
  currentStreak = 0;
  mistakes = [];
  lifelines = { fifty: false, poll: false, flip: false };

  ["ll-5050", "ll-poll", "ll-flip"].forEach(id => {
    document.getElementById(id).disabled = false;
  });

  navigateTo("gameScreen");
  renderLadder();
  loadQuestion();
  playTone(520, "triangle", 0.35);
}

function renderLadder() {
  const ul = document.getElementById("ladderList");
  ul.innerHTML = LADDER.map((item, idx) => {
    let cls = item.safe ? "safe" : "";
    if (idx === currentIdx) cls += " active";
    else if (idx < currentIdx) cls += " passed";
    return `
      <li class="${cls.trim()}">
        <span>Q${item.step} ${item.safe ? "🛡️" : ""}</span>
        <span>${item.pts.toLocaleString()} 🪙</span>
      </li>
    `;
  }).join("");
}

function toggleMobileLadder() {
  document.getElementById("ladderSidebar").classList.toggle("open");
}

function loadQuestion() {
  selectedOption = null;
  document.getElementById("lockBar").classList.add("hidden");
  renderLadder();

  const qObj = roundQuestions[currentIdx];
  document.getElementById("qNumberTag").textContent = `Q ${currentIdx + 1} / 10`;
  document.getElementById("qLevelTag").textContent = qObj.level;
  document.getElementById("qCatTag").textContent = qObj.category.toUpperCase();
  document.getElementById("questionText").textContent = qObj.q;

  // Streak indicator
  const streakEl = document.getElementById("streakBadge");
  if (currentStreak >= 2) {
    streakEl.textContent = `🔥 ${currentStreak}x Streak`;
    streakEl.classList.remove("hidden");
  } else {
    streakEl.classList.add("hidden");
  }

  const letters = ["A", "B", "C", "D"];
  const shuffledOpts = shuffleArray(qObj.options);
  const grid = document.getElementById("optionsGrid");

  grid.innerHTML = shuffledOpts
    .map(
      (opt, i) => `
      <button type="button" class="opt-btn" data-val="${escapeHtml(opt)}" onclick="selectOption(this, '${letters[i]}')">
        <span class="letter">${letters[i]}:</span>
        <span>${escapeHtml(opt)}</span>
      </button>
    `
    )
    .join("");

  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);
  // Q1-Q4: 30s, Q5-Q7: 45s, Q8-Q10: 60s
  timeLeft = currentIdx < 4 ? 30 : currentIdx < 7 ? 45 : 60;
  const timerEl = document.getElementById("timerDisplay");
  timerEl.textContent = timeLeft;
  timerEl.style.borderColor = "var(--gold-bright)";

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 5 && timeLeft > 0) {
      timerEl.style.borderColor = "var(--red-wrong)";
      playTone(850, "sine", 0.08);
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      const qObj = roundQuestions[currentIdx];
      mistakes.push({ q: qObj.q, your: "Time Out ⏰", right: qObj.ans });
      finishRound(false, "⏰ Samay Samapt!");
    }
  }, 1000);
}

function selectOption(btn, letter) {
  document.querySelectorAll(".opt-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  selectedOption = btn.dataset.val;
  document.getElementById("selectedOptLabel").textContent = letter;
  document.getElementById("lockBar").classList.remove("hidden");
  playTone(380, "sine", 0.1);
}

function confirmLock() {
  if (!selectedOption) return;
  clearInterval(timerInterval);
  document.getElementById("lockBar").classList.add("hidden");

  const qObj = roundQuestions[currentIdx];
  const buttons = document.querySelectorAll(".opt-btn");
  buttons.forEach(b => (b.disabled = true));

  // KBC Dramatic Lock Suspense (950ms)
  playTone(210, "sawtooth", 0.55);

  setTimeout(() => {
    const isCorrect = selectedOption === qObj.ans;

    buttons.forEach(b => {
      if (b.dataset.val === qObj.ans) b.classList.add("correct");
      else if (b.dataset.val === selectedOption && !isCorrect) b.classList.add("wrong");
    });

    if (isCorrect) {
      playTone(680, "triangle", 0.35);
      currentStreak++;
      if (currentStreak > wallet.bestStreak) wallet.bestStreak = currentStreak;
      if (!wallet.solvedIds.includes(qObj.id)) wallet.solvedIds.push(qObj.id);
      saveWallet();

      setTimeout(() => {
        if (currentIdx === 9) {
          finishRound(true, "🎉 BADHAI HO! Aapne 10/10 Jeet Liye!");
        } else {
          currentIdx++;
          loadQuestion();
        }
      }, 1150);
    } else {
      playTone(135, "sawtooth", 0.65);
      mistakes.push({ q: qObj.q, your: selectedOption, right: qObj.ans });
      setTimeout(() => {
        finishRound(false, "❌ Galat Jawab!");
      }, 1350);
    }
  }, 950);
}

/* ==================== 7. LIFELINES (50:50, POLL, FLIP) ==================== */
function use5050() {
  if (lifelines.fifty) return;
  lifelines.fifty = true;
  document.getElementById("ll-5050").disabled = true;
  playTone(480, "sine", 0.2);

  const correctAns = roundQuestions[currentIdx].ans;
  const wrongBtns = [...document.querySelectorAll(".opt-btn")].filter(
    b => b.dataset.val !== correctAns
  );

  shuffleArray(wrongBtns)
    .slice(0, 2)
    .forEach(b => b.classList.add("faded"));
}

function usePoll() {
  if (lifelines.poll) return;
  lifelines.poll = true;
  document.getElementById("ll-poll").disabled = true;
  playTone(540, "sine", 0.2);

  const correctAns = roundQuestions[currentIdx].ans;
  const visibleBtns = [...document.querySelectorAll(".opt-btn")];
  const rightPct = Math.floor(Math.random() * 21) + 58; // 58% - 78% for right answer
  let remaining = 100 - rightPct;

  const wrongIndices = visibleBtns
    .map((b, idx) => (b.dataset.val !== correctAns ? idx : -1))
    .filter(idx => idx !== -1);

  const weights = wrongIndices.map(() => Math.random());
  const weightSum = weights.reduce((a, b) => a + b, 0) || 1;
  const wrongPcts = weights.map((w, i) =>
    i === weights.length - 1 ? remaining : Math.round((w / weightSum) * (100 - rightPct))
  );

  // Adjust rounding difference
  const allocatedWrong = wrongPcts.reduce((a, b) => a + b, 0);
  if (wrongPcts.length > 0) wrongPcts[wrongPcts.length - 1] += remaining - allocatedWrong;

  let wrongCursor = 0;
  const barsHtml = visibleBtns
    .map(btn => {
      const isRight = btn.dataset.val === correctAns;
      const pct = isRight ? rightPct : Math.max(0, wrongPcts[wrongCursor++]);
      return `
        <div class="poll-row">
          <strong>${escapeHtml(btn.innerText)} — ${pct}%</strong>
          <div class="poll-track">
            <div class="poll-fill" style="width: ${pct}%"></div>
          </div>
        </div>
      `;
    })
    .join("");

  document.getElementById("pollBars").innerHTML = barsHtml;
  document.getElementById("pollModal").classList.remove("hidden");
}

function closePollModal() {
  document.getElementById("pollModal").classList.add("hidden");
}

function useFlip() {
  if (lifelines.flip) return;
  lifelines.flip = true;
  document.getElementById("ll-flip").disabled = true;
  playTone(600, "triangle", 0.25);

  const currentQ = roundQuestions[currentIdx];
  const usedIds = new Set(roundQuestions.map(q => q.id));

  // Prefer same level replacement
  let replacement =
    allQuestions.find(q => q.level === currentQ.level && !usedIds.has(q.id)) ||
    allQuestions.find(q => !usedIds.has(q.id));

  if (replacement) {
    roundQuestions[currentIdx] = replacement;
    loadQuestion();
  }
}

/* ==================== 8. QUIT, SAFE HAVENS & RESULT SCREEN ==================== */
function quitGame() {
  clearInterval(timerInterval);
  const wonPts = currentIdx > 0 ? LADDER[currentIdx - 1].pts : 0;
  const answeredCount = currentIdx;
  creditAndShowResult("🚪 Aapne Game Quit Kiya", wonPts, answeredCount);
}

function finishRound(wonAll, title) {
  let wonPts = 0;
  const answeredCount = wonAll ? 10 : currentIdx;

  if (wonAll) {
    wonPts = LADDER[9].pts;
  } else {
    // Drop back to last crossed Safe Haven (Q3 = 500, Q7 = 5000)
    for (let i = currentIdx - 1; i >= 0; i--) {
      if (LADDER[i].safe) {
        wonPts = LADDER[i].pts;
        break;
      }
    }
  }

  creditAndShowResult(title, wonPts, answeredCount);
}

function creditAndShowResult(title, wonPts, answeredCount) {
  wallet.totalPoints += wonPts;
  wallet.localScores.push({
    name: wallet.playerName,
    points: wallet.totalPoints,
    lastRound: wonPts,
    date: new Date().toLocaleDateString()
  });
  saveWallet();
  updateTopWallet();

  // Sync score to Google Sheet in background
  syncScoreToGoogleSheet(wallet.playerName, wonPts, wallet.totalPoints, answeredCount);

  document.getElementById("resultTitle").textContent = title;
  document.getElementById("playerResultName").textContent = `Khiladi: ${wallet.playerName}`;
  document.getElementById("earnedPoints").textContent = wonPts.toLocaleString();
  document.getElementById("resultSummary").textContent = `Aapne ${answeredCount} / 10 Questions paar kiye`;

  const mBox = document.getElementById("mistakeBox");
  if (mistakes.length > 0) {
    mBox.innerHTML =
      `<h4>📌 Galat Jawabon ka Review:</h4>` +
      mistakes
        .map(
          m => `
        <div class="mistake-item">
          <strong>${escapeHtml(m.q)}</strong><br />
          Aapka Jawab: <span style="color:#f87171">${escapeHtml(m.your)}</span> |
          Sahi Jawab: <span style="color:#10b981"><strong>${escapeHtml(m.right)}</strong></span>
        </div>
      `
        )
        .join("");
  } else {
    mBox.innerHTML = `<p style="color:#10b981; text-align:center; font-weight:700;">🌟 Zero Mistakes! Shaandaar Khela!</p>`;
  }

  navigateTo("resultScreen");
}

/* ==================== 9. WALLET, RANKS & BADGES ==================== */
function saveWallet() {
  localStorage.setItem("kbc_deutsch_wallet", JSON.stringify(wallet));
}

function getRank(pts) {
  if (pts >= 100000) return "Kaiser (100k+)";
  if (pts >= 25000) return "Sprachmeister";
  if (pts >= 5000) return "Fortgeschritten";
  return "Anfänger";
}

function updateTopWallet() {
  document.getElementById("walletCoins").textContent = wallet.totalPoints.toLocaleString();
  document.getElementById("userRank").textContent = getRank(wallet.totalPoints);
}

function openWallet() {
  document.getElementById("statTotalPts").textContent = wallet.totalPoints.toLocaleString();
  document.getElementById("statSolved").textContent = `${wallet.solvedIds.length} / 2000`;
  document.getElementById("statStreak").textContent = `${wallet.bestStreak} 🔥`;

  const milestones = [
    { name: "🥉 Pehla Padaav", req: 500, desc: "500 Pts jama karein" },
    { name: "🥈 Number Ninja", req: 5000, desc: "5,000 Pts jama karein" },
    { name: "🥇 Grammar Guru", req: 25000, desc: "25,000 Pts jama karein" },
    { name: "👑 Deutsch Kaiser", req: 100000, desc: "1,00,000 Pts jama karein" }
  ];

  document.getElementById("badgesList").innerHTML = milestones
    .map(
      m => `
      <div class="badge-item ${wallet.totalPoints >= m.req ? "unlocked" : ""}">
        <strong>${m.name}</strong><br />
        <small>${m.desc} ${wallet.totalPoints >= m.req ? "✅" : "🔒"}</small>
      </div>
    `
    )
    .join("");

  document.getElementById("walletModal").classList.remove("hidden");
}

function closeWallet() {
  document.getElementById("walletModal").classList.add("hidden");
}

/* ==================== 10. LEADERBOARD & GOOGLE SHEETS SYNC ==================== */
function syncScoreToGoogleSheet(name, roundPts, totalPts, solved) {
  if (!GOOGLE_SCRIPT_URL) return;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("roundPoints", roundPts);
  formData.append("totalPoints", totalPts);
  formData.append("solved", solved);

  fetch(GOOGLE_SCRIPT_URL, { method: "POST", body: formData }).catch(() => {
    // Silent fallback if offline
  });
}

function openLeaderboard() {
  navigateTo("leaderboardScreen");
  const container = document.getElementById("leaderboardList");
  container.innerHTML = `<p class="loading-text">Rankings load ho rahi hain...</p>`;

  // Try fetching live Top 10 from Google Sheet (if doGet returns JSON), else show local high scores
  fetch(GOOGLE_SCRIPT_URL)
    .then(res => (res.ok ? res.json() : null))
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        renderLeaderboardRows(data.slice(0, 10));
      } else {
        renderLocalLeaderboard();
      }
    })
    .catch(() => renderLocalLeaderboard());
}

function renderLocalLeaderboard() {
  const fallbackList = [
    { name: wallet.playerName || "Aap", points: wallet.totalPoints },
    { name: "Aarav (Bot)", points: 18500 },
    { name: "Diya (Bot)", points: 12000 },
    { name: "Kabir (Bot)", points: 5500 },
    { name: "Ananya (Bot)", points: 2500 }
  ].sort((a, b) => b.points - a.points);

  renderLeaderboardRows(fallbackList);
}

function renderLeaderboardRows(rows) {
  const container = document.getElementById("leaderboardList");
  container.innerHTML = rows
    .map(
      (r, idx) => `
      <div class="lb-row ${idx === 0 ? "top-1" : ""}">
        <span><strong>#${idx + 1}</strong> &nbsp; ${escapeHtml(r.name || "Khiladi")}</span>
        <span style="color: var(--gold-bright); font-weight: 800;">
          ${Number(r.points || r.totalPoints || 0).toLocaleString()} 🪙
        </span>
      </div>
    `
    )
    .join("");
}

/* ==================== 11. FLASHCARD PRACTICE MODE (NO TIMER) ==================== */
function openPracticeMode() {
  fcList = shuffleArray(
    allQuestions.filter(q => {
      const modeOk = selectedMode === "MIXED" || q.category === selectedMode;
      const lvlOk = selectedLevel === "ALL" || q.level === selectedLevel;
      return modeOk && lvlOk;
    })
  );
  if (fcList.length === 0) fcList = [...allQuestions];
  fcIndex = 0;
  renderFlashcard();
  navigateTo("practiceScreen");
}

function renderFlashcard() {
  const item = fcList[fcIndex];
  document.getElementById("fcTag").textContent = `${item.level} • ${item.category.toUpperCase()}`;
  document.getElementById("fcFront").textContent = item.german || item.q;
  const backEl = document.getElementById("fcBack");
  backEl.textContent = `${item.ans} — (${item.q})`;
  backEl.classList.add("hidden");
}

function flipFlashcard() {
  document.getElementById("fcBack").classList.toggle("hidden");
  playTone(440, "sine", 0.12);
}

function speakFlashcard() {
  const item = fcList[fcIndex];
  if (item) speakGermanText(item.german || item.q);
}

function nextFlashcard() {
  fcIndex = (fcIndex + 1) % fcList.length;
  renderFlashcard();
}

/* ==================== 12. SECURITY HELPER ==================== */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

fetch("data/questions.json")
  .then(res => (res.ok ? res.json() : SAMPLE_QUESTIONS))
  .then(data => {
    allQuestions = expandTo500Questions(Array.isArray(data) && data.length ? data : SAMPLE_QUESTIONS);
    console.log("Total Active Questions:", allQuestions.length); // 500 dikhayega!
  })
  .catch(() => {
    allQuestions = expandTo500Questions(SAMPLE_QUESTIONS);
  });
