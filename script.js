const canvas = document.getElementById('drawing-canvas');
const context = canvas.getContext('2d');

const backgroundImage = new Image();
backgroundImage.src = 'page.png';

backgroundImage.onload = function() {
    canvas.width = backgroundImage.width;
    canvas.height = backgroundImage.height;

    context.drawImage(backgroundImage, 0, 0);
};

let painting = false;
let erasing = false;

// Ρύθμιση πινέλου
ctx.strokeStyle = colorPicker.value;
ctx.lineWidth = sizePicker.value;
ctx.lineCap = 'round';

// Ενημέρωση χρώματος και μεγέθους
colorPicker.addEventListener('input', function() {
  ctx.strokeStyle = this.value;
});

sizePicker.addEventListener('input', function() {
  ctx.lineWidth = this.value;
});

// Ποντίκι
canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;
  drawLine(e.offsetX, e.offsetY);
});

canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseout', () => drawing = false);

// Touch (για κινητά)
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  drawing = true;
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  [lastX, lastY] = [touch.clientX - rect.left, touch.clientY - rect.top];
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  if (!drawing) return;
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  drawLine(x, y);
}, { passive: false });

canvas.addEventListener('touchend', () => drawing = false);

function drawLine(x, y) {
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  [lastX, lastY] = [x, y];
}

// Καθαρισμός Καμβά
clearButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Αποθήκευση ως Εικόνα
saveButton.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'zografia.png';
  link.href = canvas.toDataURL();
  link.click();
});
