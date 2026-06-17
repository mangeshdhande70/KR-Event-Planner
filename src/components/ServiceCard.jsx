import React, { useRef, useState } from 'react';

export default function ServiceCard({ title, description, tags, icon, iconClass, image }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState({});

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransformStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      borderColor: 'rgba(255, 255, 255, 0.18)'
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: 'rotateX(0deg) rotateY(0deg) scale(1)',
      boxShadow: 'none',
      borderColor: 'rgba(255, 255, 255, 0.1)'
    });
  };

  return (
    <div
      className="perspective-[1000px] h-full group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        style={transformStyle}
        className="glass-card p-9 rounded-2xl flex flex-col h-full transition-all duration-300 origin-center select-none relative overflow-hidden"
      >
        {/* Background Image with Dark Overlay */}
        {image && (
          <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-35 group-hover:opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/95 via-[#030712]/65 to-[#030712]/25 transition-opacity duration-300" />
          </div>
        )}

        {/* Content container */}
        <div className="relative z-10 flex flex-col h-full">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${iconClass}`}>
            {icon}
          </div>
          <h3 className="font-display font-bold text-2xl tracking-tight text-white mb-3">
            {title}
          </h3>
          <p className="text-gray-300 text-[0.95rem] leading-[1.65] mb-5 flex-grow">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/8 text-gray-400 text-[0.78rem] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
