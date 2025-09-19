function showImage() {
    document.getElementById('myArt').style.display = 'block';
}

// ========== Interactive Drawing Canvas =================
const canvas = document.getElementById('drawArea');
const ctx = canvas.getContext('2d')
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');

let painting = false;

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function downloadArt() {
    const link = document.createElement('a');
    link.download = 'my-drawing.png';
    link.href = canvas.toDataURL();
    link.click();
}

colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.valuel
});

brushSize.addEventListener('input', (e) => {
    ctx.lineWidth = e.target.value;
});

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition)
canvas.addEventListener('mosemove', draw);


