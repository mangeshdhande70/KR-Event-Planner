import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { eventsData } from '../data/eventsData';
import EventGallery from '../components/EventGallery';
import Footer from '../components/Footer';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const EVENT_TYPE_MAP = {
  'corporate-events': 'Corporate',
  'luxury-weddings': 'Wedding',
  'theme-parties': 'Theme Party',
  'birthday-parties': 'Birthday',
  'ring-ceremony': 'Ring Ceremony',
  'baby-shower': 'Baby Shower'
};

export default function EventPage() {
  const { eventType } = useParams();
  const navigate = useNavigate();
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Find event metadata
  const event = eventsData.find(e => e.id === eventType);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [eventType]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!event) return;

    let ignore = false;
    const controller = new AbortController();

    const fetchImages = async () => {
      setLoading(true);
      try {
        const apiEventType = EVENT_TYPE_MAP[eventType] || 'Wedding';
        const response = await fetch(`${baseUrl}/api/images/getImages/${apiEventType}`, {
          signal: controller.signal
        });
        if (response.ok) {
          const data = await response.json();
          if (!ignore) {
            if (data.images && data.images.length > 0) {
              const fetchedGallery = data.images.map((img, index) => ({
                id: img.id ? img.id.toString() : `${apiEventType}-${index}`,
                src: img.imageUrl,
                alt: `${apiEventType} Image ${index + 1}`,
                category: 'Gallery',
                dbId: img.id
              }));
              setGalleryImages(fetchedGallery);
            } else {
              setGalleryImages(event.gallery);
            }
          }
        } else {
          if (!ignore) setGalleryImages(event.gallery);
        }
      } catch (error) {
        if (!ignore && error.name !== 'AbortError') {
          console.error('Error fetching images:', error);
          setGalleryImages(event.gallery);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchImages();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [eventType]);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-5">
        <h1 className="text-4xl font-display font-bold mb-4">Event Not Found</h1>
        <p className="text-gray-400 mb-8">We couldn't find the event you're looking for.</p>
        <Link
          to="/"
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-full transition-colors"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-[#f1f5f9] select-none">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(9,14,26,0.8)] backdrop-blur-md border-b border-white/5 h-[72px] flex items-center">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12 w-full flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:-translate-x-1 transition-transform">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="font-medium text-sm">Back to Home</span>
          </button>
        </div>
      </header>

      <main className="pt-[72px] pb-20">
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={event.heroImage}
              alt={event.title}
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-[#030712]/30" />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at center, #06b6d4 0%, transparent 70%)`
              }}
            />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto px-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-bold tracking-widest uppercase mb-6 text-cyan-400"
              >
                {event.tagline}
              </span>
              <h1 className="font-display font-extrabold text-[clamp(2.5rem,5vw,4.5rem)] tracking-tight leading-none mb-6">
                {event.title}
              </h1>
              <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                {event.description}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-5 md:px-12 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <h2 className="font-display font-bold text-3xl">Event Gallery</h2>
              <div className="h-px flex-grow bg-white/10" />
            </div>
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
              </div>
            ) : (
              <EventGallery images={galleryImages} />
            )}
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
