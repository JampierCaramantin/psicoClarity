// ============================
//   PSICOCLARITY – MAIN JS
// ============================

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
const handleScroll = () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// ---- MOBILE NAV ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  // Evitar que la clase .scrolled distorsione el menú: añadir clase temporal
  if (navLinks.classList.contains('open')) {
    navbar.classList.add('menu-open');
  } else {
    navbar.classList.remove('menu-open');
    handleScroll();
  }
});
// Close on link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    navbar.classList.remove('menu-open');
  });
});
// Close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger?.classList.remove('open');
    navLinks?.classList.remove('open');
    navbar.classList.remove('menu-open');
  }
});

// ---- REVEAL ON SCROLL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- CONTACT FORM ----
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Enviando...';
  btn.disabled = true;
  setTimeout(() => {
    contactForm.style.display = 'none';
    formSuccess.classList.add('show');
  }, 1500);
});

// ---- SMOOTH HOVER COUNTER ANIMATION ----
function animateCounter(el, target) {
  let current = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current + (el.dataset.suffix || '');
  }, 40);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.count));
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.why-stats, .historia-stats').forEach(el => {
  statsObserver.observe(el);
});

// ---- ACTIVE NAV LINK ----
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ---- PARALLAX HERO ----
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroBg.style.transform = `scale(1) translateY(${scrolled * 0.3}px)`;
  }, { passive: true });
}

// ---- PACKAGE CARD TILT ----
document.querySelectorAll('.pkg-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ---- RESERVE CARD PULSE ANIMATION ----
document.querySelectorAll('.reserve-card').forEach((card, i) => {
  card.style.animationDelay = `${i * 0.1}s`;
});

// ---- WHATSAPP FLOAT BUTTON (if desired) ----
const wpFloat = document.createElement('a');
wpFloat.href = 'https://wa.me/1234567890?text=Hola%2C%20quiero%20información%20sobre%20sus%20servicios';
wpFloat.target = '_blank';
wpFloat.setAttribute('aria-label', 'Contactar por WhatsApp');
wpFloat.innerHTML = '<i class="fab fa-whatsapp"></i>';
wpFloat.style.cssText = `
  position: fixed;
  bottom: 1.8rem;
  right: 1.8rem;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #25d366, #1ebe57);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  box-shadow: 0 4px 20px rgba(37,211,102,.45);
  z-index: 999;
  transition: transform 0.3s, box-shadow 0.3s;
  animation: wpPulse 2.5s infinite;
`;
document.head.insertAdjacentHTML('beforeend', `
  <style>
    @keyframes wpPulse {
      0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,.45); }
      50% { box-shadow: 0 4px 40px rgba(37,211,102,.7), 0 0 0 8px rgba(37,211,102,.12); }
    }
  </style>
`);
wpFloat.addEventListener('mouseenter', () => {
  wpFloat.style.transform = 'scale(1.1) translateY(-3px)';
});
wpFloat.addEventListener('mouseleave', () => {
  wpFloat.style.transform = '';
});
document.body.appendChild(wpFloat);

console.log('%cPsicoClarity 🧠', 'font-size:1.5rem;color:#7F55B1;font-weight:bold;');
console.log('%cCentro Psicológico – Tu bienestar mental es nuestra prioridad', 'color:#9B7EBD');
