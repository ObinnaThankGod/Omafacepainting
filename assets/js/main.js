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
