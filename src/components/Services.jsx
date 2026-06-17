import React from 'react';
import ServiceCard from './ServiceCard';
import Reveal from './Reveal';

// Import service background images
import serviceCorporate from '../assets/service_corporate.png';
import serviceWeddings from '../assets/service_weddings.png';
import serviceParties from '../assets/service_parties.png';
import serviceBirthday from '../assets/service_birthday.png';
import serviceRingCeremony from '../assets/service_ring_ceremony.png';
import serviceFestivals from '../assets/service_festivals.png';

export default function Services() {
  const serviceItems = [
    {
      title: 'Corporate Events',
      description: 'Seamless conferences, gala dinners, product launches, and team-building events tailored to your brand identity.',
      tags: ['Conferences', 'Product Launches', 'Corporate Galas'],
      iconClass: 'bg-cyan-500/10 text-cyan-400',
      image: serviceCorporate,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    {
      title: 'Luxury Weddings',
      description: 'Bespoke wedding planning, design, and coordination. We translate your love story into an unforgettable celebration.',
      tags: ['Destination Weddings', 'Full Planning', 'Floral Design'],
      iconClass: 'bg-purple-500/10 text-purple-400',
      image: serviceWeddings,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="12" r="5" />
          <circle cx="15" cy="12" r="5" />
        </svg>
      )
    },
    {
      title: 'Experiential & Theme Parties',
      description: 'High-concept private parties, immersive thematic experiences, and celebratory gatherings that captivate guests.',
      tags: ['Thematic Production', 'Private Celebrations', 'Live Entertainment'],
      iconClass: 'bg-pink-500/10 text-pink-400',
      image: serviceParties,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12l-6 9v7m-4 2h8M12 12V3" />
          <path d="M8 6h8" />
        </svg>
      )
    },
    {
      title: 'Birthday Parties',
      description: 'Spectacular milestone birthdays and custom-themed private celebrations designed with vibrant accents, personalized touches, and high-energy entertainment.',
      tags: ['Theme Birthdays', 'Milestone Parties', 'Social Gatherings'],
      iconClass: 'bg-emerald-500/10 text-emerald-400',
      image: serviceBirthday,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 12v10H4V12" />
          <path d="M2 7h20v5H2z" />
          <path d="M12 22V7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      )
    },
    {
      title: 'Ring Ceremony',
      description: 'Romantic engagement ceremonies and custom proposal arrangements styled with dreamy backdrops, premium floral selections, and intimate dining experiences.',
      tags: ['Engagement Styling', 'Cozy Proposals', 'Intimate Celebrations'],
      iconClass: 'bg-amber-500/10 text-amber-400',
      image: serviceRingCeremony,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="15" r="4" />
          <circle cx="15" cy="15" r="4" />
          <path d="M9 11c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        </svg>
      )
    },
    {
      title: 'Live Concerts & Festivals',
      description: 'Large-scale concert coordination, artist booking, public festivals, and experiential stages equipped with state-of-the-art light and sound systems.',
      tags: ['Concert Stages', 'Artist Logistics', 'Sound & Lights Show'],
      iconClass: 'bg-rose-500/10 text-rose-400',
      image: serviceFestivals,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="relative py-20 md:py-32">
      <div className="max-w-[1280px] mx-auto px-5 md:px-12">
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-cyan-400 font-bold text-[0.8rem] uppercase tracking-[0.15em] mb-4">
              What We Do
            </span>
            <h2 className="font-display font-extrabold text-[clamp(2rem,4.5vw,3.5rem)] tracking-tight leading-[1.15] text-white mb-4">
              Services & <span className="gradient-text">Expertise</span>
            </h2>
            <p className="max-w-[560px] mx-auto text-gray-400 text-base md:text-[1.05rem] leading-[1.7]">
              Transforming visions into extraordinary moments through precision planning, elegant styling, and immersive entertainment.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceItems.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                tags={service.tags}
                icon={service.icon}
                iconClass={service.iconClass}
                image={service.image}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
