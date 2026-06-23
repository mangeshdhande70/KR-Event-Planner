import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AmbientBlobs from './components/AmbientBlobs';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EventPage from './pages/EventPage';
import Admin from './pages/Admin';

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="relative min-h-screen bg-[#030712] overflow-hidden text-[#f1f5f9] select-none">
      <AmbientBlobs />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery/:eventType" element={<EventPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
