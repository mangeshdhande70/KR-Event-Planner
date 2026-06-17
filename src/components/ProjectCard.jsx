import React from 'react';

export default function ProjectCard({
  title,
  description,
  tags,
  image,
  imageBgClass,
  reverse = false,
  tiltDirection = 'left',
  link = '#'
}) {
  const tiltClass =
    tiltDirection === 'left'
      ? '[transform:rotateY(2deg)_rotateX(-1deg)]'
      : '[transform:rotateY(-2deg)_rotateX(1deg)]';

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-20 items-center mb-16 md:mb-32 last:mb-0 group ${
        reverse ? 'md:grid-cols-[1fr_1.2fr]' : ''
      }`}
    >
      {/* Image Wrap */}
      <div
        className={`perspective-[1000px] ${reverse ? 'md:order-2' : ''}`}
      >
        <div
          className={`relative rounded-3xl overflow-hidden [transform-style:preserve-3d] transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] ${tiltClass} group-hover:[transform:rotateY(0deg)_rotateX(0deg)_scale(1.02)]`}
        >
          <div
            className={`w-full aspect-[16/10] relative overflow-hidden ${imageBgClass}`}
          >
            {image && (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
              />
            )}
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030712]/70 z-10"></div>
          </div>
        </div>
      </div>

      {/* Info Wrap */}
      <div className={`flex flex-col items-start ${reverse ? 'md:order-1' : ''}`}>
        <span className="inline-block text-cyan-400 font-bold text-[0.72rem] uppercase tracking-[0.2em] mb-3">
          Featured Project
        </span>
        <h3 className="font-display font-extrabold text-[clamp(1.8rem,3vw,2.5rem)] tracking-tight text-white mb-4">
          {title}
        </h3>
        <p className="text-gray-400 text-base leading-[1.7] mb-5">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/8 text-gray-500 text-[0.82rem] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={link}
          className="inline-flex items-center gap-2 font-bold text-[0.95rem] text-cyan-400 transition-all duration-300 hover:gap-3 group/link"
        >
          View Case Study
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover/link:translate-x-1">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
