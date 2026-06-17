import React from 'react';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';

// Import project images
import neonFutureGalaImg from '../assets/neon_future_gala.png';
import elysianGardenWeddingImg from '../assets/elysian_garden_wedding.png';
import prismMusicFestivalImg from '../assets/prism_music_festival.png';

export default function Projects() {
  const projects = [
    {
      title: 'Neon Future Gala',
      description: 'A cyber-themed annual corporate celebration for 500+ tech executives featuring immersive LED installations, interactive projections, and live modern performances.',
      tags: ['Corporate Gala', 'Event Design', 'Immersive Production', 'Tech Setup'],
      image: neonFutureGalaImg,
      imageBgClass: 'bg-gradient-to-br from-[#0f172a] via-[#0c4a6e] to-[#a855f7]',
      reverse: false,
      tiltDirection: 'left'
    },
    {
      title: 'Elysian Garden Wedding',
      description: 'A bespoke destination wedding in Napa Valley, featuring a custom glass marquee, hanging floral installations, and a five-course custom culinary experience.',
      tags: ['Napa Valley', 'Luxury Wedding', 'Destination Planning', 'Floral Design'],
      image: elysianGardenWeddingImg,
      imageBgClass: 'bg-gradient-to-br from-[#1e1b4b] via-[#4c1d95] to-[#f472b6]',
      reverse: true,
      tiltDirection: 'right'
    },
    {
      title: 'Prism Music Festival',
      description: 'An outdoor experiential music and art gathering, coordinating multi-stage structures, crowd control logistics, and dynamic light shows for 10,000+ attendees.',
      tags: ['Music Festival', 'Multi-stage Production', 'Crowd Logistics', 'Light Show'],
      image: prismMusicFestivalImg,
      imageBgClass: 'bg-gradient-to-br from-[#0c0a09] via-[#78350f] to-[#22d3ee]',
      reverse: false,
      tiltDirection: 'left'
    }
  ];

  return (
    <section id="projects" className="relative py-20 md:py-32">
      <div className="max-w-[1280px] mx-auto px-5 md:px-12">
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-cyan-400 font-bold text-[0.8rem] uppercase tracking-[0.15em] mb-4">
              Selected Work
            </span>
            <h2 className="font-display font-extrabold text-[clamp(2rem,4.5vw,3.5rem)] tracking-tight leading-[1.15] text-white mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="max-w-[560px] mx-auto text-gray-400 text-base md:text-[1.05rem] leading-[1.7]">
              A curated collection of bespoke events that showcase our approach to experiential design, meticulous logistics management, and creative execution.
            </p>
          </div>
        </Reveal>

        <div>
          {projects.map((project, index) => (
            <Reveal key={index}>
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.tags}
                image={project.image}
                imageBgClass={project.imageBgClass}
                reverse={project.reverse}
                tiltDirection={project.tiltDirection}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
