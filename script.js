// Animate sections on scroll
const sections = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);
sections.forEach(section => observer.observe(section));

// Smooth scroll and update active nav link
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navLinks.forEach(a => a.classList.remove('active'));
    link.classList.add('active');
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Contact bubble popup toggle
const contactBubble = document.getElementById('contactBubble');
const contactPopup = document.getElementById('contactPopup');

contactBubble.addEventListener('click', () => {
  contactPopup.classList.toggle('visible');
});

// Allow toggle with keyboard (Enter/Space)
contactBubble.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    contactPopup.classList.toggle('visible');
  }
});

// Dark mode toggle
const themeToggleBtn = document.getElementById('themeToggle');
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
});
