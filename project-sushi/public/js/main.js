const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
  });
}

async function loadGallery(id) {
  const grid = document.getElementById(id);
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
  } catch {
    grid.innerHTML = '<p>Gallery could not load.</p>';
  }
}

async function loadFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;

  const featured = [
    { src: '/images/hero3.jpeg', alt: 'Featured Sushi' },
    { src: '/images/feature-8.jpeg', alt: 'Signature sushi plate' },
    { src: '/images/feature-2.jpeg', alt: 'Fresh sushi platter' },
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

async function loadInstagramStyle() {
  const grid = document.getElementById('instagramGrid');
  if (!grid) return;

  const photos = [
    { src: '/images/feature-1.jpeg', alt: 'Recent sushi photo 1' },
    { src: '/images/feature-2.jpeg', alt: 'Recent sushi photo 2' },
    { src: '/images/feature-3.jpeg', alt: 'Recent sushi photo 3' },
  ];

  grid.innerHTML = photos
    .map(
      (img) => `
    <div class="card">
      <img src="${img.src}" alt="${img.alt}" />
    </div>
  `,
    )
    .join('');
}

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

  function updateReviewsSlider() {
    const cardsPerView = getCardsPerView();
    const gap = 20;
    const cardWidth = cards[0].getBoundingClientRect().width + gap;
    const maxIndex = Math.max(0, cards.length - cardsPerView);

    if (index > maxIndex) index = 0;

    reviewsTrack.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  function nextReview() {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, cards.length - cardsPerView);

    index = index >= maxIndex ? 0 : index + 1;
    updateReviewsSlider();
  }

  function prevReview() {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, cards.length - cardsPerView);

    index = index <= 0 ? maxIndex : index - 1;
    updateReviewsSlider();
  }

  reviewsNext?.addEventListener('click', nextReview);
  reviewsPrev?.addEventListener('click', prevReview);
  window.addEventListener('resize', updateReviewsSlider);

  updateReviewsSlider();
  setInterval(nextReview, 9000);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

document
  .querySelectorAll('.section, .card, .gallery-grid .card')
  .forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

loadGallery('galleryGrid');
loadFeatured();
loadInstagramStyle();
