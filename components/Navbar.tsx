'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Camera } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/packages', label: 'Packages' },
  { href: '/calendar', label: 'Check Availability' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    // Set initial state
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? 'bg-[#1F1713]/98 backdrop-blur-xl shadow-[0_2px_40px_rgba(0,0,0,0.6)] border-b border-[rgba(229,198,135,0.15)]'
            : 'bg-[#1F1713]/80 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-[0_0_12px_rgba(212,175,55,0.5)]">
              <Camera size={18} className="text-[#1F1713]" />
            </div>
            <div>
              <p className="text-base font-semibold text-[#E5C687] leading-none" style={{ fontFamily: 'var(--font-playfair)' }}>
                LensCraft
              </p>
              <p className="text-[9px] tracking-[0.25em] text-[#F2E7D8]/70 uppercase leading-none mt-0.5">Studio</p>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                      active
                        ? 'text-[#E5C687]'
                        : 'text-[#F2E7D8] hover:text-[#E5C687]'
                    }`}
                  >
                    {label}
                    {/* active indicator bar */}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5C687] transition-all duration-300 ${
                        active ? 'w-4/5 opacity-100' : 'w-0 opacity-0 group-hover:w-4/5 group-hover:opacity-60'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-sm text-[#F2E7D8]/80 hover:text-[#E5C687] transition-colors duration-300 font-medium"
            >
              My Account
            </Link>
            <Link
              href="/calendar"
              className="gold-gradient text-[#1F1713] text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-[0_4px_15px_rgba(212,175,55,0.4)]"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-[#E5C687] hover:bg-[#4B3628] transition-colors duration-300"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        {/* Drawer */}
        <div
          className={`absolute top-[72px] left-0 right-0 bg-[#2A1F1A]/98 backdrop-blur-xl border-b border-[rgba(229,198,135,0.2)] transition-all duration-300 ${
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <ul className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-[#4B3628] text-[#E5C687] border border-[rgba(229,198,135,0.3)]'
                        : 'text-[#F2E7D8] hover:bg-[#4B3628]/50 hover:text-[#E5C687]'
                    }`}
                  >
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E5C687] flex-shrink-0" />
                    )}
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="px-4 pb-5 flex flex-col gap-3">
            <Link
              href="/dashboard"
              className="text-center py-3 rounded-xl border border-[rgba(229,198,135,0.3)] text-[#E5C687] text-sm font-medium hover:bg-[#4B3628] transition-colors duration-200"
            >
              My Account
            </Link>
            <Link
              href="/calendar"
              className="text-center py-3 rounded-xl gold-gradient text-[#1F1713] text-sm font-semibold hover:opacity-90 transition-opacity duration-200 shadow-[0_4px_15px_rgba(212,175,55,0.4)]"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer to avoid content hiding behind fixed nav */}
      <div className="h-[72px]" />
    </>
  );
}
