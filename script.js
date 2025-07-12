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

// Optional: Update nav active link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Contact bubble popup toggle
const contactBubble = document.getElementById('contactBubble');
const contactPopup = document.getElementById('contactPopup');

contactBubble.addEventListener('click', () => {
  contactPopup.classList.toggle('visible');
  if (contactPopup.classList.contains('visible')) {
    contactPopup.focus();
  }
});

// Allow toggle with keyboard (Enter/Space)
contactBubble.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    contactPopup.classList.toggle('visible');
    if (contactPopup.classList.contains('visible')) {
      contactPopup.focus();
    }
  }
});

// Dark mode toggle
const themeToggleBtn = document.getElementById('themeToggle');
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  themeToggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
});

