document.addEventListener('DOMContentLoaded', function() {
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

// --- FLOATING HERO BACKGROUND SHAPE ---
const heroBgShape = document.createElement('div');
heroBgShape.style.position = 'absolute';
heroBgShape.style.left = '50%';
heroBgShape.style.top = '60%';
heroBgShape.style.width = '220px';
heroBgShape.style.height = '220px';
heroBgShape.style.background = 'radial-gradient(circle at 60% 40%, #6c47e6 0%, #1746c4 100%)';
heroBgShape.style.opacity = '0.13';
heroBgShape.style.borderRadius = '50%';
heroBgShape.style.zIndex = '0';
heroBgShape.style.transform = 'translate(-50%, -50%)';
heroBgShape.style.pointerEvents = 'none';
if (heroSection) {
  heroSection.appendChild(heroBgShape);
  let t = 0;
  function animateBgShape() {
    t += 0.008;
    const x = Math.sin(t) * 18;
    const y = Math.cos(t * 0.7) * 14;
    heroBgShape.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    requestAnimationFrame(animateBgShape);
  }
  animateBgShape();
}

// --- PROJECT CARD TILT ON HOVER ---
const projectCards = document.querySelectorAll('#projects .project-card');
projectCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width - 0.5) * 2;
    const yPercent = (y / rect.height - 0.5) * 2;
    card.style.transform = `rotateX(${-yPercent * 6}deg) rotateY(${xPercent * 6}deg) scale(1.04)`;
    card.style.boxShadow = `0 12px 32px 0 rgba(108,71,230,0.22), 0 1.5px 8px rgba(23,70,196,0.10)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
});

// --- DISABLE INTERACTIVE EFFECTS ON MOBILE ---
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
if (isTouchDevice()) {
  if (heroSection && heroImg) {
    heroSection.onmousemove = null;
    heroImg.style.transform = '';
  }
  projectCards.forEach(card => {
    card.onmousemove = null;
    card.style.transform = '';
    card.style.boxShadow = '';
  });
}
});

