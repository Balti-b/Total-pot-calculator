let total = 0;
let history = [];
let historyTotals = [];

const totalDisplay = document.getElementById("total");
const rakeDisplay = document.getElementById("rake");
const historyList = document.getElementById("historyList");

/* Sound */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function coinSound(freq) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "triangle";
  osc.frequency.value = freq;
  gain.gain.value = 0.07;
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
}

const notes = { 5:400, 10:450, 15:500, 20:550, 25:600, 50:700, 100:850 };

function updateDisplay() {
  totalDisplay.innerText = total;
  rakeDisplay.innerText = (total * 0.10).toFixed(1);
}

function updateHistory() {
  historyList.innerHTML = "";
  historyTotals.slice(-5).reverse().forEach(val => {
    const li = document.createElement("li");
    li.innerText = val;
    historyList.appendChild(li);
  });
}

/* CHIP INPUT */
document.querySelectorAll(".chip").forEach(btn => {
  btn.addEventListener("click", () => {
    const value = Number(btn.dataset.value);
    coinSound(notes[value]);
    total += value;
    history.push(value);
    updateDisplay();
  });
});

/* CLEAR */
document.getElementById("clear").addEventListener("click", () => {
  if (total > 0) {
    historyTotals.push(total);
    updateHistory();
  }
  coinSound(250);
  total = 0;
  history = [];
  updateDisplay();
});

/* BACK */
document.getElementById("back").addEventListener("click", () => {
  if (history.length) {
    coinSound(320);
    total -= history.pop();
    updateDisplay();
  }
});
