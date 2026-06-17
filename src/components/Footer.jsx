import React from 'react';

export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/5 bg-[#030712]/40 relative z-20">
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <span className="text-gray-500 text-[0.875rem]">
          &copy; 2026 KR Event Planners. All rights reserved.
        </span>
        <div className="flex gap-6 text-[0.9rem] font-medium text-gray-400">
          <a href="#" className="hover:text-cyan-400 transition-colors duration-300">
            GitHub
          </a>
          <a href="#" className="hover:text-cyan-400 transition-colors duration-300">
            Twitter
          </a>
          <a href="#" className="hover:text-cyan-400 transition-colors duration-300">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
