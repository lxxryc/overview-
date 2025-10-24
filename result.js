const bgVideo = document.getElementById('bgVideo');
const bgImage = document.getElementById('bgImage');

function showImage() {
  bgVideo.style.display = 'none';
  bgImage.style.display = 'block';
}

function showVideo() {
  bgVideo.style.display = 'block';
  bgImage.style.display = 'none';
}

try {
  const videoSource = bgVideo.querySelector('source')?.getAttribute('src')?.trim();
  if (!videoSource) {
    showImage(); 
  } else {
    bgVideo.play()
      .then(() => showVideo())
      .catch(() => showImage()); 
  }
} catch (err) {
  showImage(); 
}

    const winners = [
      { name: "Gab", prize: "$60", facebook: "https://web.facebook.com/thisisnotgab", date: "October 19, 2025" },
      { name: "**** ****", prize: "$100", facebook: "https://facebook.com/", date: "October 26, 2025" },
     
    ];

    const proofs = [
      { images: ["https://img.eselt.de/img/18689998_aCLnGfSwdS7hsq0o/ad.jpg", "https://img.eselt.de/img/18693492_f0qGrchfhEgdBjzc/ad.jpg",  ], date: "October 19, 2025" },
     
     
    ];

 
    const winnersList = document.getElementById('winnersList');
    winners.forEach(w => {
      const card = document.createElement('div');
      card.className = 'winner-card';
      card.innerHTML = `
        <a href="${w.facebook}" target="_blank" rel="noopener noreferrer">${w.name}</a>
        <span class="winner-prize">${w.prize}</span>
        <span class="winner-date">${w.date}</span>`;
      winnersList.appendChild(card);
    });

   
    const proofList = document.getElementById('proofList');
    proofs.forEach(p => {
      const card = document.createElement('div');
      card.className = 'winner-card';
      const images = document.createElement('div');
      images.style.display = 'flex';
      images.style.gap = '0.5rem';
      images.style.justifyContent = 'center';
      images.style.overflowX = 'auto';
      p.images.forEach(src => {
        const img = document.createElement('img');
        img.src = src; img.onclick = () => openModal(src);
        images.appendChild(img);
      });
      const date = document.createElement('span');
      date.className = 'winner-date';
      date.textContent = p.date;
      card.append(images, date);
      proofList.appendChild(card);
    });

  
    const imgModal = document.getElementById('imgModal');
    const modalImg = document.getElementById('modalImg');
    const closeModal = document.getElementById('closeModal');
    function openModal(src) { modalImg.src = src; imgModal.style.display = 'flex'; }
    closeModal.onclick = () => imgModal.style.display = 'none';
    imgModal.onclick = e => { if (e.target === imgModal) imgModal.style.display = 'none'; };

   
    function handleArrowVisibility(sectionId, arrowId) {
      const section = document.getElementById(sectionId);
      if (!section) return;
      const scrollEl = section.querySelector('.scrollable-container');
      const arrow = document.getElementById(arrowId);
      if (!scrollEl || !arrow) return;

   
      arrow.style.opacity = '0';

      function updateArrow() {
     
        if (!scrollEl || !arrow) return;
        const canScroll = scrollEl.scrollHeight > scrollEl.clientHeight + 5;
        arrow.style.opacity = canScroll && scrollEl.scrollTop <= 2 ? '1' : '0';
      }

   
      scrollEl.addEventListener('scroll', updateArrow);
      window.addEventListener('resize', updateArrow);
      window.addEventListener('load', updateArrow);

    
      updateArrow();
    }

    handleArrowVisibility('infoBox', 'infoArrow');
    handleArrowVisibility('winnersBox', 'winnerArrow');
    handleArrowVisibility('proofBox', 'proofArrow');



    const aboutBtn = document.getElementById('aboutBtn');
    const aboutModal = document.getElementById('aboutModal');
    const closeAbout = document.getElementById('closeAbout');

    aboutBtn.onclick = () => { aboutModal.style.display = 'flex'; };
    closeAbout.onclick = () => { aboutModal.style.display = 'none'; };
    aboutModal.onclick = e => { if (e.target === aboutModal) aboutModal.style.display = 'none'; };








  
