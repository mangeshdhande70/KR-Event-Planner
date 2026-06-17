import React from 'react';
import Navbar from './components/Navbar';
import AmbientBlobs from './components/AmbientBlobs';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-[#030712] overflow-hidden text-[#f1f5f9] select-none">
      {/* Background Neon Blobs */}
      <AmbientBlobs />

      {/* Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <Services />

      {/* Projects Section */}
      <Projects />

      {/* Contact Section */}
      <Contact />

      {/* Footer copyright */}
      <Footer />
    </div>
  );
}

export default App;
