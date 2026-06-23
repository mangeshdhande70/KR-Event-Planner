import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function EventCard({ id, title, description, tags, icon, iconClass, image }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out'
    });
  };

  return (
    <motion.div 
      className="group relative h-[420px] w-full"
      whileHover={{ y: -5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/gallery/${id}`} className="block h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-2xl">
        <div
          ref={cardRef}
          style={transformStyle}
          className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-[#090e1a] shadow-xl"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a] via-[#090e1a]/80 to-transparent z-10" />
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700 ease-in-out"
            />
          </div>

          <div className="relative z-20 h-full p-8 flex flex-col">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-auto bg-white/5 backdrop-blur-md border border-white/10 ${iconClass} group-hover:scale-110 transition-transform duration-500`}>
              {icon}
            </div>

            <div className="mt-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="font-display font-bold text-2xl text-white mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 text-xs font-medium rounded-md bg-white/5 border border-white/10 text-cyan-400">
                    {tag}
                  </span>
                ))}
              </div>

              {/* View Gallery Button */}
              <div className="flex items-center gap-2 text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                <span>View Gallery</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
