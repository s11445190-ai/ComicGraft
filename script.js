document.addEventListener('DOMContentLoaded', () => {
  const comicCanvas = document.getElementById('comic-canvas');
  const addPanelBtn = document.getElementById('add-panel-btn');
  const addTextBtn = document.getElementById('add-text-btn');
  const exportBtn = document.getElementById('export-btn');

  let panelCount = 4; // Initial panels matching CSS grid layout

  // Render initial panels
  function initPanels() {
    for (let i = 1; i <= panelCount; i++) {
      createPanel(i);
    }
  }

  // Create a comic panel
  function createPanel(index) {
    const panel = document.createElement('div');
    panel.className = 'comic-panel';
    panel.style.cssText = `
      border: 2px solid #000;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    `;
    panel.innerHTML = `<span style="color: #aaa; font-size: 0.9rem;">Panel ${index}</span>`;
    comicCanvas.appendChild(panel);
  }

  // Add new panel dynamically
  addPanelBtn.addEventListener('click', () => {
    panelCount++;
    createPanel(panelCount);
  });

  // Add draggable speech bubble
  addTextBtn.addEventListener('click', () => {
    const bubble = document.createElement('div');
    bubble.className = 'speech-bubble';
    bubble.contentEditable = 'true';
    bubble.innerText = 'Click to edit text...';
    bubble.style.cssText = `
      position: absolute;
      top: 50px;
      left: 50px;
      background: #fff;
      border: 2px solid #000;
      border-radius: 15px;
      padding: 8px 12px;
      font-size: 0.85rem;
      cursor: move;
      z-index: 10;
      box-shadow: 2px 2px 0px #000;
      max-width: 150px;
      text-align: center;
    `;

    // Simple Dragging Logic
    let isDragging = false;
    let offsetX, offsetY;

    bubble.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - bubble.getBoundingClientRect().left;
      offsetY = e.clientY - bubble.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const canvasRect = comicCanvas.getBoundingClientRect();
      let x = e.clientX - canvasRect.left - offsetX;
      let y = e.clientY - canvasRect.top - offsetY;

      bubble.style.left = `${x}px`;
      bubble.style.top = `${y}px`;
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    comicCanvas.appendChild(bubble);
  });

  // Export placeholder action
  exportBtn.addEventListener('click', () => {
    alert('Exporting comic page functionality ready for integration!');
  });

  initPanels();
});
