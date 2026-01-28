let total = 0;
let history = [];

const totalDisplay = document.getElementById("total");
const rakeDisplay = document.getElementById("rake");

/* Coin clink sound */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function coinSound(freq) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const noise = audioCtx.createBufferSource();

  const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.05, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  noise.buffer = buffer;

  osc.type = "triangle";
  osc.frequency.value = freq;
  gain.gain.value = 0.08;

  osc.connect(gain);
  noise.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  noise.start();
  osc.stop(audioCtx.currentTime + 0.12);
  noise.stop(audioCtx.currentTime + 0.05);
}

const notes = {
  5: 400,
  10: 450,
  15: 500,
  20: 550,
  25: 600,
  50: 700,
  100: 850
};

function updateDisplay() {
  totalDisplay.innerText = total;
  rakeDisplay.innerText = (total * 0.10).toFixed(1);
}

document.querySelectorAll(".chip").forEach(btn => {
  btn.addEventListener("click", () => {
    const value = Number(btn.dataset.value);
    coinSound(notes[value]);
    total += value;
    history.push(value);
    updateDisplay();
  });
});

document.getElementById("clear").addEventListener("click", () => {
  coinSound(250);
  total = 0;
  history = [];
  updateDisplay();
});

document.getElementById("back").addEventListener("click", () => {
  coinSound(320);
  if (history.length) {
    total -= history.pop();
    updateDisplay();
  }
});
