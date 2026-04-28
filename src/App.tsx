/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PrivacyPolicy from './PrivacyPolicy';
import { 
  Mic2, 
  Play, 
  Heart, 
  MessageSquare, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  Volume2,
  VolumeX,
  ChevronRight,
  Menu,
  X,
  Headphones,
  Smartphone,
  Users,
  EyeOff
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-black/40 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Mic2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">QUES</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#creators" className="hover:text-white transition-colors">Creators</a>
          <a href="#listeners" className="hover:text-white transition-colors">Listeners</a>
          <a href="#vision" className="hover:text-white transition-colors">Vision</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="px-5 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors">Log In</button>
          <button className="px-5 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-white/90 transition-all shadow-lg shadow-white/10">
            Get Started
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 md:hidden"
          >
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Features</a>
            <a href="#creators" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Creators</a>
            <a href="#listeners" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Listeners</a>
            <a href="#vision" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Vision</a>
            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <button className="w-full py-3 text-center font-medium border border-white/20 rounded-xl">Log In</button>
              <button className="w-full py-3 text-center font-medium bg-white text-black rounded-xl">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Waveform = ({ active = true }) => {
  return (
    <div className="flex items-center gap-1 h-8">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={active ? {
            height: [8, Math.random() * 24 + 8, 8],
          } : { height: 8 }}
          transition={{
            duration: 0.5 + Math.random() * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-1 bg-gradient-to-t from-violet-500 to-pink-400 rounded-full"
        />
      ))}
    </div>
  );
};

const AudioCard = ({ title, creator, category, duration, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="glass p-4 rounded-2xl flex items-center gap-4 group cursor-pointer hover:bg-white/10 transition-all"
  >
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
      <Play className="w-5 h-5 fill-white text-white" />
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-sm leading-tight">{title}</h4>
      <p className="text-xs text-white/50">{creator} • {category}</p>
    </div>
    <div className="text-xs font-mono text-white/40">{duration}</div>
  </motion.div>
);

const CategoryChip: React.FC<{ label: string }> = ({ label }) => (
  <div className="px-6 py-3 rounded-full border border-white/10 bg-white/5 whitespace-nowrap hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer text-sm font-medium">
    {label}
  </div>
);

// --- Main App ---

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-900/20 blur-[120px] animate-pulse-glow" 
        />
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-900/20 blur-[150px] animate-pulse-glow" 
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold mb-6">
              <Sparkles className="w-3 h-3" />
              <span>QUES • THE FUTURE OF AUDIO</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
              Entertaining <br />
              <span className="text-gradient">with Voice.</span>
            </h1>
            <p className="text-xl text-white/60 max-w-lg mb-10 leading-relaxed">
              In a world overwhelmed by visual content, Ques unlocks the power of voice—immersive, expressive, and interactive.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform shadow-xl shadow-white/5">
                Explore Audio
              </button>
              <button className="px-8 py-4 glass rounded-full font-bold hover:bg-white/10 transition-all">
                Become a Creator
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 glass rounded-[40px] p-8 aspect-[4/5] max-w-sm mx-auto shadow-2xl overflow-hidden border-white/20">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500" />
                  <div>
                    <p className="text-sm font-bold">Luna Whisper</p>
                    <p className="text-[10px] text-white/40">LIVE • 1.2k listening</p>
                  </div>
                </div>
                <div className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-[10px] font-bold">LIVE</div>
              </div>

              <div className="flex-1 flex flex-col justify-center items-center gap-12 py-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-violet-500/20 blur-3xl rounded-full" />
                  <div className="w-48 h-48 rounded-full border-2 border-white/10 flex items-center justify-center relative z-10">
                    <div className="w-40 h-40 rounded-full border border-white/20 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-b from-white/10 to-transparent flex items-center justify-center">
                        <Mic2 className="w-12 h-12 text-white/80" />
                      </div>
                    </div>
                  </div>
                </div>
                <Waveform />
              </div>

              <div className="mt-auto space-y-4">
                <AudioCard title="Midnight Rain Meditation" creator="Luna Whisper" category="ASMR" duration="12:45" />
                <AudioCard title="The Secret Garden" creator="Oliver Thorne" category="Storytelling" duration="08:20" delay={0.1} />
              </div>
            </div>
            
            {/* Decorative floating elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/20 blur-3xl rounded-full animate-float" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full animate-float" style={{ animationDelay: '2s' }} />
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-transparent to-indigo-950/20">
        {/* Atmospheric Background Blobs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
              Screen fatigue is real. <br />
              Attention is fragmented. <br />
              <span className="text-white/40">Connection is getting lost.</span>
            </h2>
            <div className="space-y-6 text-lg text-white/60 leading-relaxed">
              <p>
                We spend hours inside visually overloaded feeds—scrolling, tapping, skimming. Everything competes for attention, but very little actually holds it.
              </p>
              <p>
                Audio works differently. It removes the noise and brings you closer to the content—more focused, more immersive, more human.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The Platform Built for Voice.</h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">Designed for the next generation of creators and listeners who value depth over distraction.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Zap />, title: "Short-form Immersive Audio", desc: "Bite-sized stories and sounds designed to transport you instantly." },
              { icon: <MessageSquare />, title: "Custom Voice Requests", desc: "Get personalized messages, stories, or advice from your favorite voices." },
              { icon: <Users />, title: "Live 1-on-1 Interactions", desc: "Real-time voice chats that feel like late-night phone calls." },
              { icon: <DollarSign />, title: "Monetization Freedom", desc: "Subscriptions, tips, and pay-per-content. You own your value." },
              { icon: <ShieldCheck />, title: "Safe & Discreet", desc: "Privacy-first architecture for creators and listeners alike." },
              { icon: <Sparkles />, title: "90% Creator Share", desc: "We believe creators deserve the lion's share of their success." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl hover:bg-white/10 transition-all group border-white/5 hover:border-white/20"
              >
                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-6 group-hover:scale-110 group-hover:bg-violet-500/20 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Scroll */}
      <section className="py-12 border-y border-white/5 overflow-hidden">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 px-6"
        >
          {[
            "ASMR", "Storytelling", "Meditation", "Motivation", "Wellness", "Sleep", 
            "Live Voice", "Interactive Stories", "True Crime", "Poetry", 
            "Daily Affirmations", "Soundscapes", "Coaching", "After Dark", 
            "Immersive Experiences", "Guided Sessions", "Focus"
          ].map((cat, i) => (
            <CategoryChip key={i} label={cat} />
          ))}
          {/* Duplicate for seamless loop */}
          {[
            "ASMR", "Storytelling", "Meditation", "Motivation", "Wellness", "Sleep", 
            "Live Voice", "Interactive Stories", "True Crime", "Poetry", 
            "Daily Affirmations", "Soundscapes", "Coaching", "After Dark", 
            "Immersive Experiences", "Guided Sessions", "Focus"
          ].map((cat, i) => (
            <CategoryChip key={`dup-${i}`} label={cat} />
          ))}
        </motion.div>
      </section>

      {/* Creator Section */}
      <section id="creators" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1 relative">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8 shadow-2xl relative z-10"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold">Earnings Dashboard</h3>
                <div className="text-emerald-400 text-sm font-medium flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +12.5%
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs text-white/40 mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold">$4,280.00</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs text-white/40 mb-1">Active Subs</p>
                  <p className="text-2xl font-bold">184</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-violet-500/20 flex items-center justify-center text-violet-400">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <span className="text-sm">Subscription Payout</span>
                  </div>
                  <span className="text-sm font-bold">+$1,200</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-pink-500/20 flex items-center justify-center text-pink-400">
                      <Heart className="w-4 h-4" />
                    </div>
                    <span className="text-sm">Tips from Fans</span>
                  </div>
                  <span className="text-sm font-bold">+$450</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <span className="text-sm">Custom Audio Request</span>
                  </div>
                  <span className="text-sm font-bold">+$85</span>
                </div>
              </div>
            </motion.div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-violet-600/20 blur-3xl rounded-full" />
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Monetize Your Voice.</h2>
            <ul className="space-y-6">
              {[
                { title: "Subscriptions", desc: "Build a recurring income from your most loyal listeners." },
                { title: "Pay-per-content", desc: "Sell exclusive stories, ASMR sessions, or coaching clips." },
                { title: "Custom Audio", desc: "Fulfill personalized voice requests for a premium fee." },
                { title: "Live Chats", desc: "Host private or group voice sessions in real-time." },
                { title: "Tips", desc: "Receive 100% of tips from your audience. No platform cut." },
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-violet-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-white/50">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Listener Section */}
      <section id="listeners" className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gradient">Audio That Feels Personal.</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/80 flex-shrink-0">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Exclusive Short-form Audio</h4>
                  <p className="text-white/50 leading-relaxed">Discover a world of content you won't find anywhere else, curated for your specific moods.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/80 flex-shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Mood-based Discovery</h4>
                  <p className="text-white/50 leading-relaxed">Tell us how you feel, and we'll find the perfect voice to match your energy.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/80 flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Safe & Discreet</h4>
                  <p className="text-white/50 leading-relaxed">Your listening habits are your business. We ensure total privacy and security.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass rounded-[40px] p-8 aspect-[4/5] max-w-sm mx-auto shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 to-transparent pointer-events-none" />
              
              <div className="flex flex-col h-full">
                <div className="flex justify-between mb-12">
                  <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><X className="w-5 h-5" /></button>
                  <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"><Volume2 className="w-5 h-5" /></button>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center gap-8">
                  <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-indigo-500 to-pink-500 shadow-2xl shadow-violet-500/20 flex items-center justify-center">
                    <Headphones className="w-16 h-16 text-white/80" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-1">Ethereal Dreams</h3>
                    <p className="text-white/40">by Sarah Jenkins</p>
                  </div>
                  <Waveform />
                </div>

                <div className="mt-auto flex items-center justify-between gap-6">
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ['0%', '100%'] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="h-full bg-white" 
                    />
                  </div>
                  <div className="text-[10px] font-mono text-white/40">02:45 / 05:00</div>
                </div>

                <div className="flex items-center justify-center gap-8 mt-8">
                  <button className="text-white/40 hover:text-white transition-colors"><ChevronRight className="w-6 h-6 rotate-180" /></button>
                  <button className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-xl"><Play className="w-8 h-8 fill-black" /></button>
                  <button className="text-white/40 hover:text-white transition-colors"><ChevronRight className="w-6 h-6" /></button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Competitive Advantage */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Ques?</h2>
            <p className="text-white/50">A new standard for audio platforms.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-10 rounded-[40px] border-violet-500/20 bg-violet-500/5">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Zap className="text-violet-400" />
                The Ques Way
              </h3>
              <ul className="space-y-6">
                {[
                  "Audio-first experience designed for focus and immersion",
                  "Interactive storytelling with dynamic paths",
                  "Personalized discovery powered by intelligent recommendations",
                  "Creator-first economics with industry-leading payouts",
                  "Premium, culturally relevant brand positioning"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/80">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass p-10 rounded-[40px] opacity-60">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <EyeOff className="text-white/40" />
                Other Platforms
              </h3>
              <ul className="space-y-6">
                {[
                  "Visually crowded, distraction-heavy experiences",
                  "Passive, one-directional content consumption",
                  "Generic algorithms with limited personalization",
                  "High platform fees (30–50%)",
                  "Narrow or fragmented content ecosystems"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/40">
                    <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-24 px-6 bg-gradient-to-b from-indigo-950/20 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-20">A Massive, Untapped Market.</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="text-6xl md:text-7xl font-bold text-gradient">$75B+</p>
              <p className="text-xl text-white/40 uppercase tracking-widest font-medium">Global Audio Industry</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <p className="text-6xl md:text-7xl font-bold text-gradient">400%</p>
              <p className="text-xl text-white/40 uppercase tracking-widest font-medium">Growth in Premium Spoken-Word Audio</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-6xl md:text-7xl font-bold text-gradient">$100+</p>
              <p className="text-xl text-white/40 uppercase tracking-widest font-medium">Monthly Spend from High-Value Users</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">The Future of Voice.</h2>
              <div className="space-y-8">
                {[
                  { title: "AI Voice Personalization", desc: "Scale your voice with AI cloning for personalized listener experiences." },
                  { title: "Spatial Audio Immersion", desc: "3D soundscapes that place you directly in the center of the story." },
                  { title: "Choose-your-own Audio", desc: "Interactive narratives where your voice commands change the outcome." },
                  { title: "AR/VR Integration", desc: "Bringing voice intimacy to the next frontier of spatial computing." },
                ].map((vision, i) => (
                  <div key={i} className="group cursor-default">
                    <h4 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">{vision.title}</h4>
                    <p className="text-white/50 leading-relaxed">{vision.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="relative flex items-center justify-center py-20">
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="w-80 h-80 rounded-full bg-gradient-to-br from-violet-500/20 via-pink-500/20 to-indigo-500/20 blur-3xl" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-end gap-2 h-40">
                  {[...Array(24)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: [20, Math.random() * 140 + 20, 20],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{
                        duration: 1 + Math.random() * 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-2 bg-gradient-to-t from-violet-500 via-pink-400 to-white rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
              Ready to Enter the <br />
              <span className="text-gradient">World of Voice?</span>
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              Join thousands of creators and listeners redefining what it means to connect in the digital age.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl shadow-white/10">
                Join as Listener
              </button>
              <button className="px-10 py-5 glass rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Become a Creator
              </button>
            </div>
            <p className="mt-10 text-white/30 text-sm">Get early access. Limited spots available.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Mic2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white">QUES</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              The audio-first platform for short-form, immersive, and interactive voice content.
            </p>
          </div>
          
          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/60">Platform</h5>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-white transition-colors">Explore Audio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Creator Tools</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Live Rooms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/60">Company</h5>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/60">Legal</h5>
            <ul className="space-y-4 text-sm text-white/40">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Creator Agreement</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Safety Center</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-xs">
          <p>© 2026 Curiosity App Labs Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </footer>

      {/* Floating Sound Toggle */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
      >
        {isMuted ? <VolumeX className="w-5 h-5 text-white/60" /> : <Volume2 className="w-5 h-5 text-white" />}
      </button>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}
