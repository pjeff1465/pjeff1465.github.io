// ================= Global Functions =================

// Open tabs on Research page
function openTab(name) {
    document.querySelectorAll('.tabcontent').forEach(div => div.style.display = 'none');
    const tab = document.getElementById(name);
    if (tab) tab.style.display = 'block';
}
  
// Open default tab
window.addEventListener('load', () => openTab());

const frames = [
    '/images/butterfly/butterfly1.png',
    '/images/butterfly/butterfly2.png',
    '/images/butterfly/butterfly3.png',
    '/images/butterfly/butterfly4.png'      
];
  
let currentFrame = 0;
const butterfly = document.getElementById('butterfly');

setInterval(() => {
    currentFrame = (currentFrame + 1) % frames.length; // cycles through pngs
    butterfly.src = frames[currentFrame];
}, 150); // change butterfly photo every 150 milliseconds (.15 s)

  // ================= PDF SLIDESHOW (About Me Page) =================
  window.addEventListener("load", () => {
      const pdfCanvas = document.getElementById('pdf-render');
      if (!pdfCanvas) return; // Only run on About Me page
  
      const ctx = pdfCanvas.getContext('2d');
      const url = '/images/final_portfolio_JeffriesP_art1120.pdf';
  
      let pdfDoc = null;
      let pageNum = 1;
  
      pdfjsLib.getDocument(url).promise.then(doc => {
          pdfDoc = doc;
          document.getElementById('page-count').textContent = pdfDoc.numPages;
          renderPage(pageNum);
      });
  
      function renderPage(num) {
          pdfDoc.getPage(num).then(page => {
              const viewport = page.getViewport({ scale: 1.5 });
  
              pdfCanvas.height = viewport.height;
              pdfCanvas.width = viewport.width;
  
              const renderCtx = { canvasContext: ctx, viewport: viewport };
              page.render(renderCtx);
  
              document.getElementById('page-num').textContent = num;
          });
      }
  
      window.prevPage = function () {
          if (pageNum <= 1) return;
          pageNum--;
          renderPage(pageNum);
      };
  
      window.nextPage = function () {
          if (pageNum >= pdfDoc.numPages) return;
          pageNum++;
          renderPage(pageNum);
      };
  });
  
  // ================= Drawing Canvas =================
  window.addEventListener("load", () => {
      const drawCanvas = document.getElementById('drawArea');
      if (!drawCanvas) return; // Only run on drawing page
  
      const ctx = drawCanvas.getContext('2d');
      const colorPicker = document.getElementById('colorPicker');
      const brushSize = document.getElementById('brushSize');
  
      let painting = false;
  
      function startPosition(e) { painting = true; draw(e); }
      function endPosition() { painting = false; ctx.beginPath(); }
      function draw(e) {
          if (!painting) return;
          ctx.lineCap = 'round';
          ctx.strokeStyle = colorPicker.value;
          ctx.lineWidth = brushSize.value;
  
          const rect = drawCanvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
  
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x, y);
      }
  
      window.downloadArt = function () {
          const link = document.createElement('a');
          link.download = 'my-drawing.png';
          link.href = drawCanvas.toDataURL();
          link.click();
      };
  
      window.clearCanvas = function () {
          ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
      };
  
      drawCanvas.addEventListener('mousedown', startPosition);
      drawCanvas.addEventListener('mouseup', endPosition);
      drawCanvas.addEventListener('mousemove', draw);
      drawCanvas.addEventListener('mouseleave', endPosition);
  });
  