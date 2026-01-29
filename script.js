let total = 0;
let stack = [];
let historyTotals = [];

const totalDisplay = document.getElementById("total");
const rakeDisplay = document.getElementById("rake");
const historyList = document.getElementById("historyList");

/* Sound */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function coin(freq) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "triangle";
  osc.frequency.value = freq;
  gain.gain.value = 0.06;
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
}

/* Updated notes (added 1) */
const notes = {
  1: 300,
  5: 380,
  10: 450,
  20: 550,
  25: 600,
  50: 700,
  100: 850
};

function updateDisplay() {
  totalDisplay.innerText = total;
  rakeDisplay.innerText = (total * 0.10).toFixed(1);
}

function updateHistory() {
  historyList.innerHTML = "";
  historyTotals.slice(-5).reverse().forEach(val => {
    const li = document.createElement("li");
    li.textContent = val;
    historyList.appendChild(li);
  });
}

/* Chip buttons */
document.querySelectorAll(".chip").forEach(btn => {
  btn.addEventListener("click", () => {
    const value = Number(btn.dataset.value);
    coin(notes[value]);
    total += value;
    stack.push(value);
    updateDisplay();
  });
});

/* AC */
document.getElementById("clear").addEventListener("click", () => {
  if (total > 0) {
    historyTotals.push(total);
    updateHistory();
  }
  coin(200);
  total = 0;
  stack = [];
  updateDisplay();
});

/* Back */
document.getElementById("back").addEventListener("click", () => {
  if (stack.length) {
    coin(320);
    total -= stack.pop();
    updateDisplay();
  }
});
