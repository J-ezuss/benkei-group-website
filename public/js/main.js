// =====================
// MOBILE NAV
// =====================
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
    document.body.classList.toggle('menu-open');
  });

  const mobileLinks = document.querySelectorAll('.mobile-nav a');

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('show');
      document.body.classList.remove('menu-open');
    });
  });
}

// =====================
// GALLERY LOADER
// =====================
async function loadGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  try {
    const res = await fetch('/api/gallery');
    const images = await res.json();

    grid.innerHTML = images
      .map(
        (img) => `
          <div class="card">
            <img src="${img.src}" alt="${img.alt}" />
            <div class="caption">${img.alt}</div>
          </div>
        `,
      )
      .join('');
  } catch (err) {
    console.error('Gallery failed to load:', err);
    grid.innerHTML = '<p>Gallery could not load.</p>';
  }
}

// =====================
// FEATURED IMAGES (HOME)
// =====================
function loadFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;

  const featured = [
    { src: '/images/feature-1.jpeg', alt: 'Luxury Sushi Catering' },
    { src: '/images/feature-2.jpeg', alt: 'Private Event Setup' },
    { src: '/images/feature-3.jpeg', alt: 'Chef Plated Sushi' },
  ];

  grid.innerHTML = featured
    .map(
      (img) => `
        <div class="card">
          <img src="${img.src}" alt="${img.alt}" />
          <div class="caption">${img.alt}</div>
        </div>
      `,
    )
    .join('');
}

// =====================
// INSTAGRAM STYLE GRID
// =====================
function loadInstagram() {
  const grid = document.getElementById('instagramGrid');
  if (!grid) return;

  const photos = [
    { src: '/images/feature-1.jpeg' },
    { src: '/images/feature-2.jpeg' },
    { src: '/images/feature-3.jpeg' },
  ];

  grid.innerHTML = photos
    .map(
      (img) => `
        <div class="card">
          <img src="${img.src}" alt="Instagram photo" />
        </div>
      `,
    )
    .join('');
}

// =====================
// REVIEWS SLIDER
// =====================
const reviewsTrack = document.getElementById('reviewsTrack');
const reviewsPrev = document.getElementById('reviewsPrev');
const reviewsNext = document.getElementById('reviewsNext');

if (reviewsTrack) {
  const cards = Array.from(reviewsTrack.children);
  let index = 0;

  function getCardsPerView() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function updateSlider() {
    if (cards.length === 0) return;

    const gap = 20;
    const cardWidth = cards[0].getBoundingClientRect().width + gap;
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, cards.length - cardsPerView);

    if (index > maxIndex) index = 0;

    reviewsTrack.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  function next() {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, cards.length - cardsPerView);

    index = index >= maxIndex ? 0 : index + 1;
    updateSlider();
  }

  function prev() {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, cards.length - cardsPerView);

    index = index <= 0 ? maxIndex : index - 1;
    updateSlider();
  }

  reviewsNext?.addEventListener('click', next);
  reviewsPrev?.addEventListener('click', prev);

  window.addEventListener('resize', updateSlider);

  updateSlider();
  setInterval(next, 9000);
}

// =====================
// FADE IN ANIMATION
// =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

document
  .querySelectorAll(
    '.section, .card, .gallery-grid .card, .review-card, .chef-section',
  )
  .forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

// =====================
// INIT ALL FUNCTIONS
// =====================
loadGallery();
loadFeatured();
loadInstagram();
