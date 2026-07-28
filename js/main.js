// ---------- Header solid on scroll ----------
const header = document.querySelector('.site-header');
const navLinks = document.querySelector('.nav-links');
const navToggle = document.querySelector('.nav-toggle');

function onScroll() {
  if (window.scrollY > 40) header.classList.add('solid');
  else header.classList.remove('solid');
}
window.addEventListener('scroll', onScroll);
onScroll();

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ---------- Waveform divider generator ----------
document.querySelectorAll('.wave-divider').forEach(wave => {
  const bars = 60;
  for (let i = 0; i < bars; i++) {
    const bar = document.createElement('span');
    const h = 20 + Math.round(Math.random() * 70);
    bar.style.height = h + '%';
    bar.style.animationDelay = (Math.random() * 2).toFixed(2) + 's';
    wave.appendChild(bar);
  }
});

// ---------- Counter animation ----------
const counters = document.querySelectorAll('[data-count]');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const dur = 1600;
    const start = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(el => counterIO.observe(el));

// ---------- Contact form: submit via AJAX (Netlify Forms) without leaving page ----------
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.getElementById('form-status');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const data = new FormData(contactForm);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
    })
      .then(() => {
        status.textContent = "Message sent — thank you. We'll reply to you shortly.";
        status.className = 'form-status ok';
        contactForm.reset();
      })
      .catch(() => {
        status.textContent = 'Something went wrong. Please try again or email us directly.';
        status.className = 'form-status err';
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
      });
  });
}

// ---------- Donate amount pills ----------
document.querySelectorAll('.amount-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.amount-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
  });
});
