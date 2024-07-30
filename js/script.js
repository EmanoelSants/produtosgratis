//Timer

document.addEventListener('DOMContentLoaded', startTimer);

let timerInterval;
let progressInterval;
const initialMinutes = 10; // Minutos

function startTimer() {
  clearInterval(timerInterval);
  clearInterval(progressInterval);

  let timeInSeconds = initialMinutes * 60;
  const totalSeconds = timeInSeconds;
  const timerElement = document.getElementById('timer');
  const progressElement = document.getElementById('progress');
  progressElement.style.width = '100%';

  timerInterval = setInterval(() => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (timeInSeconds > 0) {
      timeInSeconds -= 1;
    } else {
      clearInterval(timerInterval);
      clearInterval(progressInterval);
      window.location.href = 'index.html'; // Redireciona para a página principal
    }
  }, 1000);

  progressInterval = setInterval(() => {
    const currentProgress = (timeInSeconds / totalSeconds) * 100;
    progressElement.style.width = currentProgress + '%';
  }, 1000);
}