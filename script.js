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

function startPosition(e) {
    if (erasing) {
        context.globalCompositeOperation = 'destination-out'; // Χρησιμοποιεί τη λειτουργία destination-out για σβήσιμο
    } else {
        context.globalCompositeOperation = 'source-over'; // Χρησιμοποιεί τη λειτουργία source-over για σχεδίαση
    }

    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    context.beginPath();
}

function draw(e) {
    if (!painting) return;

    context.lineWidth = document.getElementById('brush-size').value;
    context.lineCap = 'round';
    context.strokeStyle = erasing ? '#FFFFFF' : document.getElementById('brush-color').value;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
}

function startDrawingTouch(e) {
    e.preventDefault();
    drawing = true;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    lastX = touch.clientX - rect.left;
    lastY = touch.clientY - rect.top;
}

function drawTouch(e) {
    e.preventDefault();
    if (!drawing) return;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    [lastX, lastY] = [x, y];
}

canvas.addEventListener('touchstart', startDrawingTouch, { passive: false });
canvas.addEventListener('touchmove', drawTouch, { passive: false });
canvas.addEventListener('touchend', stopDrawing);

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

// Προσθήκη λειτουργικότητας για το κουμπί καθαρισμού
const clearButton = document.getElementById('clear-button');

clearButton.addEventListener('click', function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(backgroundImage, 0, 0);
});

// Προσθήκη λειτουργικότητας για το toggle κουμπί σβήσιμου
const eraseToggle = document.getElementById('erase-toggle');

eraseToggle.addEventListener('change', function() {
    erasing = eraseToggle.checked;
});