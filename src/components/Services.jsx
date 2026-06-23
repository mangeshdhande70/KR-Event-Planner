import React from 'react';
import EventCard from './EventCard';
import Reveal from './Reveal';
import { eventsData } from '../data/eventsData';

export default function Services() {
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
            {eventsData.map((service) => (
              <EventCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                tags={service.tags}
                icon={service.icon}
                iconClass={service.iconClass}
                image={service.heroImage}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
