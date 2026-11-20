/* ==================== 1. CONFIGURATION & STARTER BANK ==================== */
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyhjOC5eCgzpVbhhpVkkCZXF_at0tmpxeE-CTSeqz6urB2hXJVZxY0fapzlAIS-zHAv/exec";

const SAMPLE_QUESTIONS = [
  { id: 1, level: "A1", category: "vocab", german: "Der Bahnhof", q: "What is the English meaning of 'Der Bahnhof'?", options: ["Railway station", "Airport", "Hospital", "Library"], ans: "Railway station" },
  { id: 2, level: "A1", category: "numbers", german: "Siebenundvierzig", q: "Which number is 'Siebenundvierzig' in German?", options: ["47", "74", "40", "17"], ans: "47" },
  { id: 3, level: "A1", category: "grammar", german: "Ich komme aus Indien.", q: "Choose the correct verb form: 'Ich ___ aus Indien.'", options: ["komme", "kommst", "kommt", "kommen"], ans: "komme" },
  { id: 4, level: "A2", category: "vocab", german: "Die Öffnungszeiten", q: "What does 'Die Öffnungszeiten' mean?", options: ["Opening hours", "Closing sale", "Holidays", "Ticket price"], ans: "Opening hours" },
  { id: 5, level: "A2", category: "numbers", german: "Dreihundertfünfzehn", q: "What number is 'Dreihundertfünfzehn'?", options: ["315", "350", "135", "513"], ans: "315" },
  { id: 6, level: "A2", category: "grammar", german: "Ich fahre mit dem Bus.", q: "Select the correct preposition: 'Ich fahre ___ dem Bus.'", options: ["mit", "nach", "zu", "in"], ans: "mit" },
  { id: 7, level: "B1", category: "vocab", german: "Die Erfahrung", q: "What is the English translation of 'Die Erfahrung'?", options: ["Experience", "Education", "Permission", "Explanation"], ans: "Experience" },
  { id: 8, level: "B1", category: "grammar", german: "Obwohl es regnet, gehe ich spazieren.", q: "Complete the word order: 'Obwohl es regnet, ___ ich spazieren.'", options: ["gehe", "ich gehe", "gehen", "gehst"], ans: "gehe" },
  { id: 9, level: "B2", category: "vocab", german: "Die Voraussetzung", q: "What does 'Die Voraussetzung' mean?", options: ["Prerequisite / Condition", "Disadvantage", "Result", "Suggestion"], ans: "Prerequisite / Condition" },
  { id: 10, level: "B2", category: "grammar", german: "Je mehr man lernt, desto besser spricht man.", q: "Complete the double connector: 'Je mehr..., ___ besser...'", options: ["desto", "als", "wie", "ob"], ans: "desto" }
];

const LADDER = [
  { step: 1, pts: 100, safe: false },
  { step: 2, pts: 250, safe: false },
  { step: 3, pts: 500, safe: true },
  { step: 4, pts: 1000, safe: false },
  { step: 5, pts: 2500, safe: false },
  { step: 6, pts: 4000, safe: false },
  { step: 7, pts: 5000, safe: true },
  { step: 8, pts: 10000, safe: false },
  { step: 9, pts: 15000, safe: false },
  { step: 10, pts: 25000, safe: true }
];

/* ==================== 2. APP & WALLET STATE ==================== */
let wallet = JSON.parse(localStorage.getItem("kbc_deutsch_wallet")) || {
  playerName: "",
  totalPoints: 0,
  solvedIds: [],
  bestStreak: 0,
  localScores: []
};

let allQuestions = [];
let selectedMode = "MIXED";
let selectedLevel = "ALL";
let soundEnabled = true;
let sharedAudioCtx = null;

let roundQuestions = [];
let currentIdx = 0;
let selectedOption = null;
let isAnswerLocked = false;
let timerInterval = null;
let timeLeft = 30;
let currentStreak = 0;
let mistakes = [];
let lifelines = { fifty: false, poll: false, flip: false };

let fcList = [];
let fcIndex = 0;

/* ==================== 3. AUTO-500 QUESTION GENERATOR ==================== */
function build500QuestionBank() {
  const bank = [...SAMPLE_QUESTIONS];
  let nextId = bank.length + 1;

  const vocabPairs = [
    ["A1", "Der Tisch", "Table"], ["A1", "Der Stuhl", "Chair"], ["A1", "Das Buch", "Book"],
    ["A1", "Der Stift", "Pen"], ["A1", "Das Wasser", "Water"], ["A1", "Das Brot", "Bread"],
    ["A1", "Die Milch", "Milk"], ["A1", "Der Kaffee", "Coffee"], ["A1", "Der Tee", "Tea"],
    ["A1", "Das Haus", "House"], ["A1", "Die Wohnung", "Apartment"], ["A1", "Das Zimmer", "Room"],
    ["A1", "Die Küche", "Kitchen"], ["A1", "Das Bad", "Bathroom"], ["A1", "Das Bett", "Bed"],
    ["A1", "Der Arzt", "Doctor"], ["A1", "Das Krankenhaus", "Hospital"], ["A1", "Die Apotheke", "Pharmacy"],
    ["A1", "Der Flughafen", "Airport"], ["A1", "Der Zug", "Train"], ["A1", "Das Auto", "Car"],
    ["A1", "Das Fahrrad", "Bicycle"], ["A1", "Die Schule", "School"], ["A1", "Die Universität", "University"],
    ["A1", "Der Lehrer", "Teacher"], ["A1", "Der Student", "University student"], ["A1", "Die Stadt", "City"],
    ["A1", "Das Land", "Country"], ["A1", "Der Freund", "Friend"], ["A1", "Die Familie", "Family"],
    ["A1", "Die Mutter", "Mother"], ["A1", "Der Vater", "Father"], ["A1", "Der Bruder", "Brother"],
    ["A1", "Die Schwester", "Sister"], ["A1", "Das Kind", "Child"], ["A1", "Der Hund", "Dog"],
    ["A1", "Die Katze", "Cat"], ["A1", "Der Morgen", "Morning"], ["A1", "Der Abend", "Evening"],
    ["A1", "Die Nacht", "Night"], ["A1", "Heute", "Today"], ["A1", "Morgen", "Tomorrow"],
    ["A1", "Gestern", "Yesterday"], ["A1", "Immer", "Always"], ["A1", "Manchmal", "Sometimes"],
    ["A1", "Nie", "Never"], ["A1", "Schnell", "Fast"], ["A1", "Langsam", "Slow"],
    ["A1", "Groß", "Big / Tall"], ["A1", "Klein", "Small"], ["A1", "Teuer", "Expensive"],
    ["A1", "Billig", "Cheap"], ["A1", "Wichtig", "Important"], ["A1", "Einfach", "Easy / Simple"],
    ["A1", "Schwierig", "Difficult"], ["A1", "Kalt", "Cold"], ["A1", "Warm", "Warm"],
    ["A1", "Das Wetter", "Weather"], ["A1", "Die Sonne", "Sun"], ["A1", "Der Regen", "Rain"],
    ["A2", "Die Rechnung", "Bill / Invoice"], ["A2", "Das Trinkgeld", "Tip (gratuity)"], ["A2", "Die Speisekarte", "Menu"],
    ["A2", "Der Kellner", "Waiter"], ["A2", "Bestellen", "To order"], ["A2", "Bezahlen", "To pay"],
    ["A2", "Die Kleidung", "Clothing"], ["A2", "Das Hemd", "Shirt"], ["A2", "Die Hose", "Trousers"],
    ["A2", "Die Schuhe", "Shoes"], ["A2", "Der Mantel", "Coat"], ["A2", "Die Tasche", "Bag"],
    ["A2", "Der Schlüssel", "Key"], ["A2", "Die Brille", "Glasses"], ["A2", "Die Uhr", "Watch / Clock"],
    ["A2", "Der Termin", "Appointment"], ["A2", "Vereinbaren", "To arrange / schedule"], ["A2", "Verschieben", "To postpone"],
    ["A2", "Absagen", "To cancel"], ["A2", "Die Einladung", "Invitation"], ["A2", "Das Geschenk", "Gift"],
    ["A2", "Feiern", "To celebrate"], ["A2", "Der Urlaub", "Vacation"], ["A2", "Die Reise", "Journey / Trip"],
    ["A2", "Der Koffer", "Suitcase"], ["A2", "Die Haltestelle", "Bus/Tram stop"], ["A2", "Umsteigen", "To transfer / change trains"],
    ["A2", "Einsteigen", "To board / get in"], ["A2", "Aussteigen", "To get off / exit"], ["A2", "Die Verspätung", "Delay"],
    ["A2", "Pünktlich", "Punctual / On time"], ["A2", "Der Nachbar", "Neighbor"], ["A2", "Die Miete", "Rent"],
    ["A2", "Der Vermieter", "Landlord"], ["A2", "Umziehen", "To move house"], ["A2", "Aufräumen", "To tidy up"],
    ["A2", "Putzen", "To clean"], ["A2", "Waschen", "To wash"], ["A2", "Kochen", "To cook"],
    ["A2", "Einkaufen", "To go shopping"], ["A2", "Der Supermarkt", "Supermarket"], ["A2", "Die Kasse", "Checkout / Cash register"],
    ["B1", "Die Bewerbung", "Job application"], ["B1", "Der Lebenslauf", "Resume / CV"], ["B1", "Das Vorstellungsgespräch", "Job interview"],
    ["B1", "Die Gehaltserhöhung", "Salary raise"], ["B1", "Die Kündigung", "Resignation / Termination"], ["B1", "Die Abteilung", "Department"],
    ["B1", "Der Kollege", "Colleague"], ["B1", "Die Besprechung", "Meeting"], ["B1", "Die Entscheidung", "Decision"],
    ["B1", "Die Lösung", "Solution"], ["B1", "Der Vorschlag", "Suggestion"], ["B1", "Die Meinung", "Opinion"],
    ["B1", "Zustimmen", "To agree"], ["B1", "Ablehnen", "To reject / decline"], ["B1", "Überzeugen", "To convince"],
    ["B1", "Erklären", "To explain"], ["B1", "Beschreiben", "To describe"], ["B1", "Vergleichen", "To compare"],
    ["B1", "Untersuchen", "To examine / investigate"], ["B1", "Entwickeln", "To develop"], ["B1", "Verbessern", "To improve"],
    ["B1", "Verändern", "To change"], ["B1", "Erreichen", "To achieve / reach"], ["B1", "Scheitern", "To fail"],
    ["B1", "Die Sicherheit", "Safety / Security"], ["B1", "Die Freiheit", "Freedom"], ["B1", "Die Gesundheit", "Health"],
    ["B1", "Die Ernährung", "Nutrition / Diet"], ["B1", "Die Bewegung", "Movement / Exercise"], ["B1", "Die Entspannung", "Relaxation"],
    ["B1", "Der Klimawandel", "Climate change"], ["B1", "Die Energie", "Energy"], ["B1", "Recyceln", "To recycle"],
    ["B1", "Der Müll", "Garbage / Waste"], ["B1", "Sparen", "To save (money/energy)"], ["B1", "Verschwenden", "To waste"],
    ["B2", "Die Globalisierung", "Globalization"], ["B2", "Die Wirtschaft", "Economy"], ["B2", "Der Wettbewerb", "Competition"],
    ["B2", "Die Innovation", "Innovation"], ["B2", "Die Forschung", "Research"], ["B2", "Die Wissenschaft", "Science"],
    ["B2", "Der Fortschritt", "Progress"], ["B2", "Die Gesellschaft", "Society"], ["B2", "Die Gerechtigkeit", "Justice"],
    ["B2", "Die Verantwortung", "Responsibility"], ["B2", "Die Zuverlässigkeit", "Reliability"], ["B2", "Die Geduld", "Patience"],
    ["B2", "Die Begeisterung", "Enthusiasm"], ["B2", "Die Enttäuschung", "Disappointment"], ["B2", "Der Kompromiss", "Compromise"],
    ["B2", "Die Auseinandersetzung", "Argument / Confrontation"], ["B2", "Gewährleisten", "To guarantee / ensure"], ["B2", "Beeinflussen", "To influence"],
    ["B2", "Behaupten", "To claim / assert"], ["B2", "Widersprechen", "To contradict"], ["B2", "Zusammenfassen", "To summarize"],
    ["B2", "Hinterfragen", "To question critically"], ["B2", "Umsetzen", "To implement"], ["B2", "Bewältigen", "To cope with / master"],
    ["B2", "Beitragen", "To contribute"], ["B2", "Verzichten auf", "To do without / forego"], ["B2", "Sich lohnen", "To be worthwhile"],
    ["B2", "Ausnahmsweise", "Exceptionally"], ["B2", "Allerdings", "However / Indeed"], ["B2", "Inzwischen", "Meanwhile"]
  ];

  const allMeanings = vocabPairs.map(v => v[2]);
  vocabPairs.forEach(([lvl, de, en]) => {
    const distractors = shuffleArray(allMeanings.filter(m => m !== en)).slice(0, 3);
    bank.push({
      id: nextId++,
      level: lvl,
      category: "vocab",
      german: de,
      q: `What is the English meaning of '${de}'?`,
      options: [en, ...distractors],
      ans: en
    });
  });

  const ones = ["", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
  const tens = ["", "zehn", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"];

  function toGermanNum(n) {
    if (n === 10) return "zehn";
    if (n === 11) return "elf";
    if (n === 12) return "zwölf";
    if (n === 16) return "sechzehn";
    if (n === 17) return "siebzehn";
    if (n < 20) return ones[n % 10] + "zehn";
    if (n < 100) {
      const u = n % 10;
      const t = Math.floor(n / 10);
      return u === 0 ? tens[t] : `${ones[u]}und${tens[t]}`;
    }
    const h = Math.floor(n / 100);
    const rem = n % 100;
    const hWord = (h === 1 ? "ein" : ones[h]) + "hundert";
    return rem === 0 ? hWord : hWord + toGermanNum(rem);
  }

  for (let n = 13; n <= 980; n += 7) {
    if (bank.length >= 430) break;
    const word = toGermanNum(n);
    const capWord = word.charAt(0).toUpperCase() + word.slice(1);
    const lvl = n < 100 ? "A1" : n < 500 ? "A2" : "B1";
    const fake1 = String(n + 9);
    const fake2 = String(Math.max(11, n - 11));
    const rev = String(n).split("").reverse().join("");
    const fake3 = rev === String(n) ? String(n + 20) : rev;
    bank.push({
      id: nextId++,
      level: lvl,
      category: "numbers",
      german: capWord,
      q: `Which number does '${capWord}' represent?`,
      options: [String(n), fake1, fake2, fake3],
      ans: String(n)
    });
  }

  const grammarDrills = [
    ["A1", "Ich ___ Student.", "bin", ["bin", "bist", "ist", "seid"]],
    ["A1", "Er ___ aus Deutschland.", "kommt", ["kommt", "komme", "kommst", "kommen"]],
    ["A1", "Wir ___ heute Deutsch.", "lernen", ["lernen", "lernt", "lerne", "lernst"]],
    ["A1", "___ du Kaffee oder Tee?", "Trinkst", ["Trinkst", "Trinke", "Trinkt", "Trinken"]],
    ["A1", "Das ist ___ Buch. (das Buch)", "ein", ["ein", "eine", "einen", "einer"]],
    ["A1", "Ich kaufe ___ Apfel. (der Apfel - Accusative)", "einen", ["einen", "ein", "eine", "einem"]],
    ["A1", "Sie hat ___ Katze. (die Katze)", "eine", ["eine", "ein", "einen", "einem"]],
    ["A1", "Ihr ___ sehr freundlich.", "seid", ["seid", "sind", "bist", "ist"]],
    ["A2", "Ich danke ___ für die Hilfe. (du - Dative)", "dir", ["dir", "dich", "du", "dein"]],
    ["A2", "Wir fahren nach ___ Arbeit nach Hause. (die Arbeit)", "der", ["der", "die", "den", "dem"]],
    ["A2", "Er hat gestern Fußball ___. (spielen)", "gespielt", ["gespielt", "spielen", "spielte", "spielt"]],
    ["A2", "Ich ___ gestern im Kino. (sein - Präteritum)", "war", ["war", "bin", "hatte", "wurde"]],
    ["A2", "Du ___ hier nicht rauchen! (Prohibition)", "darfst", ["darfst", "musst", "willst", "magst"]],
    ["A2", "Das Geschenk ist für ___ Vater. (der Vater - Accusative)", "den", ["den", "dem", "der", "des"]],
    ["A2", "Ich interessiere ___ für Musik.", "mich", ["mich", "mir", "mein", "ich"]],
    ["B1", "Ich warte ___ den Bus.", "auf", ["auf", "für", "über", "mit"]],
    ["B1", "Er träumt ___ einem neuen Auto.", "von", ["von", "über", "an", "auf"]],
    ["B1", "Das Auto ___ gestern repariert. (Passive Past)", "wurde", ["wurde", "wird", "worden", "war"]],
    ["B1", "Trotz ___ Regens gehen wir spazieren.", "des", ["des", "dem", "den", "der"]],
    ["B1", "Ich lerne Deutsch, ___ in Deutschland zu studieren.", "um", ["um", "damit", "weil", "obwohl"]],
    ["B2", "Anstatt ___ er lernt, spielt er Videospiele.", "dass", ["dass", "zu", "weil", "ob"]],
    ["B2", "Je schneller wir fahren, ___ früher kommen wir an.", "desto", ["desto", "als", "wie", "wenn"]],
    ["B2", "Das Buch, ___ Autor berühmt ist, verkauft sich gut.", "dessen", ["dessen", "deren", "dem", "den"]],
    ["B2", "Hätte ich das gewusst, ___ ich nicht gekommen.", "wäre", ["wäre", "würde", "hätte", "bin"]],
    ["B2", "Er besteht ___, den Vertrag sofort zu unterschreiben.", "darauf", ["darauf", "daran", "davon", "dafür"]]
  ];

  let gIdx = 0;
  while (bank.length < 500) {
    const [lvl, sentence, ans, opts] = grammarDrills[gIdx % grammarDrills.length];
    bank.push({
      id: nextId++,
      level: lvl,
      category: "grammar",
      german: sentence.replace("___", ans),
      q: `Choose the correct grammar option: "${sentence}"`,
      options: opts,
      ans: ans
    });
    gIdx++;
  }

  return bank.slice(0, 500);
}

/* ==================== 4. INITIALIZATION ==================== */
document.addEventListener("DOMContentLoaded", () => {
  allQuestions = build500QuestionBank();

  const nameInput = document.getElementById("playerName");
  if (wallet.playerName && nameInput) {
    nameInput.value = wallet.playerName;
  }

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

/* ==================== 5. NAVIGATION & SINGLE AUDIO CONTEXT ==================== */
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
    if (!sharedAudioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      sharedAudioCtx = new AudioCtx();
    }
    if (sharedAudioCtx.state === "suspended") {
      sharedAudioCtx.resume();
    }
    const osc = sharedAudioCtx.createOscillator();
    const gain = sharedAudioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.15, sharedAudioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, sharedAudioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(sharedAudioCtx.destination);
    osc.start();
    osc.stop(sharedAudioCtx.currentTime + duration);
  } catch (e) {}
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

/* ==================== 6. ROUND BUILDER & GAMEPLAY ==================== */
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

  let pool = filtered.filter(q => !wallet.solvedIds.includes(q.id));
  if (pool.length < 10) pool = filtered;
  if (pool.length === 0) pool = [...allQuestions];

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

function startGame() {
  const nameVal = document.getElementById("playerName").value.trim();
  wallet.playerName = nameVal || "Deutsch Player";
  saveWallet();

  roundQuestions = buildRoundQuestions();
  currentIdx = 0;
  currentStreak = 0;
  mistakes = [];
  isAnswerLocked = false;
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
  isAnswerLocked = false;
  document.getElementById("lockBar").classList.add("hidden");
  renderLadder();

  const qObj = roundQuestions[currentIdx];
  document.getElementById("qNumberTag").textContent = `Q ${currentIdx + 1} / 10`;
  document.getElementById("qLevelTag").textContent = qObj.level;
  document.getElementById("qCatTag").textContent = qObj.category.toUpperCase();
  document.getElementById("questionText").textContent = qObj.q;

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
      finishRound(false, "⏰ Time's Up!");
    }
  }, 1000);
}

function selectOption(btn, letter) {
  if (isAnswerLocked) return;
  document.querySelectorAll(".opt-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  selectedOption = btn.dataset.val;
  document.getElementById("selectedOptLabel").textContent = letter;
  document.getElementById("lockBar").classList.remove("hidden");
  playTone(380, "sine", 0.1);
}

function confirmLock() {
  if (!selectedOption || isAnswerLocked) return;
  isAnswerLocked = true;
  clearInterval(timerInterval);
  document.getElementById("lockBar").classList.add("hidden");

  const qObj = roundQuestions[currentIdx];
  const buttons = document.querySelectorAll(".opt-btn");
  buttons.forEach(b => (b.disabled = true));

  playTone(210, "sawtooth", 0.45);

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
        if (currentIdx >= 9) {
          finishRound(true, "🎉 CONGRATULATIONS! You Won 10/10!");
        } else {
          currentIdx++;
          loadQuestion();
        }
      }, 1000);
    } else {
      playTone(135, "sawtooth", 0.55);
      mistakes.push({ q: qObj.q, your: selectedOption, right: qObj.ans });
      setTimeout(() => {
        finishRound(false, "❌ Wrong Answer!");
      }, 1200);
    }
  }, 850);
}

/* ==================== 7. LIFELINES ==================== */
function use5050() {
  if (lifelines.fifty || isAnswerLocked) return;
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
  if (lifelines.poll || isAnswerLocked) return;
  lifelines.poll = true;
  document.getElementById("ll-poll").disabled = true;
  playTone(540, "sine", 0.2);

  const correctAns = roundQuestions[currentIdx].ans;
  const visibleBtns = [...document.querySelectorAll(".opt-btn")];
  const rightPct = Math.floor(Math.random() * 21) + 58;
  let remaining = 100 - rightPct;

  const wrongIndices = visibleBtns
    .map((b, idx) => (b.dataset.val !== correctAns ? idx : -1))
    .filter(idx => idx !== -1);

  const weights = wrongIndices.map(() => Math.random());
  const weightSum = weights.reduce((a, b) => a + b, 0) || 1;
  const wrongPcts = weights.map((w, i) =>
    i === weights.length - 1 ? remaining : Math.round((w / weightSum) * (100 - rightPct))
  );

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
  if (lifelines.flip || isAnswerLocked) return;
  lifelines.flip = true;
  document.getElementById("ll-flip").disabled = true;
  playTone(600, "triangle", 0.25);

  const currentQ = roundQuestions[currentIdx];
  const usedIds = new Set(roundQuestions.map(q => q.id));

  let replacement =
    allQuestions.find(q => q.level === currentQ.level && !usedIds.has(q.id)) ||
    allQuestions.find(q => !usedIds.has(q.id));

  if (replacement) {
    roundQuestions[currentIdx] = replacement;
    loadQuestion();
  }
}

/* ==================== 8. QUIT & RESULT ==================== */
function quitGame() {
  clearInterval(timerInterval);
  const wonPts = currentIdx > 0 ? LADDER[currentIdx - 1].pts : 0;
  creditAndShowResult("🚪 You Walked Away", wonPts, currentIdx);
}

function finishRound(wonAll, title) {
  let wonPts = 0;
  const answeredCount = wonAll ? 10 : currentIdx;

  if (wonAll) {
    wonPts = LADDER[9].pts;
  } else {
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
  saveWallet();
  updateTopWallet();

  syncScoreToGoogleSheet(wallet.playerName, wonPts, wallet.totalPoints, answeredCount);

  document.getElementById("resultTitle").textContent = title;
  document.getElementById("playerResultName").textContent = `Player: ${wallet.playerName}`;
  document.getElementById("earnedPoints").textContent = wonPts.toLocaleString();
  document.getElementById("resultSummary").textContent = `You cleared ${answeredCount} / 10 Questions`;

  const mBox = document.getElementById("mistakeBox");
  if (mistakes.length > 0) {
    mBox.innerHTML =
      `<h4>📌 Mistake Review:</h4>` +
      mistakes
        .map(
          m => `
        <div class="mistake-item">
          <strong>${escapeHtml(m.q)}</strong><br />
          Your Answer: <span style="color:#f87171">${escapeHtml(m.your)}</span> |
          Correct Answer: <span style="color:#10b981"><strong>${escapeHtml(m.right)}</strong></span>
        </div>
      `
        )
        .join("");
  } else {
    mBox.innerHTML = `<p style="color:#10b981; text-align:center; font-weight:700;">🌟 Flawless Round! Zero Mistakes!</p>`;
  }

  navigateTo("resultScreen");
}

/* ==================== 9. WALLET & BADGES ==================== */
function saveWallet() {
  localStorage.setItem("kbc_deutsch_wallet", JSON.stringify(wallet));
}

function getRank(pts) {
  if (pts >= 100000) return "Kaiser (100k+)";
  if (pts >= 25000) return "Sprachmeister";
  if (pts >= 5000) return "Advanced";
  return "Beginner";
}

function updateTopWallet() {
  document.getElementById("walletCoins").textContent = wallet.totalPoints.toLocaleString();
  document.getElementById("userRank").textContent = getRank(wallet.totalPoints);
}

function openWallet() {
  document.getElementById("statTotalPts").textContent = wallet.totalPoints.toLocaleString();
  document.getElementById("statSolved").textContent = `${wallet.solvedIds.length} / ${allQuestions.length}`;
  document.getElementById("statStreak").textContent = `${wallet.bestStreak} 🔥`;

  const milestones = [
    { name: "🥉 First Milestone", req: 500, desc: "Collect 500 Pts" },
    { name: "🥈 Number Ninja", req: 5000, desc: "Collect 5,000 Pts" },
    { name: "🥇 Grammar Guru", req: 25000, desc: "Collect 25,000 Pts" },
    { name: "👑 Deutsch Kaiser", req: 100000, desc: "Collect 100,000 Pts" }
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

/* ==================== 10. LEADERBOARD & SYNC ==================== */
function syncScoreToGoogleSheet(name, roundPts, totalPts, solved) {
  if (!GOOGLE_SCRIPT_URL) return;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("roundPoints", roundPts);
  formData.append("totalPoints", totalPts);
  formData.append("solved", solved);

  fetch(GOOGLE_SCRIPT_URL, { method: "POST", body: formData }).catch(() => {});
}

function openLeaderboard() {
  navigateTo("leaderboardScreen");
  const container = document.getElementById("leaderboardList");
  container.innerHTML = `<p class="loading-text">Loading rankings...</p>`;

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
    { name: wallet.playerName || "You", points: wallet.totalPoints },
    { name: "Lukas M.", points: 18500 },
    { name: "Sofia K.", points: 12000 },
    { name: "Jonas W.", points: 5500 },
    { name: "Emma R.", points: 2500 }
  ].sort((a, b) => b.points - a.points);

  renderLeaderboardRows(fallbackList);
}

function renderLeaderboardRows(rows) {
  const container = document.getElementById("leaderboardList");
  container.innerHTML = rows
    .map(
      (r, idx) => `
      <div class="lb-row ${idx === 0 ? "top-1" : ""}">
        <span><strong>#${idx + 1}</strong> &nbsp; ${escapeHtml(r.name || "Player")}</span>
        <span style="color: var(--gold-bright); font-weight: 800;">
          ${Number(r.points || r.totalPoints || 0).toLocaleString()} 🪙
        </span>
      </div>
    `
    )
    .join("");
}

/* ==================== 11. UNTIMED FLASHCARDS ==================== */
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

/* ==================== 12. HTML ESCAPE HELPER ==================== */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
