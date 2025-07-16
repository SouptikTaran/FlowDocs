'use client';

import React, { useState } from 'react';
import {
  Users, Zap, Shield, Globe, ArrowRight, Menu, X, FileText, Edit3, Clock
} from 'lucide-react';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const Homepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Real-time Collaboration",
      description: "Work together seamlessly with live cursors, instant updates, and synchronized editing across all devices.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Performance",
      description: "Experience instant loading and real-time synchronization with our optimized cloud infrastructure.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-grade encryption, SSO integration, and compliance with industry security standards.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Access",
      description: "Access your documents from anywhere with our reliable cloud-based platform.",
    },
    {
      icon: <Edit3 className="w-8 h-8" />,
      title: "Rich Text Editor",
      description: "Powerful editing tools with formatting options, comments, and collaborative annotations.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Version History",
      description: "Track changes, restore previous versions, and never lose your work with automatic backups.",
    },
  ];

  const stats = [
    { label: "Active Users", value: "50K+" },
    { label: "Documents Created", value: "2M+" },
    { label: "Teams Collaborating", value: "10K+" },
    { label: "Uptime", value: "99.9%" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-[#cbd5e1]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/90 backdrop-blur-md border-b border-[#1e293b] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#1e3a8a] to-[#4f46e5] rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">LiveDocs</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-[#94a3b8] hover:text-white font-medium">Features</a>
              <a href="#pricing" className="text-[#94a3b8] hover:text-white font-medium">Pricing</a>
              <a href="#about" className="text-[#94a3b8] hover:text-white font-medium">About</a>
              <a href="#contact" className="text-[#94a3b8] hover:text-white font-medium">Contact</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <SignedOut>
                <SignInButton>
                  <button className="text-[#94a3b8] hover:text-white font-medium">Sign In</button>
                </SignInButton>
                <SignUpButton>
                  <button className="bg-gradient-to-r from-[#1e3a8a] to-[#4f46e5] text-white px-4 py-2 rounded-lg hover:from-[#1e40af] hover:to-[#6366f1] font-medium">Get Started</button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
                <button
                  className="ml-4 bg-gradient-to-r from-green-600 to-green-400 text-white px-4 py-2 rounded-lg font-medium"
                  onClick={() => router.push('/dashboard')}
                >
                  Go to Dashboard
                </button>
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#0a0f1a] border-t border-[#1e293b]">
            <div className="px-4 py-2 space-y-2">
              <a href="#features" className="block py-2 text-[#94a3b8] hover:text-white">Features</a>
              <a href="#pricing" className="block py-2 text-[#94a3b8] hover:text-white">Pricing</a>
              <a href="#about" className="block py-2 text-[#94a3b8] hover:text-white">About</a>
              <a href="#contact" className="block py-2 text-[#94a3b8] hover:text-white">Contact</a>
              <div className="pt-4 space-y-2">
                <SignedOut>
                  <SignInButton>
                    <button className="w-full text-left py-2 text-[#94a3b8] hover:text-white">Sign In</button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#4f46e5] text-white px-4 py-2 rounded-lg hover:from-[#1e40af] hover:to-[#6366f1]">Get Started</button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                  <button
                    className="w-full mt-2 bg-gradient-to-r from-green-600 to-green-400 text-white px-4 py-2 rounded-lg font-medium"
                    onClick={() => router.push('/dashboard')}
                  >
                    Go to Dashboard
                  </button>
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 bg-[#0a0f1a] text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            The Future of <span className="bg-gradient-to-r from-[#1e3a8a] to-[#4f46e5] bg-clip-text text-transparent">Collaborative</span>
            <br />Documentation
          </h1>
          <p className="text-xl text-[#94a3b8] mb-8">Experience seamless real-time collaboration with LiveDocs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedOut>
              <SignUpButton>
                <button className="bg-gradient-to-r from-[#1e3a8a] to-[#4f46e5] text-white px-8 py-4 rounded-lg hover:from-[#1e40af] hover:to-[#6366f1] font-semibold text-lg">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </button>
              </SignUpButton>
              <SignInButton>
                <button className="bg-white text-[#0a0f1a] px-8 py-4 rounded-lg hover:bg-gray-100 font-semibold text-lg">
                  Login
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <button
                className="bg-gradient-to-r from-green-600 to-green-400 text-white px-8 py-4 rounded-lg font-semibold text-lg"
                onClick={() => router.push('/dashboard')}
              >
                Go to Dashboard
              </button>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-4xl font-bold text-white">{stat.value}</div>
              <div className="text-[#94a3b8]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Powerful Features</h2>
            <p className="text-lg text-[#94a3b8] mt-2">Everything you need to collaborate effectively</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-[#0f172a] p-8 rounded-xl border border-[#1e293b] hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-[#1e3a8a] to-[#4f46e5] rounded-lg flex items-center justify-center mb-6 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-[#94a3b8]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1e3a8a] to-[#4f46e5] text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Documentation?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of teams already using LiveDocs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#1e3a8a] px-8 py-4 rounded-lg hover:bg-gray-100 font-semibold text-lg">
              Start Free Trial
            </button>
            <button className="border border-white/30 px-8 py-4 rounded-lg hover:bg-white/10 font-semibold text-lg">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0f1a] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-[#1e3a8a] to-[#4f46e5] rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">LiveDocs</span>
            </div>
            <p className="text-[#94a3b8] text-sm">Collaborative documentation, built for modern teams.</p>
          </div>
          {["Product", "Resources", "Company"].map((section, idx) => (
            <div key={idx}>
              <h4 className="font-semibold mb-4">{section}</h4>
              <ul className="space-y-2 text-sm text-[#94a3b8]">
                {["Features", "Pricing", "Security", "Enterprise"].map((item, i) => (
                  <li key={i}><a href="#" className="hover:text-white">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center text-sm text-[#475569] pt-8 border-t border-[#1e293b] mt-8">
          &copy; {new Date().getFullYear()} LiveDocs. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
