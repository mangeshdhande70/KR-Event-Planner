import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Reveal from './Reveal';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId;
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x22d3ee, 1.5, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 1.2, 100);
    pointLight2.position.set(-20, -15, 15);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xf472b6, 0.8, 80);
    pointLight3.position.set(0, 10, -20);
    scene.add(pointLight3);

    // Colors
    const colors = [0x22d3ee, 0xa855f7, 0xf472b6];

    // Geometries factories
    const geometries = [
      () => new THREE.IcosahedronGeometry(1, 0),
      () => new THREE.BoxGeometry(1.4, 1.4, 1.4),
      () => new THREE.TorusKnotGeometry(0.8, 0.3, 64, 8),
      () => new THREE.OctahedronGeometry(1.1, 0),
      () => new THREE.TetrahedronGeometry(1.2, 0),
    ];

    const meshes = [];
    const createdGeometries = [];
    const createdMaterials = [];

    // Create 15 wireframe meshes
    for (let i = 0; i < 15; i++) {
      const geomFactory = geometries[i % geometries.length];
      const geometry = geomFactory();
      createdGeometries.push(geometry);

      const material = new THREE.MeshPhongMaterial({
        color: colors[i % colors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      createdMaterials.push(material);

      const mesh = new THREE.Mesh(geometry, material);

      const spread = 40;
      mesh.position.set(
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread * 0.6
      );

      const scale = 0.6 + Math.random() * 1.8;
      mesh.scale.set(scale, scale, scale);

      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.008,
        rotSpeedY: (Math.random() - 0.5) * 0.008,
        rotSpeedZ: (Math.random() - 0.5) * 0.004,
        floatOffset: Math.random() * Math.PI * 2,
        floatAmplitude: 0.5 + Math.random() * 1.5,
        floatSpeed: 0.3 + Math.random() * 0.5,
        origY: mesh.position.y,
      };

      scene.add(mesh);
      meshes.push(mesh);
    }

    // Particle system
    const particleCount = 800;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      particleSizes[i] = Math.random() * 2 + 0.5;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse parallax variables
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    document.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Camera parallax
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 3 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Animate meshes
      for (const mesh of meshes) {
        const d = mesh.userData;
        mesh.rotation.x += d.rotSpeedX;
        mesh.rotation.y += d.rotSpeedY;
        mesh.rotation.z += d.rotSpeedZ;
        mesh.position.y =
          d.origY + Math.sin(time * d.floatSpeed + d.floatOffset) * d.floatAmplitude;
      }

      // Rotate particles slowly
      particles.rotation.y += 0.0003;
      particles.rotation.x += 0.0001;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Memory cleanup
      createdGeometries.forEach((g) => g.dispose());
      createdMaterials.forEach((m) => m.dispose());
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" aria-hidden="true" />
      
      {/* Hero Content */}
      <div className="relative z-20 text-center max-w-[1280px] mx-auto px-5 md:px-12 pt-[72px] flex flex-col items-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-400/8 border border-cyan-400/20 text-[0.85rem] font-medium text-cyan-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse-dot"></span>
            Available for Bookings
          </div>
        </Reveal>

        <Reveal>
          <h1 className="font-display font-extrabold text-[clamp(2.75rem,7.5vw,6.5rem)] tracking-tight leading-[1.05] mb-6">
            <span className="block text-white">KR </span>
            <span className="block"><span className="gradient-text">Event</span> Planners</span>
          </h1>
        </Reveal>

        <Reveal>
          <p className="max-w-[580px] mx-auto text-gray-400 text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.7] mb-10">
            Bespoke event planning agency crafting corporate conferences, luxury weddings, and high-concept celebrations with immersive design and flawless coordination.
          </p>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="#projects"
              className="bg-white text-gray-950 px-8 py-3.5 rounded-full font-bold text-[0.938rem] transition-all duration-300 hover:bg-cyan-400 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(34,211,238,0.25)]"
            >
              View Portfolio
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-3.5 rounded-full font-bold text-[0.938rem] transition-all duration-300 hover:border-cyan-400 hover:text-cyan-400 hover:-translate-y-0.5 group"
            >
              Book Consultation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal>
          <div className="flex justify-center gap-8 md:gap-20">
            <div className="flex flex-col items-center">
              <span className="font-display font-extrabold text-[clamp(1.8rem,3vw,2.5rem)] tracking-tight gradient-text">8+</span>
              <span className="text-gray-500 text-[0.85rem] font-medium mt-1">Years Experience</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display font-extrabold text-[clamp(1.8rem,3vw,2.5rem)] tracking-tight gradient-text">120+</span>
              <span className="text-gray-500 text-[0.85rem] font-medium mt-1">Events Managed</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display font-extrabold text-[clamp(1.8rem,3vw,2.5rem)] tracking-tight gradient-text">40+</span>
              <span className="text-gray-500 text-[0.85rem] font-medium mt-1">Happy Clients</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20" aria-hidden="true">
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400 to-transparent animate-scroll-pulse origin-top"></div>
      </div>
    </section>
  );
}
