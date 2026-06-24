import React, { useState, useEffect } from 'react';
import Reveal from '../components/Reveal';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Dashboard Navigation State: 'menu' | 'inquiries' | 'upload'
  const [activeView, setActiveView] = useState('menu');

  // Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState('');

  // Inquiries Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Upload State
  const [uploadCategory, setUploadCategory] = useState('Wedding');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Manage Images State
  const [manageCategory, setManageCategory] = useState('Wedding');
  const [adminImages, setAdminImages] = useState([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState('');

  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem('adminSession');
    if (session === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsLoggedIn(true);
        localStorage.setItem('adminSession', 'true');
      } else {
        setLoginError(data.message || 'Invalid username or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginError('Server connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchInquiries = async () => {
    setFetching(true);
    setFetchError('');
    try {
      const response = await fetch(`${baseUrl}/api/inquiries`);
      if (!response.ok) {
        throw new Error('Failed to fetch inquiries.');
      }
      const data = await response.json();
      // Sort inquiries by newest first (created date)
      const sorted = data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setInquiries(sorted);
      setCurrentPage(1); // Reset page to 1
    } catch (err) {
      console.error('Fetch error:', err);
      setFetchError(err.message || 'Could not load inquiries.');
    } finally {
      setFetching(false);
    }
  };

  const fetchAdminImages = async (category) => {
    setAdminLoading(true);
    setAdminError('');
    try {
      const response = await fetch(`${baseUrl}/api/images/getImages/${category}`);
      if (!response.ok) throw new Error('Failed to fetch images');
      const data = await response.json();
      if (data.images) {
        setAdminImages(data.images);
      } else {
        setAdminImages([]);
      }
    } catch (err) {
      setAdminError(err.message || 'Could not load images');
    } finally {
      setAdminLoading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      const response = await fetch(`${baseUrl}/api/images/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete image');
      }
      setAdminImages(adminImages.filter(img => img.id !== id));
    } catch (err) {
      alert("Error deleting image: " + err.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`${baseUrl}/api/inquiries/${id}/status?status=${newStatus}`, {
        method: 'PUT'
      });
      if (!response.ok) throw new Error('Failed to update status');
      
      setInquiries(inquiries.map(inq => 
        inq.id === id ? { ...inq, status: newStatus } : inq
      ));
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  useEffect(() => {
    if (activeView === 'manageImages') {
      fetchAdminImages(manageCategory);
    }
  }, [activeView, manageCategory]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminSession');
    setActiveView('menu');
    setCredentials({ username: '', password: '' });
  };
  
  // Sync active view with URL
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    if (path.endsWith('/inquiries')) setActiveView('inquiries');
    else if (path.endsWith('/upload')) setActiveView('upload');
    else if (path.endsWith('/manageImages')) setActiveView('manageImages');
    else setActiveView('menu');
  }, [location.pathname]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInquiries = inquiries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(inquiries.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Upload Simulation
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return;

    setUploading(true);
    setUploadSuccess(false);

    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('eventType', uploadCategory);

        const response = await fetch(`${baseUrl}/api/images/upload`, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || 'Upload failed');
        }
        return response.json();
      });

      await Promise.all(uploadPromises);

      setUploadSuccess(true);
      setSelectedFiles([]);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading images: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="absolute rounded-full blur-[120px] pointer-events-none w-[350px] h-[350px] bg-cyan-glow/15 top-1/4 left-1/4" aria-hidden="true"></div>
        <div className="absolute rounded-full blur-[120px] pointer-events-none w-[300px] h-[300px] bg-purple-glow/10 bottom-1/4 right-1/4" aria-hidden="true"></div>

        <div className="w-full max-w-[440px] z-10">
          <Reveal>
            <div className="glass-card rounded-[28px] p-8 md:p-10 relative overflow-hidden border border-white/10">
              <div className="flex flex-col items-center mb-8">
                <span className="text-cyan-400 font-bold text-[0.8rem] uppercase tracking-[0.2em] mb-2">
                  KR Event Planner
                </span>
                <h2 className="font-display font-extrabold text-3xl tracking-tight text-white">
                  Admin <span className="gradient-text">Portal</span>
                </h2>
                <p className="text-gray-500 text-sm mt-2">Sign in to manage your website</p>
              </div>

              {loginError && (
                <div className="mb-5 text-red-400 text-sm bg-red-950/30 border border-red-500/20 rounded-xl px-4 py-3">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="username" className="text-gray-400 text-[0.8rem] font-semibold uppercase tracking-wider">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder="Enter admin username"
                    value={credentials.username}
                    onChange={handleLoginChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-[0.95rem] focus:outline-none focus:border-cyan-400/50 focus:bg-white/8 transition-all duration-200"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-gray-400 text-[0.8rem] font-semibold uppercase tracking-wider">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Enter password"
                    value={credentials.password}
                    onChange={handleLoginChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-[0.95rem] focus:outline-none focus:border-purple-400/50 focus:bg-white/8 transition-all duration-200"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-white text-gray-950 py-3.5 rounded-full font-bold text-[0.95rem] transition-all duration-300 hover:bg-cyan-400 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(34,211,238,0.25)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                      </svg>
                      Authenticating…
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 md:px-12 relative">
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute rounded-full blur-[140px] pointer-events-none w-[400px] h-[400px] bg-cyan-glow/10 -top-20 -left-20" aria-hidden="true"></div>
      <div className="absolute rounded-full blur-[140px] pointer-events-none w-[400px] h-[400px] bg-purple-glow/8 bottom-20 right-0" aria-hidden="true"></div>

      <div className="max-w-[1280px] mx-auto z-10 relative flex flex-col gap-8">

        {/* Unified Admin Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="text-cyan-400 font-extrabold text-[0.75rem] uppercase tracking-[0.2em]">
              Control Panel
            </span>
            <h1 className="font-display font-extrabold text-3.5xl tracking-tight text-white mt-1">
              Admin <span className="gradient-text">Dashboard</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {activeView !== 'menu' && (
              <button
                onClick={() => navigate('/admin')}
                className="px-5 py-2 rounded-full border border-white/10 text-gray-300 text-sm font-semibold hover:bg-white/5 transition-all flex items-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Dashboard Menu
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition-all duration-300"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* VIEW 1: Dashboard Navigation Grid */}
        {activeView === 'menu' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">

            {/* Card 1: Inquiries */}
            <div
              onClick={() => { navigate('inquiries'); fetchInquiries(); }}
              className="glass-card rounded-[24px] p-8 border border-white/5 hover:border-cyan-400/30 hover:shadow-[0_15px_40px_rgba(34,211,238,0.1)] transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-400 transition-colors">
                  Get All Inquiries
                </h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  Review, read, and manage client inquiries submitted via your contact forms.
                </p>
              </div>
              <span className="text-cyan-400 text-sm font-semibold flex items-center gap-1.5 mt-4 self-start">
                Open Inquiries
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            {/* Card 2: Upload Images */}
            <div
              onClick={() => { navigate('upload'); setUploadSuccess(false); }}
              className="glass-card rounded-[24px] p-8 border border-white/5 hover:border-purple-400/30 hover:shadow-[0_15px_40px_rgba(168,85,247,0.1)] transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-xl text-white group-hover:text-purple-400 transition-colors">
                  Upload Images
                </h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  Add high-quality gallery photos directly to specific event categories.
                </p>
              </div>
              <span className="text-purple-400 text-sm font-semibold flex items-center gap-1.5 mt-4 self-start">
                Open Uploader
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            {/* Card 3: Event Management */}
            <div
              onClick={() => alert("Event Management Coming Soon!")}
              className="glass-card rounded-[24px] p-8 border border-white/5 hover:border-pink-400/30 hover:shadow-[0_15px_40px_rgba(244,63,94,0.1)] transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-pink-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-400">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-xl text-white group-hover:text-pink-400 transition-colors">
                  Manage Events
                </h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  Edit descriptions, categories, and organize pricing models for event packages.
                </p>
              </div>
              <span className="text-pink-400 text-sm font-semibold flex items-center gap-1.5 mt-4 self-start">
                Configure Packages
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            {/* Card 4: Manage Images */}
            <div
              onClick={() => { navigate('manageImages'); setAdminError(''); setAdminImages([]); setManageCategory('Wedding'); }}
              className="glass-card rounded-[24px] p-8 border border-white/5 hover:border-blue-400/30 hover:shadow-[0_15px_40px_rgba(59,130,246,0.1)] transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-xl text-white group-hover:text-blue-400 transition-colors">
                  Manage Images
                </h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  View, delete, and organize event gallery images directly.
                </p>
              </div>
              <span className="text-blue-400 text-sm font-semibold flex items-center gap-1.5 mt-4 self-start">
                Open Gallery
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>

          </div>
        )}

        {/* VIEW 2: Inquiries Panel with Pagination */}
        {activeView === 'inquiries' && (
          <div className="flex flex-col gap-6">

            {/* Top Toolbar */}
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                Inquiry Messages ({inquiries.length})
              </h2>
              <button
                onClick={fetchInquiries}
                disabled={fetching}
                className="px-4 py-2 rounded-full border border-white/10 text-gray-300 text-sm font-semibold hover:bg-white/5 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <svg className={fetching ? 'animate-spin' : ''} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
                Sync List
              </button>
            </div>

            {fetching && inquiries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-4 bg-white/5 rounded-3xl border border-white/5">
                <svg className="animate-spin text-cyan-400" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                </svg>
                <p className="font-medium">Downloading inquiry database...</p>
              </div>
            ) : fetchError ? (
              <div className="text-center py-16 bg-red-950/15 border border-red-500/10 rounded-3xl">
                <p className="text-red-400 mb-4 font-semibold">{fetchError}</p>
                <button
                  onClick={fetchInquiries}
                  className="px-6 py-2.5 rounded-full bg-white text-gray-950 font-bold hover:bg-cyan-400 transition-all"
                >
                  Reload Connection
                </button>
              </div>
            ) : inquiries.length === 0 ? (
              <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
                <p className="text-gray-400 text-lg">No inquiries received yet.</p>
              </div>
            ) : (
              <>
                {/* List Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="glass-card rounded-[22px] p-6 border border-white/5 hover:border-cyan-400/20 hover:shadow-[0_8px_30px_rgba(34,211,238,0.05)] transition-all duration-300">
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <div className="flex flex-col items-start gap-1">
                          <h3 className="font-bold text-[1.1rem] text-white tracking-wide">{inquiry.name}</h3>
                          <p className="text-gray-400 text-xs">{inquiry.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="inline-block text-[0.65rem] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded border border-white/10 text-gray-300 bg-white/5">
                              {inquiry.eventType || 'General'}
                            </span>
                            {inquiry.eventDate && (
                              <span className="inline-block text-[0.65rem] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded border border-purple-400/20 text-purple-300 bg-purple-400/10">
                                Event Date: {new Date(inquiry.eventDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-[0.72rem] text-cyan-400 font-semibold bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
                            {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            }) : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 text-sm text-gray-300 border-t border-white/5 pt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 font-semibold w-16">Phone:</span>
                            <a href={`tel:${inquiry.phone}`} className="hover:text-cyan-400 transition-colors font-medium">{inquiry.phone}</a>
                          </div>
                          <div className="flex items-center gap-2 sm:justify-end">
                            <span className="text-gray-500 font-semibold text-xs">Status:</span>
                            <select
                              value={inquiry.status || 'New'}
                              onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                              className={`bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs font-bold focus:outline-none focus:border-cyan-400/50 transition-all cursor-pointer ${
                                (inquiry.status || 'New') === 'New' ? 'text-blue-400' :
                                (inquiry.status === 'In-progress') ? 'text-yellow-400' :
                                (inquiry.status === 'Done') ? 'text-green-400' :
                                'text-red-400'
                              }`}
                            >
                              <option className="bg-[#0f172a] text-blue-400" value="New">New</option>
                              <option className="bg-[#0f172a] text-yellow-400" value="In-progress">In-progress</option>
                              <option className="bg-[#0f172a] text-green-400" value="Done">Done</option>
                              <option className="bg-[#0f172a] text-red-400" value="Rejected">Rejected</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 mt-2">
                          <span className="text-gray-500 font-semibold">Event Details:</span>
                          <p className="bg-white/5 rounded-xl p-3 text-gray-200 mt-1.5 whitespace-pre-wrap leading-relaxed border border-white/5 text-[0.9rem]">
                            {inquiry.eventDetails}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8 pb-4">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-300 hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${currentPage === pageNumber
                            ? 'bg-cyan-400 text-gray-950 shadow-[0_4px_15px_rgba(34,211,238,0.25)]'
                            : 'border border-white/10 text-gray-300 hover:bg-white/5'
                          }`}
                      >
                        {pageNumber}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-300 hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* VIEW 3: Upload Images view */}
        {activeView === 'upload' && (
          <div className="max-w-[700px] mx-auto w-full mt-4">
            <Reveal>
              <div className="glass-card rounded-[28px] p-8 md:p-10 border border-white/10 relative overflow-hidden">
                <div className="flex flex-col gap-1 mb-8">
                  <h2 className="font-display font-bold text-2xl text-white">
                    Upload Event Images
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Populate your public event galleries with visual setups
                  </p>
                </div>

                {uploadSuccess && (
                  <div className="mb-6 text-green-400 text-sm bg-green-950/20 border border-green-500/30 rounded-xl px-4 py-3 flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    Images uploaded successfully.
                  </div>
                )}

                <form onSubmit={handleUploadSubmit} className="flex flex-col gap-6">

                  {/* Category Dropdown */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="uploadCategory" className="text-gray-400 text-[0.8rem] font-semibold uppercase tracking-wider">
                      Event Category
                    </label>
                    <select
                      id="uploadCategory"
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-400/50 transition-all cursor-pointer"
                    >
                      <option className="bg-[#0f172a]" value="Wedding">Wedding</option>
                      <option className="bg-[#0f172a]" value="Corporate">Corporate</option>
                      <option className="bg-[#0f172a]" value="Birthday">Birthday</option>
                      <option className="bg-[#0f172a]" value="Baby Shower">Baby Shower</option>
                      <option className="bg-[#0f172a]" value="Ring Ceremony">Ring Ceremony</option>
                      <option className="bg-[#0f172a]" value="Theme Party">Theme Party</option>
                    </select>
                  </div>

                  {/* Drag and Drop Zone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-400 text-[0.8rem] font-semibold uppercase tracking-wider">
                      Upload Files
                    </label>
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 transition-all duration-300 ${dragActive
                          ? 'border-purple-400 bg-purple-400/10'
                          : 'border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/8'
                        }`}
                    >
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                      </svg>

                      <div className="text-center">
                        <p className="text-white font-medium">
                          Drag and drop your images here
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          PNG, JPG or JPEG up to 10MB
                        </p>
                      </div>

                      <label className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-xs font-bold cursor-pointer text-white transition-all">
                        Browse Files
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Selected Files List */}
                    {selectedFiles.length > 0 && (
                      <div className="bg-white/5 border border-white/5 rounded-xl p-4 mt-2">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">
                          Files to Upload ({selectedFiles.length})
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {selectedFiles.map((file, idx) => (
                            <li key={idx} className="text-sm text-gray-300 flex items-center justify-between">
                              <span className="truncate max-w-[280px]">{file.name}</span>
                              <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Upload Button */}
                  <button
                    type="submit"
                    disabled={uploading || selectedFiles.length === 0}
                    className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-white text-gray-950 py-3.5 rounded-full font-bold text-[0.95rem] transition-all duration-300 hover:bg-purple-400 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(168,85,247,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
                        </svg>
                        Uploading images...
                      </>
                    ) : (
                      "Upload Images"
                    )}
                  </button>

                </form>
              </div>
            </Reveal>
          </div>
        )}

        {/* VIEW 4: Manage Images view */}
        {activeView === 'manageImages' && (
          <div className="flex flex-col gap-6 mt-4">
            <Reveal>
              <div className="glass-card rounded-[28px] p-8 md:p-10 border border-white/10 relative overflow-hidden">
                <div className="flex flex-col gap-1 mb-8">
                  <h2 className="font-display font-bold text-2xl text-white">
                    Manage Event Images
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Select a category to view and delete images.
                  </p>
                </div>

                <div className="flex flex-col gap-2 mb-8 max-w-[300px]">
                  <label htmlFor="manageCategory" className="text-gray-400 text-[0.8rem] font-semibold uppercase tracking-wider">
                    Event Category
                  </label>
                  <select
                    id="manageCategory"
                    value={manageCategory}
                    onChange={(e) => setManageCategory(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-400/50 transition-all cursor-pointer"
                  >
                    <option className="bg-[#0f172a]" value="Wedding">Wedding</option>
                    <option className="bg-[#0f172a]" value="Corporate">Corporate</option>
                    <option className="bg-[#0f172a]" value="Birthday">Birthday</option>
                    <option className="bg-[#0f172a]" value="Baby Shower">Baby Shower</option>
                    <option className="bg-[#0f172a]" value="Ring Ceremony">Ring Ceremony</option>
                    <option className="bg-[#0f172a]" value="Theme Party">Theme Party</option>
                  </select>
                </div>

                {adminLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
                ) : adminError ? (
                  <div className="text-center py-16 bg-red-950/15 border border-red-500/10 rounded-3xl">
                    <p className="text-red-400 mb-4 font-semibold">{adminError}</p>
                    <button
                      onClick={() => fetchAdminImages(manageCategory)}
                      className="px-6 py-2.5 rounded-full bg-white text-gray-950 font-bold hover:bg-blue-400 transition-all"
                    >
                      Retry
                    </button>
                  </div>
                ) : adminImages.length === 0 ? (
                  <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
                    <p className="text-gray-400 text-lg">No images found for this category.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {adminImages.map((img) => (
                      <div key={img.id} className="relative group rounded-xl overflow-hidden bg-white/5 border border-white/10 flex flex-col h-full">
                        <div className="aspect-square w-full overflow-hidden">
                          <img
                            src={img.imageUrl}
                            alt={`Image ${img.id}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-4 flex justify-between items-center bg-[#090e1a]/80 backdrop-blur-md">
                          <span className="text-xs text-gray-400 font-medium">ID: {img.id}</span>
                          <button
                            onClick={() => handleDeleteImage(img.id)}
                            className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 border border-red-500/20 hover:border-red-500 text-xs font-bold rounded-lg transition-all duration-300"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        )}

      </div>
    </div>
  );
}
