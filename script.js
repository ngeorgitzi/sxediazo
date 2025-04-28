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
let drawing = false;
let lastX = 0;
let lastY = 0;

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

// --- Touch events για κινητά ---

canvas.addEventListener('touchstart', function(e) {
    e.preventDefault(); // Σταματάει το scroll όταν ζωγραφίζουμε
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    lastX = touch.clientX - rect.left;
    lastY = touch.clientY - rect.top;
    drawing = true;
}, { passive: false });

canvas.addEventListener('touchmove', function(e) {
    e.preventDefault(); // Σταματάει το scroll όταν ζωγραφίζουμε
    if (!drawing) return;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    draw(x, y);
}, { passive: false });

canvas.addEventListener('touchend', function(e) {
    drawing = false;
});

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



// --- Touch Events Support ---
canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener('touchmove', function(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener('touchend', function(e) {
    e.preventDefault();
    const mouseEvent = new MouseEvent('mouseup', {});
    canvas.dispatchEvent(mouseEvent);
}, false);
// --- End of Touch Events Support ---

