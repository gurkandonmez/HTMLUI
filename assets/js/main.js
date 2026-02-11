(() => {
  const body = document.body;
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      body.classList.toggle('nav-open');
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
    });
  }

  document.querySelectorAll('.submenu-toggle').forEach((toggle) => {
    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      const item = toggle.closest('.menu-item');
      if (!item) return;
      item.classList.toggle('submenu-open');
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
    });
  });

  document.querySelectorAll('.nav-menu a').forEach((link) => {
    link.addEventListener('click', () => {
      if (body.classList.contains('nav-open')) {
        body.classList.remove('nav-open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const slider = document.querySelector('[data-slider]');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.slide'));
  const dots = slider.querySelector('.slider-dots');
  const prevBtn = slider.querySelector('[data-direction="prev"]');
  const nextBtn = slider.querySelector('[data-direction="next"]');
  let current = 0;
  let intervalId;

  const setActive = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
    });
    if (dots) {
      dots.querySelectorAll('button').forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
        dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
    }
    current = index;
  };

  const goTo = (index) => {
    const nextIndex = (index + slides.length) % slides.length;
    setActive(nextIndex);
  };

  const startAutoplay = () => {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      goTo(current + 1);
    }, 5000);
  };

  if (dots) {
    dots.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slider-dot';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      dot.addEventListener('click', () => {
        goTo(i);
        startAutoplay();
      });
      dots.appendChild(dot);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goTo(current - 1);
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goTo(current + 1);
      startAutoplay();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      goTo(current - 1);
      startAutoplay();
    }
    if (event.key === 'ArrowRight') {
      goTo(current + 1);
      startAutoplay();
    }
  });

  let pointerStartX = null;
  slider.addEventListener('pointerdown', (event) => {
    pointerStartX = event.clientX;
  });
  slider.addEventListener('pointerup', (event) => {
    if (pointerStartX === null) return;
    const delta = event.clientX - pointerStartX;
    if (Math.abs(delta) > 50) {
      if (delta < 0) {
        goTo(current + 1);
      } else {
        goTo(current - 1);
      }
      startAutoplay();
    }
    pointerStartX = null;
  });
  slider.addEventListener('pointerleave', () => {
    pointerStartX = null;
  });

  setActive(0);
  startAutoplay();
})();
