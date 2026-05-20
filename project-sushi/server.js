const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const galleryImages = [
  {
    src: '/images/feature-3.jpeg',
    alt: 'Luxury Wedding Catering',
  },
  {
    src: '/images/feature-4.jpeg',
    alt: 'Private Omakase Experience',
  },
  {
    src: '/images/feature-5.jpeg',
    alt: 'Corporate Dining Event',
  },
  {
    src: '/images/Geronimo.jpg',
    alt: 'Chef Curated Sushi Presentation',
  },
  {
    src: '/images/feature-1.jpeg',
    alt: 'Premium Sushi Platter',
  },
  {
    src: '/images/feature-7.jpeg',
    alt: 'Live Sushi Bar Experience',
  },
];
app.get('/api/gallery', (req, res) => {
  res.json(galleryImages);
});

app.get('/api/menu', (req, res) => {
  res.json({
    sections: [
      {
        name: 'Signature Rolls',
        items: ['Spicy Tuna', 'Rainbow Roll', 'Dragon Roll'],
      },
      { name: 'Nigiri', items: ['Salmon', 'Tuna', 'Yellowtail'] },
      {
        name: 'Platters',
        items: ['Chef Selection', 'Party Tray', 'Omakase Box'],
      },
    ],
  });
});

app.post('/api/contact', (req, res) => {
  res.json({ success: true, message: 'Contact form received.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
