async function loadSlides() {
  const deck = document.getElementById('deck');

  // Fetch the list of slide files from slides/ directory
  const manifest = await fetch('slides/manifest.json').then(r => r.json());

  for (const file of manifest) {
    const html = await fetch('slides/' + file).then(r => r.text());
    const section = document.createElement('section');
    section.className = 'slide';
    section.innerHTML = html;
    deck.appendChild(section);

    // Execute any script tags in the slide
    section.querySelectorAll('script').forEach(oldScript => {
      const newScript = document.createElement('script');
      newScript.textContent = oldScript.textContent;
      oldScript.replaceWith(newScript);
    });
  }

  initDeck();
}

function initDeck() {
  const slides = document.querySelectorAll('.slide');
  const progress = document.getElementById('progress');
  const counter = document.getElementById('counter');
  const fsBtn = document.getElementById('fsBtn');
  const decoy = document.getElementById('decoy');
  let current = 0;
  let decoyActive = false;

  if (slides.length > 0) {
    slides[0].classList.add('active');
  }

  function goTo(index) {
    if (index < 0 || index >= slides.length) return;
    const prev = slides[current];
    const next = slides[index];
    const goingForward = index > current;

    prev.classList.remove('active', 'exit-left');
    if (goingForward) prev.classList.add('exit-left');

    next.classList.remove('exit-left');
    next.classList.add('active');

    current = index;
    updateControls();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function showDecoy() {
    decoyActive = true;
    document.querySelector('.deck').style.display = 'none';
    decoy.style.display = 'flex';
    progress.style.display = 'none';
    counter.style.display = 'none';
    fsBtn.style.display = 'none';
    // Restart SVG animations
    const svg = document.getElementById('decoy-annotations');
    if (svg) {
      const clone = svg.cloneNode(true);
      svg.parentNode.replaceChild(clone, svg);
    }
  }

  function hideDecoy() {
    decoyActive = false;
    document.querySelector('.deck').style.display = '';
    decoy.style.display = 'none';
    progress.style.display = '';
    counter.style.display = '';
    fsBtn.style.display = '';
  }

  function updateControls() {
    const pct = ((current + 1) / slides.length) * 100;
    progress.style.width = pct + '%';
    counter.textContent = (current + 1) + ' / ' + slides.length;
  }

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (decoyActive) hideDecoy();
      else showDecoy();
    } else if (decoyActive) {
      if (e.key === 'Escape') hideDecoy();
      return;
    } else if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'Home') goTo(0);
    else if (e.key === 'End') goTo(slides.length - 1);
  });

  // Click to advance (left third goes back)
  document.addEventListener('click', (e) => {
    if (decoyActive) return;
    if (e.target.closest('.fullscreen-btn')) return;
    if (e.clientX < window.innerWidth / 3) prev();
    else next();
  });

  // Fullscreen
  fsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });

  updateControls();
}

loadSlides();
