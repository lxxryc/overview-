const bgVideo = document.getElementById('bgVideo');
const bgImage = document.getElementById('bgImage');
bgVideo.onerror = () => { bgVideo.style.display = 'none'; bgImage.style.display = 'block'; };

const winners = [
  { name: "Gab", prize: "₱60", facebook: "https://web.facebook.com/thisisnotgab", date: "October 19, 2025" },
 


  
];

const winnersList = document.getElementById('winnersList');
winners.forEach(w => {
  const card = document.createElement('div');
  card.className = 'winner-card';
  card.innerHTML = `
    <a href="${w.facebook}" target="_blank" class="winner-name">${w.name}</a>
    <span class="winner-prize">${w.prize}</span>
    <span class="winner-date">${w.date}</span>
  `;
  winnersList.appendChild(card);
});

const proofs = [
  { images: ["https://img.eselt.de/img/18689998_aCLnGfSwdS7hsq0o/ad.jpg", "https://img.eselt.de/img/18693492_f0qGrchfhEgdBjzc/ad.jpg"], date: "October 19, 2025" },

];

const proofList = document.getElementById('proofList');

proofs.forEach(p => {
  const card = document.createElement('div');
  card.className = 'winner-card';
  
  const imagesContainer = document.createElement('div');
  imagesContainer.style.display = 'flex';
  imagesContainer.style.gap = '0.5rem';
  imagesContainer.style.justifyContent = 'center';
  imagesContainer.style.overflowX = 'auto';
  
  p.images.forEach(imgSrc => {
    const imgEl = document.createElement('img');
    imgEl.src = imgSrc;
    imgEl.alt = "Proof Image";
    imgEl.style.height = '150px';
    imgEl.style.cursor = 'pointer';
    
    imgEl.onclick = () => {
      document.getElementById('modalImg').src = imgSrc;
      document.getElementById('imgModal').style.display = 'flex';
    };
    
    imagesContainer.appendChild(imgEl);
  });

  card.appendChild(imagesContainer);

  const dateEl = document.createElement('span');
  dateEl.className = 'winner-date';
  dateEl.textContent = p.date;
  card.appendChild(dateEl);

  proofList.appendChild(card);
});

const imgModal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');
const closeModal = document.getElementById('closeModal');

closeModal.addEventListener('click', () => {
  imgModal.style.display = 'none';
  modalImg.src = '';
});

imgModal.addEventListener('click', (e) => {
  if(e.target === imgModal) {
    imgModal.style.display = 'none';
    modalImg.src = '';
  }
});

function handleArrowVisibility(containerId, arrowId) {
  const box = document.getElementById(containerId);
  const arrow = document.getElementById(arrowId);
  function checkScroll() {
    if (box.scrollHeight > box.clientHeight && box.scrollTop + box.clientHeight < box.scrollHeight - 10) {
      arrow.style.display = 'block';
    } else {
      arrow.style.display = 'none';
    }
  }
  box.addEventListener('scroll', checkScroll);
  window.addEventListener('resize', checkScroll);
  window.addEventListener('load', checkScroll);
  checkScroll();
}

handleArrowVisibility('winnersList', 'winnerArrow');
handleArrowVisibility('proofList', 'proofArrow');
document.querySelector('.info-note').id = 'infoBox';
handleArrowVisibility('infoBox', 'infoArrow');

document.addEventListener('DOMContentLoaded', () => {
  const css = `
    * {
      -webkit-tap-highlight-color: transparent !important;
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
      outline: none !important;
    }
    a, img, button, div, span {
      -webkit-tap-highlight-color: rgba(0,0,0,0) !important;
    }
    *:focus { outline: none !important; box-shadow: none !important; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
});
