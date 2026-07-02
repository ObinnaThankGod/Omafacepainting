// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Booking form handling (front-end only demo)
const bookingForm = document.getElementById('bookingForm');
const formStatus = document.getElementById('formStatus');

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = bookingForm.name.value.trim();
  const email = bookingForm.email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !emailPattern.test(email)) {
    formStatus.textContent = 'Please enter your name and a valid email address.';
    formStatus.className = 'form-status error';
    return;
  }

  // No backend connected yet — replace this with a real submission
  // (e.g. Formspree, EmailJS, or a custom API endpoint).
  formStatus.textContent = `Thanks, ${name}! Your request has been received. We'll email you shortly.`;
  formStatus.className = 'form-status success';
  bookingForm.reset();
});

// Hero interactions: mouse parallax + scroll drift (skipped for reduced motion / touch)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
const hero = document.querySelector('.hero');
const heroVisual = document.querySelector('.hero-visual');
const heroImageMask = document.querySelector('.hero-image-mask');
const heroContent = document.querySelector('.hero-content');
const heroDecor = document.querySelector('.hero-decor');

if (hero && heroVisual && heroImageMask && !prefersReducedMotion) {
  if (!isCoarsePointer) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    const applyParallax = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      heroImageMask.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(applyParallax);
      } else {
        rafId = null;
      }
    };

    const startLoop = () => {
      if (!rafId) rafId = requestAnimationFrame(applyParallax);
    };

    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = relX * 16;
      targetY = relY * 16;
      startLoop();
    });

    heroVisual.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      startLoop();
    });
  }

  // Scroll parallax: hero content drifts slower, decor drifts upward and fades.
  // (Applied to a plain, non-animated wrapper so it doesn't fight the
  // forwards-filled entrance animations on the decor's own children.)
  let ticking = false;

  const updateScrollEffects = () => {
    const heroHeight = hero.offsetHeight || 1;
    const scrollY = Math.min(Math.max(window.scrollY, 0), heroHeight);
    const progress = scrollY / heroHeight;

    if (heroContent) {
      heroContent.style.transform = `translate3d(0, ${scrollY * -0.06}px, 0)`;
    }

    if (heroDecor) {
      heroDecor.style.transform = `translate3d(0, ${scrollY * -0.25}px, 0)`;
      heroDecor.style.opacity = String(Math.max(1 - progress * 1.6, 0));
    }

    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScrollEffects);
      }
    },
    { passive: true }
  );
}
