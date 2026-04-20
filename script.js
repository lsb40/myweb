// ===== MODERN PROFESSIONAL PORTFOLIO - JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== MOBILE MENU TOGGLE =====
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (mobileMenuToggle && sidebar) {
    mobileMenuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
          sidebar.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
        }
      }
    });
  }
  
  // ===== SMOOTH SCROLL & ACTIVE NAV LINKS =====
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section, .hero-section');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Smooth scroll
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu after click
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
        }
      }
    });
  });
  
  // ===== UPDATE ACTIVE NAV ON SCROLL =====
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }, 100);
  });
  
  // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
  const animatedSections = document.querySelectorAll('[data-animate]');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after animation to improve performance
        sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedSections.forEach(section => {
    sectionObserver.observe(section);
  });
  
  // ===== DARK MODE TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  if (themeToggle) {
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.classList.add('dark-mode');
      if (themeIcon) themeIcon.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      
      if (body.classList.contains('dark-mode')) {
        if (themeIcon) themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
      } else {
        if (themeIcon) themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
      }
    });
  }
  
  // ===== PARALLAX EFFECT ON HERO =====
  const heroSection = document.querySelector('.hero-section');
  
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      
      if (scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    });
  }
  
  // ===== PROJECT CARD HOVER EFFECTS =====
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Add subtle animation to tech stack items
      const techItems = card.querySelectorAll('.tech-stack span');
      techItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.transform = 'translateY(-2px)';
          setTimeout(() => {
            item.style.transform = 'translateY(0)';
          }, 100);
        }, index * 30);
      });
    });
  });
  
  // ===== TIMELINE ITEM REVEAL =====
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, index * 150);
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    timelineObserver.observe(item);
  });
  
  // ===== SKILL ITEMS STAGGER ANIMATION =====
  const skillCategories = document.querySelectorAll('.skill-category');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillItems = entry.target.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, index * 30);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  skillCategories.forEach(category => {
    const skillItems = category.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(10px)';
      item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
    skillObserver.observe(category);
  });
  
  // ===== FORM VALIDATION & ENHANCEMENT =====
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      // Add floating label effect
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });
    });
    
    // Form submission handling
    contactForm.addEventListener('submit', (e) => {
      const submitBtn = contactForm.querySelector('.form-submit');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Reset after submission (formspree handles the actual submission)
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 3000);
    });
  }
  
  // ===== SMOOTH SCROLL TO TOP =====
  let scrollToTopBtn;
  
  // Create scroll to top button
  if (!document.querySelector('.scroll-to-top')) {
    scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
    
    // Add styles
    scrollToTopBtn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--primary, #1e40af);
      color: white;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
      } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
      }
    });
    
    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    scrollToTopBtn.addEventListener('mouseenter', () => {
      scrollToTopBtn.style.transform = 'translateY(-5px)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', () => {
      scrollToTopBtn.style.transform = 'translateY(0)';
    });
  }
  
  // ===== TYPING EFFECT FOR HERO TITLE (Optional) =====
  // Uncomment if you want a typing effect
  /*
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    
    setTimeout(typeWriter, 500);
  }
  */
  
  // ===== PERFORMANCE: DEBOUNCE SCROLL EVENTS =====
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // ===== LOG INITIALIZATION =====
  console.log('🚀 Portfolio initialized successfully!');
  console.log('💼 Design by: Harshini Bandaru');
  
});

// ===== HANDLE VISIBILITY CHANGE (PERFORMANCE) =====
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when tab is not visible
    document.body.style.animationPlayState = 'paused';
  } else {
    // Resume animations when tab is visible
    document.body.style.animationPlayState = 'running';
  }
});

// ===== PRELOAD CRITICAL RESOURCES =====
window.addEventListener('load', () => {
  // Add any post-load optimizations here
  console.log('✅ All resources loaded');
});
