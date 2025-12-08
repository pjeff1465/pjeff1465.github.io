window.onload = function () {

    function showImage() {
        document.getElementById('myArt').style.display = 'block';
    }

    window.canvas = document.getElementById('drawArea');
    window.ctx = canvas.getContext('2d');

    const colorPicker = document.getElementById('colorPicker');
    const brushSize   = document.getElementById('brushSize');

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

        ctx.lineCap = 'round';

        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;

        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    window.downloadArt = function () {
        const link = document.createElement('a');
        link.download = 'my-drawing.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    colorPicker.addEventListener('change', (e) => {
        ctx.strokeStyle = e.target.value;
    });

    brushSize.addEventListener('input', (e) => {
        ctx.lineWidth = e.target.value;
    });

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
};
