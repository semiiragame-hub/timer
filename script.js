const DEFAULT_MINUTES = 5;
const AUTO_START = true;

const timerEl = document.getElementById("timer");
let remainingSeconds = DEFAULT_MINUTES * 60;
let timerId = null;

const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const render = () => {
  timerEl.textContent = formatTime(remainingSeconds);
};

const tick = () => {
  remainingSeconds = Math.max(0, remainingSeconds - 1);
  render();

  if (remainingSeconds === 0 && timerId) {
    clearInterval(timerId);
    timerId = null;
  }
};

const startTimer = () => {
  if (timerId) return;
  render();
  timerId = setInterval(tick, 1000);
};

window.timerControls = {
  reset: (minutes = DEFAULT_MINUTES) => {
    remainingSeconds = Math.max(0, Math.round(minutes * 60));
    render();
  },
  start: startTimer,
  stop: () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  },
};

render();
if (AUTO_START) {
  startTimer();
}
