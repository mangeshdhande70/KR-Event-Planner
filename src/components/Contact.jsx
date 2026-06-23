import React, { useState } from 'react';
import Reveal from './Reveal';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', eventType: 'Wedding', eventDate: '', eventDetails: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      const response = await fetch(`${baseUrl}/api/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to send inquiry. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-32">
      <div className="max-w-[1280px] mx-auto px-5 md:px-12">
        <Reveal>
          <div className="glass-card rounded-[32px] p-10 md:p-16 relative overflow-hidden">
            {/* Ambient inner blobs */}
            <div className="absolute rounded-full blur-[80px] pointer-events-none w-[300px] h-[300px] bg-cyan-glow/10 -top-[80px] -right-[60px]" aria-hidden="true"></div>
            <div className="absolute rounded-full blur-[80px] pointer-events-none w-[250px] h-[250px] bg-purple-glow/8 -bottom-[60px] -left-[40px]" aria-hidden="true"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* Left — Text Content */}
              <div>
                <span className="inline-block text-cyan-400 font-bold text-[0.8rem] uppercase tracking-[0.15em] mb-4">
                  Get in Touch
                </span>
                <h2 className="font-display font-extrabold text-[clamp(2rem,5vw,3.8rem)] tracking-tight leading-[1.1] text-white mb-5 mt-2">
                  Let's Create<br />Something <span className="gradient-text">Extraordinary</span>
                </h2>
                <p className="text-gray-400 text-[1.05rem] leading-[1.75] mb-10">
                  Have an event in mind? We'd love to hear about it. Let's discuss how we can bring your vision to life with flawless coordination and premium design.
                </p>

                {/* Meta Details — 2×2 grid, no Timezone */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-gray-500 font-extrabold text-[0.72rem] uppercase tracking-[0.15em] flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      Email
                    </span>
                    <a href="mailto:hello@kreventplanners.com" className="text-gray-300 font-medium text-[0.88rem] hover:text-cyan-400 transition-colors break-all">
                      hello@kreventplanners.com
                    </a>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-gray-500 font-extrabold text-[0.72rem] uppercase tracking-[0.15em] flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      Phone
                    </span>
                    <a href="tel:+917028814871" className="text-gray-300 font-medium text-[0.88rem] hover:text-purple-400 transition-colors">
                      +91 7028814871
                    </a>
                  </div>

                  {/* Instagram */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-gray-500 font-extrabold text-[0.72rem] uppercase tracking-[0.15em] flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                      Instagram
                    </span>
                    <a href="https://instagram.com/kr_event_planner" target="_blank" rel="noopener noreferrer" className="text-gray-300 font-medium text-[0.88rem] hover:text-pink-400 transition-colors">
                      @kr_event_planner
                    </a>
                  </div>

                  {/* Location */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-gray-500 font-extrabold text-[0.72rem] uppercase tracking-[0.15em] flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      Location
                    </span>
                    <span className="text-gray-300 font-medium text-[0.88rem]">Nagpur, Maharashtra</span>
                  </div>
                </div>
              </div>

              {/* Right — Contact Form */}
              <div>
                {submitted ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[340px] text-center gap-4 py-8">
                    <div className="w-16 h-16 rounded-full bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center mb-2">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="font-display font-bold text-2xl text-white">Message Sent!</h3>
                    <p className="text-gray-400 text-base max-w-[280px]">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', eventType: 'Wedding', eventDate: '', eventDetails: '' }); }}
                      className="mt-3 text-cyan-400 text-sm font-semibold hover:underline transition-all"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <h3 className="font-display font-bold text-xl text-white mb-1">Start a Conversation</h3>

                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-gray-400 text-[0.8rem] font-semibold uppercase tracking-wider">
                        Your Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-[0.95rem] focus:outline-none focus:border-cyan-400/50 focus:bg-white/8 transition-all duration-200"
                      />
                    </div>

                    {/* Email + Phone side by side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-gray-400 text-[0.8rem] font-semibold uppercase tracking-wider">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="jane@company.com"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-[0.95rem] focus:outline-none focus:border-cyan-400/50 focus:bg-white/8 transition-all duration-200"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="text-gray-400 text-[0.8rem] font-semibold uppercase tracking-wider">
                          Phone
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 8078965352"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-[0.95rem] focus:outline-none focus:border-purple-400/50 focus:bg-white/8 transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Event Type + Event Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Event Type */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="eventType" className="text-gray-400 text-[0.8rem] font-semibold uppercase tracking-wider">
                          Event Type
                        </label>
                        <select
                          id="eventType"
                          name="eventType"
                          value={form.eventType}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 focus:bg-white/8 transition-all cursor-pointer"
                        >
                          <option className="bg-[#0f172a]" value="Wedding">Wedding</option>
                          <option className="bg-[#0f172a]" value="Corporate">Corporate</option>
                          <option className="bg-[#0f172a]" value="Birthday">Birthday</option>
                          <option className="bg-[#0f172a]" value="Baby Shower">Baby Shower</option>
                          <option className="bg-[#0f172a]" value="Ring Ceremony">Ring Ceremony</option>
                          <option className="bg-[#0f172a]" value="Theme Party">Theme Party</option>
                          <option className="bg-[#0f172a]" value="Other">Other</option>
                        </select>
                      </div>

                      {/* Event Date */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="eventDate" className="text-gray-400 text-[0.8rem] font-semibold uppercase tracking-wider">
                          Event Date
                        </label>
                        <input
                          id="eventDate"
                          name="eventDate"
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={form.eventDate}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400/50 focus:bg-white/8 transition-all cursor-pointer [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="eventDetails" className="text-gray-400 text-[0.8rem] font-semibold uppercase tracking-wider">
                        Tell us about your event
                      </label>
                      <textarea
                        id="eventDetails"
                        name="eventDetails"
                        required
                        rows={4}
                        placeholder="Describe your event — type, date, guest count, vision…"
                        value={form.eventDetails}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-[0.95rem] focus:outline-none focus:border-cyan-400/50 focus:bg-white/8 transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="text-red-400 text-sm bg-red-950/30 border border-red-500/20 rounded-xl px-4 py-3">
                        {error}
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-1 inline-flex items-center justify-center gap-2 bg-white text-gray-950 px-8 py-3.5 rounded-full font-bold text-[0.95rem] transition-all duration-300 hover:bg-cyan-400 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(34,211,238,0.25)] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
