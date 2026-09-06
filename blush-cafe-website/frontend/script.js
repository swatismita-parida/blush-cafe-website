// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ---------- 3D tilt on hero collage ----------
const tiltCollage = document.getElementById('tiltCollage');
if (tiltCollage) {
  tiltCollage.addEventListener('mousemove', (e) => {
    const rect = tiltCollage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltCollage.querySelectorAll('.collage-card').forEach((card) => {
      const base = card.classList.contains('cc-back') ? -9 : 6;
      const strength = card.classList.contains('cc-back') ? 10 : 16;
      card.style.transform = `rotate(${base}deg) rotateY(${x * strength}deg) rotateX(${-y * strength}deg)`;
    });
  });
  tiltCollage.addEventListener('mouseleave', () => {
    tiltCollage.querySelectorAll('.collage-card').forEach(card => {
      card.style.transform = card.classList.contains('cc-back')
        ? 'rotate(-9deg)' : 'rotate(6deg)';
    });
  });
}

// ---------- 3D tilt on specialty cards ----------
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// ---------- Sticky nav ----------
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('backTop').classList.toggle('show', window.scrollY > 600);
});

// ---------- Mobile menu ----------
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ---------- Review slider ----------
const track = document.getElementById('reviewTrack');
const dotsWrap = document.getElementById('reviewDots');
const slides = track.children.length;
let current = 0;
for (let i = 0; i < slides; i++) {
  const dot = document.createElement('button');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(dot);
}
function goTo(i) {
  current = i;
  track.style.transform = `translateX(-${i * 100}%)`;
  [...dotsWrap.children].forEach((d, idx) => d.classList.toggle('active', idx === i));
}
setInterval(() => goTo((current + 1) % slides), 4500);

// ===== GALLERY LIGHTBOX (PHOTOS) =====
const lightbox = document.getElementById('lightbox');
const lightboxIcon = document.getElementById('lightboxIcon');
const lightboxCaption = document.getElementById('lightboxCaption');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (img) {
      lightboxIcon.innerHTML = `<img src="${img.src}" alt="Gallery photo" style="width:100%;height:100%;object-fit:cover;border-radius:15px;">`;
    } else {
      lightboxIcon.textContent = item.querySelector('span').textContent;
    }
    lightboxIcon.className = 'lightbox-icon';
    lightboxCaption.textContent = item.dataset.caption;
    lightbox.classList.add('open');
  });
});

document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });

// ---------- Reservation form ----------
const form = document.getElementById('reserveForm');
const success = document.getElementById('formSuccess');
const BACKEND_URL = 'http://127.0.0.1:5000';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Booking...';

  const formData = new FormData(form);
  // "guests" is a range like "1–2" or "7+" — take the first number for the backend's numeric field
  const peopleCount = parseInt(formData.get('guests'), 10) || 1;

  const payload = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    date: formData.get('date'),
    time: formData.get('time'),
    people: peopleCount
  };

  try {
    const res = await fetch(`${BACKEND_URL}/api/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (res.ok) {
      success.textContent = data.message || "Thanks — your table request is in. We'll call to confirm shortly.";
      success.classList.remove('hidden');
      form.reset();
    } else {
      success.textContent = data.message || 'Something went wrong. Please try again.';
      success.classList.remove('hidden');
    }
  } catch (err) {
    success.textContent = "Couldn't reach the server. Please check your connection and try again.";
    success.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
    setTimeout(() => success.classList.add('hidden'), 6000);
  }
});

// ---------- Back to top ----------
document.getElementById('backTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== MAP INITIALIZATION =====
var map = L.map('map').setView([20.2961, 85.8245], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.marker([20.2961, 85.8245])
    .addTo(map)
    .bindPopup('<b>Blush Café</b><br>Saheed Nagar, Bhubaneswar')
    .openPopup();

// ======================================================
// 🟢 GSAP + ScrollTrigger Animations (Assignment ke liye)
// ======================================================
gsap.registerPlugin(ScrollTrigger);

// Hero Entrance Animation
gsap.from(".hero-inner", { 
  y: 80, 
  opacity: 0, 
  duration: 1.2, 
  ease: "power3.out" 
});

// GSAP Scroll Reveal for Sections (Smooth fading effect)
gsap.utils.toArray('.reveal').forEach((elem) => {
  gsap.to(elem, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: elem,
      start: "top 85%",
    }
  });
});

// About Section Text Reveal (Stagger effect)
gsap.from(".about-copy h2", {
  scrollTrigger: ".about-copy h2",
  y: 40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2
});

// Gallery Items Fade In (Stagger)
gsap.from(".gallery-item", {
  scrollTrigger: ".gallery-grid",
  y: 40,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1
});

// Special Section Image Reveal
gsap.from(".img-block.ib2 img", {
  scrollTrigger: ".img-block.ib2",
  scale: 0.8,
  opacity: 0,
  duration: 0.8,
  ease: "back.out(1.7)"
});