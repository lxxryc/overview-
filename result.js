
<script>
/* ================= TAB SWITCHING ================= */
const tabBtns = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.section');
tabBtns.forEach(btn => btn.onclick = () => {
  tabBtns.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  sections.forEach(s=>s.classList.remove('active'));
  document.querySelector('#tab-'+btn.dataset.tab).classList.add('active');
});

/* ================= WINNERS LIST ================= */
const winnersData=[
  {name:"GAB", prize:"$60.00", facebook:"https://web.facebook.com/thisisnotgab", date:"October 19, 2025"},

];
const winnersList=document.getElementById('winnersList');
winnersData.forEach(w=>{
  const el=document.createElement('div');
  el.className='winner-item';
  el.innerHTML=`<div class="avatar">${w.name[0]}</div>
                  <div>
                    <div class="winner-name"><a href="${w.facebook}" target="_blank">${w.name}</a></div>
                    <div class="winner-prize">${w.prize}</div>
                    <div class="winner-date">${w.date}</div>
                  </div>`;
  winnersList.appendChild(el);
});

const settingsToggle = document.getElementById('settingsToggle');
const settingsPanel = document.getElementById('settingsPanel');
const darkModeBtn = document.getElementById('darkModeBtn');

let isDragging = false, dragMoved = false, startY = 0, startTop = 0;

/* DRAG LOGIC (unchanged, optional) */
function startDrag(y) {
  isDragging = true; dragMoved = false; startY = y;
  startTop = parseInt(window.getComputedStyle(settingsToggle).top) || window.innerHeight*0.5;
  settingsToggle.style.transition = 'none';
  settingsPanel.style.transition = 'none';
}

function doDrag(y) {
  if(!isDragging) return;
  const delta = y - startY;
  if(Math.abs(delta) > 3) dragMoved = true;
  let newTop = startTop + delta;
  newTop = Math.max(20, Math.min(window.innerHeight - 60, newTop));
  settingsToggle.style.top = newTop + 'px';
  settingsPanel.style.top = newTop + 'px';
}

function stopDrag() {
  isDragging = false;
  setTimeout(() => dragMoved = false, 120);
  settingsToggle.style.cursor = 'grab';
  settingsToggle.style.transition = 'top 0.2s';
  settingsPanel.style.transition = 'top 0.2s';
}

settingsToggle.addEventListener('mousedown', e => { 
  if(e.button !== 0) return; 
  startDrag(e.clientY); 
  settingsToggle.style.cursor = 'grabbing';
});
document.addEventListener('mousemove', e => doDrag(e.clientY));
document.addEventListener('mouseup', stopDrag);

settingsToggle.addEventListener('touchstart', e => startDrag(e.touches[0].clientY), {passive:true});
settingsToggle.addEventListener('touchmove', e => { if(isDragging){ e.preventDefault(); doDrag(e.touches[0].clientY); }}, {passive:false});
settingsToggle.addEventListener('touchend', stopDrag);

/* ================= CLICK GEAR TO TOGGLE PANEL ================= */
settingsToggle.addEventListener('click', e => {
  e.stopPropagation();
  if(dragMoved) return; // ignore drag clicks
  settingsPanel.classList.toggle('open'); // just toggle visibility
});

/* ================= CLICK OUTSIDE TO HIDE PANEL ================= */
document.addEventListener('click', e => {
  if(dragMoved) return;
  if(settingsPanel.classList.contains('open') && !settingsPanel.contains(e.target) && !settingsToggle.contains(e.target)) {
    settingsPanel.classList.remove('open'); // hide panel
  }
});

/* ================= DARK MODE ================= */
(function initDarkMode(){
  const saved = localStorage.getItem('darkMode');
  if(saved === 'enabled') document.body.classList.add('dark-mode');
  else document.body.classList.remove('dark-mode');

  if(darkModeBtn){
    darkModeBtn.addEventListener('click', e => {
      e.stopPropagation();
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    });
  }
})();

// ================= RELIABLE ZOOM FEATURE =================
(function initZoom() {
  const html = document.documentElement;

  // Create Zoom Controls
  const zoomControls = document.createElement('div');
  zoomControls.style.margin = '8px 0';
  zoomControls.innerHTML = `
    <strong>Zoom:</strong>
    <button id="zoomIn">+</button>
    <span id="zoomValue">100%</span>
    <strong><button id="zoomOut">-</button></strong>
    
  `;
  settingsPanel.appendChild(zoomControls);

  let zoomLevel = 60; // 100% default
  const zoomStep = 10; // 10% per click
  const minZoom = 60;  // 60%
  const maxZoom = 150; // 150%
  const zoomValueEl = document.getElementById('zoomValue');
  const zoomInBtn = document.getElementById('zoomIn');
  const zoomOutBtn = document.getElementById('zoomOut');

  function updateZoom() {
    html.style.fontSize = zoomLevel + '%';
    zoomValueEl.textContent = zoomLevel + '%';
  }

  zoomInBtn.addEventListener('click', () => {
    zoomLevel = Math.min(maxZoom, zoomLevel + zoomStep);
    updateZoom();
  });

  zoomOutBtn.addEventListener('click', () => {
    zoomLevel = Math.max(minZoom, zoomLevel - zoomStep);
    updateZoom();
  });

  // Initialize
  updateZoom();
})();

// ================= PHILIPPINE STANDARD TIME WIDGET =================
(function initPHTime() {
  const phTimeEl = document.getElementById('phTime');

  function updatePHTime() {
    const now = new Date();

    // Convert local time to UTC, then add 8 hours for Philippines (UTC+8)
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const phTime = new Date(utc + 8 * 3600000);

    // Format hours, minutes, seconds
    const h = String(phTime.getHours()).padStart(2, '0');
    const m = String(phTime.getMinutes()).padStart(2, '0');
    const s = String(phTime.getSeconds()).padStart(2, '0');

    phTimeEl.textContent = `${h}:${m}:${s}`;
  }

  updatePHTime(); // initial call
  setInterval(updatePHTime, 1000); // update every second
})();


</script>
