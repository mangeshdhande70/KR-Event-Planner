import React from 'react';

// Dynamically import all image files from the assets/events folders
// Vite will automatically detect any new file dropped into these folders during dev or build!
const imageModules = import.meta.glob('../assets/events/**/*.{png,jpg,jpeg,svg,webp}', { eager: true });

// Helper to extract images for a specific event folder and map them to the gallery structure
const getGalleryImages = (folderName) => {
  const images = [];
  let index = 1;
  
  for (const path in imageModules) {
    if (path.includes(`/events/${folderName}/`)) {
      // Extract the filename without extension (e.g., "Venue-StageSetup" from "Venue-StageSetup.jpg")
      const filename = path.split('/').pop().split('.')[0];
      
      let category = 'Gallery';
      let alt = `${folderName} Image ${index}`;
      
      // Optional Feature: If you name your file with a hyphen (e.g., "Venue-MainHall.jpg"), 
      // the first part will automatically become the Category filter, and the second part the Alt text!
      if (filename.includes('-')) {
        const parts = filename.split('-');
        category = parts[0];
        alt = parts.slice(1).join(' ').replace(/_/g, ' ');
      }
      
      images.push({
        id: `${folderName}-${index}`,
        // Handle different Vite versions (.default for standard imports, or the module itself if raw URL)
        src: imageModules[path].default || imageModules[path],
        alt: alt,
        category: category
      });
      index++;
    }
  }
  return images;
};

// Helper to grab the first image found in the folder for the Card and Hero banner
const getHeroImage = (folderName) => {
  const gallery = getGalleryImages(folderName);
  return gallery.length > 0 ? gallery[0].src : ''; // Fallback if folder is empty
};

export const eventsData = [
  {
    id: 'corporate-events',
    title: 'Corporate Events',
    tagline: 'Where Professionalism Meets Prestige',
    description:
      'Elevate your corporate gatherings with our meticulously planned conferences, galas, and product launches. We blend brand identity with seamless execution.',
    tags: ['Conferences', 'Galas', 'Product Launches', 'Seminars'],
    iconClass: 'text-blue-400',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    heroImage: getHeroImage('corporate'),
    gallery: getGalleryImages('corporate')
  },
  {
    id: 'luxury-weddings',
    title: 'Luxury Weddings',
    tagline: 'Your Love Story, Beautifully Told',
    description:
      'From grand venues to intimate destination ceremonies, we craft bespoke luxury weddings. Experience breathtaking floral designs and flawless coordination.',
    tags: ['Destination', 'Floral', 'Bespoke', 'Catering'],
    iconClass: 'text-pink-400',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    heroImage: getHeroImage('wedding'),
    gallery: getGalleryImages('wedding')
  },
  {
    id: 'theme-parties',
    title: 'Experiential & Theme Parties',
    tagline: 'Immersive Experiences Beyond Imagination',
    description:
      'Step into a different world with our immersive theme parties. We provide custom set designs, specialized entertainment, and themed culinary delights.',
    tags: ['Immersive', 'Custom Sets', 'Costumes', 'DJ'],
    iconClass: 'text-purple-400',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    heroImage: getHeroImage('party'),
    gallery: getGalleryImages('party')
  },
  {
    id: 'birthday-parties',
    title: 'Birthday Parties',
    tagline: 'Every Age Deserves a Grand Celebration',
    description:
      'Whether a sweet sixteen or a milestone 50th, we create vibrant and memorable birthday celebrations tailored specifically to your personality.',
    tags: ['Milestone', 'Kids', 'Vibrant', 'Memorable'],
    iconClass: 'text-yellow-400',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    heroImage: getHeroImage('birthday'),
    gallery: getGalleryImages('birthday')
  },
  {
    id: 'ring-ceremony',
    title: 'Ring Ceremony',
    tagline: "Celebrating Love's First Promise",
    description:
      'We bring elegance and romance to your engagement. Enjoy magical stage setups, soft lighting, and exquisite floral arrangements for the perfect start.',
    tags: ['Elegance', 'Romantic', 'Lighting', 'Floral'],
    iconClass: 'text-teal-400',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    heroImage: getHeroImage('engagement'),
    gallery: getGalleryImages('engagement')
  },
  {
    id: 'baby-shower',
    title: 'Baby Shower',
    tagline: 'Welcoming New Beginnings',
    description:
      'Delightful and heartwarming baby showers designed with creativity and care. Enjoy custom props, engaging games, and beautiful photo booths.',
    tags: ['Heartwarming', 'Creative', 'Games', 'Photo Booth'],
    iconClass: 'text-green-400',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    heroImage: getHeroImage('babyshower'),
    gallery: getGalleryImages('babyshower')
  }
];
