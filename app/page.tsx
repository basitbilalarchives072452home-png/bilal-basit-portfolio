'use client';

import React, { useState, useEffect } from 'react';

export default function BilalBasitPortfolio() {
  const [time, setTime] = useState('');
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  // Google Apps Script Web App URL
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwDdfLjz0vUdwQ_rA6nZh7Q_pyNr12peDyVIq4TjOWfduPahoMsREowZtiZuJOQkdH9/exec";

  // Live Islamabad Clock Timer & Custom Cursor Physics
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(clockInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('bilalbasitrehmanofficial@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Form Submission with Native Math Captcha & Apps Script Integration
  const submitProjectBrief = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const captchaInput = (document.getElementById('captcha-answer') as HTMLInputElement).value;
    if (parseInt(captchaInput) !== 8) {
      alert("Security Check Failed: Please answer the math question correctly!");
      return;
    }

    const payload = {
      scope: "Custom Portfolio Project",
      name: (document.getElementById('client-name') as HTMLInputElement)?.value || "Bilal Basit",
      email: (document.getElementById('client-email') as HTMLInputElement)?.value || "bilalbasitrehmanofficial@gmail.com",
      budget: "$1k to $3k",
      timeline: "2 to 4 weeks",
      details: (document.getElementById('project-details') as HTMLTextAreaElement)?.value || "Direct portfolio inquiry"
    };

    fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(() => {
      alert("Brief sent successfully! Data saved and notification sent to your email.");
      (document.getElementById('brief-form') as HTMLFormElement).reset();
    })
    .catch((error) => {
      console.error('Error!', error);
      alert("Something went wrong. Please try again.");
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      {/* Custom Magnetic Cursor */}
      <div 
        className="fixed pointer-events-none w-8 h-8 rounded-full border border-indigo-500/50 transition-transform duration-75 ease-out z-50 flex items-center justify-center"
        style={{ left: `${cursorPos.x - 16}px`, top: `${cursorPos.y - 16}px`, transform: isHovered ? 'scale(1.8)' : 'scale(1)' }}
      >
        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
      </div>

      {/* Floating Glassmorphic Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-5xl bg-slate-950/60 backdrop-blur-md border border-slate-800/80 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-bold text-sm tracking-wider">BB</div>
          <span className="text-xs font-mono tracking-widest text-slate-400 hidden sm:inline">BILAL BASIT</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
          <a href="#work" className="hover:text-indigo-400 transition-colors">Work</a>
          <a href="#capabilities" className="hover:text-indigo-400 transition-colors">Capabilities</a>
          <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl text-indigo-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          ISB, PK • {time || 'Loading...'}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <span className="text-indigo-400 font-mono text-xs tracking-widest uppercase block mb-3">// 01. FRONT-END ARCHITECT & FOUNDER @ APEX WEB STUDIO</span>
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mb-6 leading-tight">
          Engineering Digital Experiences That Command Authority.
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mb-10">
          Building high-performance web applications and responsive frontend architectures using React, Next.js, and modern TypeScript frameworks.
        </p>
      </section>

      {/* Contact & Brief Submission Section */}
      <section id="contact" className="py-24 px-6 max-w-4xl mx-auto border-t border-white/10 text-center">
        <span className="text-indigo-400 font-mono text-xs tracking-widest uppercase block mb-3">// 06. INITIATE CONTACT</span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6">Let's Build Something Exceptional.</h2>
        <p className="text-slate-400 text-sm mb-10 max-w-lg mx-auto">
          Reach out directly via email or submit a project brief below to connect with our engineering team.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button 
            onClick={copyEmail}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 w-full sm:w-auto"
          >
            {copied ? 'Email Copied to Clipboard ✓' : 'Copy Direct Email Address'}
          </button>
        </div>

        {/* Backend Connected Form with Math Captcha */}
        <form id="brief-form" onSubmit={submitProjectBrief} className="mt-8 flex flex-col gap-5 max-w-md mx-auto text-left bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-mono">Your Name</label>
            <input type="text" id="client-name" defaultValue="Bilal Basit" required className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-white text-sm outline-none focus:border-indigo-500" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-mono">Your Email</label>
            <input type="email" id="client-email" defaultValue="bilalbasitrehmanofficial@gmail.com" required className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-white text-sm outline-none focus:border-indigo-500" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-mono">Project Details / Scope</label>
            <textarea id="project-details" placeholder="What are you building?" rows={3} required className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-white text-sm outline-none focus:border-indigo-500 resize-none" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-mono">Security Check: What is 5 + 3?</label>
            <input type="number" id="captcha-answer" placeholder="Enter answer (8)" required className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-white text-sm outline-none focus:border-indigo-500" />
          </div>

          <button type="submit" className="mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:opacity-90 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/20 text-center">
            Send Project Brief
          </button>
        </form>
      </section>
    </div>
  );
}
