// Titles to cycle
const TITLES = [
  "Marketing Analyst",
  "Data Storyteller",
  "Researcher"
];

// Durations (ms)
const TYPE_MS = 1800;   // must match CSS typing duration
const HOLD_MS = 900;    // time to hold after typing before erasing
const ERASE_MS = 700;   // erase duration

function setChars(el, text) {
  el.style.setProperty("--n", String(text.length));
  el.textContent = text;
}

function restartTyping(el) {
  // toggle .run to restart CSS animation
  el.classList.remove("run");
  void el.offsetWidth; // reflow
  el.classList.add("run");
}

function typeOnce(el, text) {
  setChars(el, text);
  restartTyping(el);
  return new Promise(resolve => setTimeout(resolve, TYPE_MS + HOLD_MS));
}

function erase(el) {
  // manual erase so timing is smooth on any length
  return new Promise(resolve => {
    const txt = el.textContent || "";
    const step = Math.max(1, Math.ceil(txt.length / (ERASE_MS / 30)));
    let s = txt;
    const t = setInterval(() => {
      s = s.slice(0, Math.max(0, s.length - step));
      el.textContent = s;
      el.style.setProperty("--n", String(s.length));
      if (s.length === 0) { clearInterval(t); resolve(); }
    }, 30);
  });
}

async function runCycle() {
  const el = document.getElementById("typing");
  if (!el) return;
  let i = 0;
  // initial state
  el.classList.add("typing-text");
  while (true) {
    const text = TITLES[i % TITLES.length];
    await typeOnce(el, text);
    await erase(el);
    i++;
  }
}

document.addEventListener("DOMContentLoaded", runCycle);
