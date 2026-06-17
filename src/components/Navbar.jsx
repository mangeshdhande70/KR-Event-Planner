import React, { useState, useEffect } from 'react';
import krLogo from '../assets/kr_logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled 
          ? 'bg-[rgba(9,14,26,0.9)] border-b border-white/10' 
          : 'bg-[rgba(9,14,26,0.8)] border-b border-white/5'
      } backdrop-blur-md`}
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group" aria-label="Home">
          <img
            src={krLogo}
            alt="KR Event Planners Logo"
            className="w-10 h-10 rounded-xl object-cover border border-white/10 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-108"
          />
          <span className="font-display font-extrabold text-lg text-white tracking-tight hidden sm:block">
            Event Planners
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-9" aria-label="Primary navigation">
          <a
            href="#services"
            className="text-gray-400 text-[0.9rem] font-medium transition-colors duration-300 hover:text-cyan-400 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300"
          >
            Services
          </a>
          <a
            href="#projects"
            className="text-gray-400 text-[0.9rem] font-medium transition-colors duration-300 hover:text-cyan-400 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-gray-400 text-[0.9rem] font-medium transition-colors duration-300 hover:text-cyan-400 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300"
          >
            Contact
          </a>
          <a
            href="#contact"
            className="bg-white text-gray-950 px-6 py-2.5 rounded-full font-bold text-[0.85rem] transition-all duration-300 hover:bg-cyan-400 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(34,211,238,0.3)]"
          >
            Let's Talk
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="flex flex-col gap-1.5 w-7 py-1.5 md:hidden z-50 cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isOpen}
        >
          <span
            className={`block w-full h-0.5 bg-white rounded-sm transition-all duration-300 origin-left ${
              isOpen ? 'rotate-45 translate-y-[2px]' : ''
            }`}
          ></span>
          <span
            className={`block w-full h-0.5 bg-white rounded-sm transition-all duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          ></span>
          <span
            className={`block w-full h-0.5 bg-white rounded-sm transition-all duration-300 origin-left ${
              isOpen ? '-rotate-45 -translate-y-[2px]' : ''
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Links Overlay */}
      <div
        className={`fixed inset-0 top-[72px] bg-[rgba(9,14,26,0.98)] backdrop-blur-lg md:hidden transition-all duration-300 flex flex-col items-center justify-center gap-8 px-5 border-t border-white/5 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-6 w-full text-center">
          <a
            href="#services"
            onClick={closeMenu}
            className="text-gray-300 text-xl font-semibold hover:text-cyan-400 transition-colors py-2 block w-full"
          >
            Services
          </a>
          <a
            href="#projects"
            onClick={closeMenu}
            className="text-gray-300 text-xl font-semibold hover:text-cyan-400 transition-colors py-2 block w-full"
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={closeMenu}
            className="text-gray-300 text-xl font-semibold hover:text-cyan-400 transition-colors py-2 block w-full"
          >
            Contact
          </a>
          <a
            href="#contact"
            onClick={closeMenu}
            className="bg-white text-gray-950 px-8 py-3.5 rounded-full font-bold text-base transition-all duration-300 hover:bg-cyan-400 w-[200px]"
          >
            Let's Talk
          </a>
        </nav>
      </div>
    </header>
  );
}
