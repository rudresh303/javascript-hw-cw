// script.js
const keyDisplay = document.getElementById('keyPressed');
const codeDisplay = document.getElementById('keyCode');
const comboDisplay = document.getElementById('comboKeys');
const keyHistoryList = document.getElementById('keyHistoryList');
const keypressSound = document.getElementById('keypressSound');
let pressedKeys = [];

document.addEventListener('keydown', function(event) {
  // Update displayed key and key code
  keyDisplay.textContent = event.key;
  codeDisplay.textContent = event.keyCode;
  
  // Detect combination keys and update display
  const comboKeys = [];
  if (event.ctrlKey) comboKeys.push('Ctrl');
  if (event.shiftKey) comboKeys.push('Shift');
  if (event.altKey) comboKeys.push('Alt');
  comboKeys.push(event.key);

  // Display key combination if multiple keys are pressed
  const comboText = comboKeys.length > 1 ? comboKeys.join(' + ') : event.key;
  comboDisplay.textContent = comboText;

  // Play sound on key press
  keypressSound.currentTime = 0; // Reset sound to start
  keypressSound.play();

  // Store key in history
  const historyItem = `${comboText} (Code: ${event.keyCode})`;
  pressedKeys.push(historyItem);
  
  // Display history (limit to last 10 keys)
  const historyHTML = pressedKeys.slice(-10).map(key => `<li>${key}</li>`).join('');
  keyHistoryList.innerHTML = historyHTML;
});
