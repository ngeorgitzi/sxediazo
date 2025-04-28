const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let painting = false;
let backgroundImage = new Image();

// Χρώμα και πάχος γραμμής
let currentColor = '#000000';
let currentLineWidth = 5;

// Επιλογή χρώματος και πάχους
const colorPicker = document.getElementById('colorPicker');
const lineWidthPicker = document.getElementById('lineWidthPicker');

colorPicker.addEventListener('change', (e) => {
    currentColor = e.target.value;
});

lineWidthPicker.addEventListener('change', (e) => {
    currentLineWidth = e.target.value;
});

// Φόρτωση της εικόνας στο καμβά
backgroundImage.src = 'page.png';
backgroundImage.onload = function() {
    canvas.width = backgroundImage.width;
    canvas.height = backgroundImage.height;
    ctx.drawImage(backgroundImage, 0, 0);
};

// Ξεκινάμε ζωγραφική
function startPosition(e) {
    e.preventDefault();
    painting = true;
    draw(e);
}

// Τελειώνουμε ζωγραφική
function endPosition(e) {
    e.preventDefault();
    painting = false;
    ctx.beginPath();
}

// Σχεδιάζουμε
function draw(e) {
    if (!painting) return;

    e.preventDefault();

    let x, y;
    if (e.type.startsWith('mouse')) {
        x = e.clientX - canvas.getBoundingClientRect().left;
        y = e.clientY - canvas.getBoundingClientRect().top;
    } else if (e.type.startsWith('touch')) {
        x = e.touches[0].clientX - canvas.getBoundingClientRect().left;
        y = e.touches[0].clientY - canvas.getBoundingClientRect().top;
    }

    ctx.lineWidth = currentLineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Mouse Events
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

// Touch Events
canvas.addEventListener('touchstart', startPosition);
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', draw);
