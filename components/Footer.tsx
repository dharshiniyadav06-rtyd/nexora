'use client';

import Link from 'next/link';
import { Instagram, Youtube, Facebook, Twitter, Phone, Mail, MapPin, Clock, ChevronRight, Camera } from 'lucide-react';



const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/packages', label: 'Packages' },
  { href: '/calendar', label: 'Check Availability' },
  { href: '/dashboard', label: 'My Dashboard' },
];

const socialLinks = [
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { href: 'https://youtube.com', icon: Youtube, label: 'YouTube' },
  { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
];

export default function Footer() {
  return (
    <>
      {/* Studio Map Section */}
      <section className="bg-[#2A1F1A] border-t border-[rgba(229,198,135,0.15)] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#E5C687] mb-2">Find Us</p>
            <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
              Visit LensCraft Studio
            </h2>
            <p className="text-[#F2E7D8]/60 mt-2 text-sm">Chennai, Tamil Nadu — India&apos;s Premium Wedding Photography Studio</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Contact Info */}
            <div className="space-y-5">
              <div className="glass-card rounded-2xl p-6 space-y-4">
                <h3 className="text-[#E5C687] font-semibold text-lg" style={{ fontFamily: 'var(--font-playfair)' }}>Studio Details</h3>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#4B3628] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={16} className="text-[#E5C687]" />
                  </div>
                  <div>
                    <p className="text-[#F2E7D8] text-sm font-medium">LensCraft Studio</p>
                    <p className="text-[#F2E7D8]/60 text-xs mt-0.5 leading-relaxed">
                      Anna Nagar East, Chennai<br />Tamil Nadu – 600 102
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#4B3628] flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-[#E5C687]" />
                  </div>
                  <div>
                    <p className="text-[#F2E7D8]/60 text-xs">Phone</p>
                    <a href="tel:+919840012345" className="text-[#F2E7D8] text-sm font-medium hover:text-[#E5C687] transition-colors">
                      +91 98400 12345
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#4B3628] flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-[#E5C687]" />
                  </div>
                  <div>
                    <p className="text-[#F2E7D8]/60 text-xs">Email</p>
                    <a href="mailto:hello@lenscraft.studio" className="text-[#F2E7D8] text-sm font-medium hover:text-[#E5C687] transition-colors">
                      hello@lenscraft.studio
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#4B3628] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock size={16} className="text-[#E5C687]" />
                  </div>
                  <div>
                    <p className="text-[#F2E7D8]/60 text-xs">Business Hours</p>
                    <p className="text-[#F2E7D8] text-sm font-medium">Mon – Sat: 10 AM – 7 PM</p>
                    <p className="text-[#F2E7D8]/50 text-xs mt-0.5">Sunday: By appointment only</p>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Anna+Nagar+East+Chennai+Tamil+Nadu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl gold-gradient text-[#1F1713] text-sm font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-300 mt-2"
                >
                  <MapPin size={15} />
                  Get Directions
                </a>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="lg:col-span-2 rounded-2xl overflow-hidden luxury-shadow border border-[rgba(229,198,135,0.15)] h-64 lg:h-80 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.234!2d80.209!3d13.088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sAnna%20Nagar%20East%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1620000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'hue-rotate(180deg) invert(90%) saturate(0.4) brightness(0.85)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LensCraft Studio Location"
              />
              {/* Map Overlay label */}
              <div className="absolute bottom-4 left-4 glass-card rounded-xl px-3 py-2 flex items-center gap-2">
                <Camera size={14} className="text-[#E5C687]" />
                <span className="text-xs text-[#F2E7D8] font-medium">LensCraft Studio · Chennai</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F1713] border-t border-[rgba(229,198,135,0.15)] pt-14 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-4 group">
                <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center">
                  <Camera size={18} className="text-[#1F1713]" />
                </div>
                <div>
                  <p className="text-lg font-bold text-[#E5C687]" style={{ fontFamily: 'var(--font-playfair)' }}>LensCraft</p>
                  <p className="text-[9px] tracking-[0.3em] text-[#F2E7D8]/60 uppercase">Studio</p>
                </div>
              </Link>
              <p className="text-[#F2E7D8]/60 text-sm leading-relaxed max-w-xs mb-5">
                Tamil Nadu&apos;s premiere wedding photography studio. Crafting timeless luxury memories across South India since 2016.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-xl bg-[#2A1F1A] border border-[rgba(229,198,135,0.2)] flex items-center justify-center text-[#F2E7D8]/60 hover:text-[#E5C687] hover:border-[#E5C687]/50 hover:bg-[#4B3628] transition-all duration-300"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-[#E5C687] text-sm font-semibold uppercase tracking-widest mb-5">Navigation</h4>
              <ul className="space-y-2.5">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="flex items-center gap-2 text-sm text-[#F2E7D8]/60 hover:text-[#E5C687] transition-colors duration-300 group"
                    >
                      <ChevronRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-[#E5C687] text-sm font-semibold uppercase tracking-widest mb-5">Photography</h4>
              <ul className="space-y-2.5">
                {['Tamil Brahmin Wedding', 'Temple Wedding', 'Reception Photography', 'Mehendi & Haldi', 'Pre-Wedding Shoot', 'Aerial Drone Shots', 'Cinematic Wedding Films', 'Portrait Sessions'].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-[#F2E7D8]/60">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Quick Card */}
            <div>
              <h4 className="text-[#E5C687] text-sm font-semibold uppercase tracking-widest mb-5">Contact Us</h4>
              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-2 text-sm text-[#F2E7D8]/70">
                  <Phone size={13} className="text-[#E5C687] flex-shrink-0" />
                  <a href="tel:+919840012345" className="hover:text-[#E5C687] transition-colors">+91 98400 12345</a>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#F2E7D8]/70">
                  <Mail size={13} className="text-[#E5C687] flex-shrink-0" />
                  <a href="mailto:hello@lenscraft.studio" className="hover:text-[#E5C687] transition-colors">hello@lenscraft.studio</a>
                </div>
                <div className="flex items-start gap-2 text-sm text-[#F2E7D8]/70">
                  <MapPin size={13} className="text-[#E5C687] flex-shrink-0 mt-0.5" />
                  <span>Anna Nagar East, Chennai, TN 600 102</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#F2E7D8]/70">
                  <Clock size={13} className="text-[#E5C687] flex-shrink-0" />
                  <span>Mon–Sat: 10 AM – 7 PM</span>
                </div>
              </div>
              <Link
                href="/calendar"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl gold-gradient text-[#1F1713] text-sm font-semibold hover:opacity-90 transition-opacity duration-300"
              >
                Book Consultation
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[rgba(229,198,135,0.15)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F2E7D8]/40">
            <p>© 2026 LensCraft Studio. All rights reserved. Chennai, Tamil Nadu, India.</p>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>·</span>
              <span>Terms of Service</span>
              <span>·</span>
              <span>Sitemap</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
