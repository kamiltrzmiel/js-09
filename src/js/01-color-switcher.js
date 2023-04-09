const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let colorIntervalId;

function getHexRandomColor() {
  const randomNum = Math.floor(Math.random() * 16777215);
  const hexString = randomNum.toString(16).padStart(6, '0');
  return '#' + hexString;
}
//START COLOR SWITCHER
function startCS() {
  colorIntervalId = setInterval(() => {
    document.body.style.backgroundColor = getHexRandomColor();
  }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}
//STOP COLOR SWITCHER
function stopCS() {
  clearInterval(colorIntervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

startBtn.addEventListener('click', startCS);
stopBtn.addEventListener('click', stopCS);
