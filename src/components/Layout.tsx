import { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { getNominationCount } from '../utils/api';
// import AppPopup from './AppPopup';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);
  const [isCommunityDropdownHovered, setIsCommunityDropdownHovered] = useState(false);
  const [isMoreDropdownHovered, setIsMoreDropdownHovered] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileCommunityOpen, setMobileCommunityOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [showAllInquiries, setShowAllInquiries] = useState(false);
  const [showAllQuickLinks, setShowAllQuickLinks] = useState(false);
  const location = useLocation();

  const [bannerVisible, setBannerVisible] = useState(() => {
    return localStorage.getItem('announcementDismissed') !== 'true';
  });

  const [nominationCount, setNominationCount] = useState(100);

  useEffect(() => {
    getNominationCount()
      .then((res: any) => {
        if (res.success && res.data) {
          setNominationCount(100 + res.data.count);
        }
      })
      .catch((err: any) => {
        console.error('Failed to fetch nomination count:', err);
      });
  }, []);

  const dismissBanner = () => {
    localStorage.setItem('announcementDismissed', 'true');
    setBannerVisible(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setIsOpen(false);
    setMobileDropdownOpen(false);
    setMobileCommunityOpen(false);
    setMobileMoreOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const isEventAwardsActive = 
    location.pathname === '/event-2026' || 
    location.pathname.startsWith('/awards') ||
    location.pathname.startsWith('/sponsors') ||
    location.pathname === '/coffee-table-book';

  const isCommunityActive =
    location.pathname === '/community' ||
    location.pathname === '/voice-of-golden preneur';

  const isMoreActive =
    location.pathname === '/jury' ||
    location.pathname === '/partners' ||
    location.pathname.startsWith('/blogs');

  return (
    <div className="min-h-screen flex flex-col bg-cream-white font-inter">
      {/* Fix 5: Announcement Banner */}
      {bannerVisible && (
        <div className="fixed top-0 left-0 w-full h-10 bg-gradient-to-r from-saffron via-ashoka-navy to-indian-green text-pure-white z-50 flex items-center justify-between px-6 text-xs sm:text-[13px] font-medium font-inter">
          <div className="flex-grow text-left font-bold tracking-wide flex items-center overflow-hidden">
            <span className="truncate">🇮🇳 Supporting Viksit Bharat @2047 | Golden preneur 2026 — 25th June, Ahmedabad | </span>
            <Link to="/awards/apply" className="underline text-yellow-300 hover:text-yellow-400 font-extrabold ml-1 shrink-0">
              Nominations Open — Apply FREE →
            </Link>
          </div>

          <div className="flex items-center gap-4 shrink-0 ml-4">
            <div className="hidden lg:flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full border border-yellow-400/40 shadow-[0_0_12px_rgba(250,204,21,0.3)] backdrop-blur-sm relative overflow-hidden group cursor-default">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
              <div className="w-2 h-2 rounded-full bg-[#5DCAA5] animate-pulse shadow-[0_0_8px_rgba(93,202,165,0.8)]"></div>
              <span className="text-yellow-300 font-bold tracking-widest text-[11px] uppercase drop-shadow-md flex items-center gap-1">
                Total Nominations: <span className="text-white text-[13px] inline-block min-w-[28px] text-center font-black transition-all duration-300">{nominationCount}</span>
              </span>
            </div>

            <button
              onClick={dismissBanner}
              className="text-pure-white/70 hover:text-pure-white hover:scale-110 transition-all cursor-pointer"
              aria-label="Dismiss Banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Fix 1: Sticky Navigation Header */}
      <nav
        className={`fixed left-0 w-full z-[1000] bg-pure-white flex items-center justify-between px-4 lg:px-10 h-[60px] lg:h-[76px] transition-all duration-300 ${
          bannerVisible ? 'top-10' : 'top-0'
        } ${scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.06)]' : ''}`}
      >
        {/* Dynamic metallic gold ribbon divider below navigation */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gold-metallic"></div>

        {/* Logo */}
        {/* Desktop Logo */}
        <Link to="/" className="hidden lg:flex items-center shrink-0" style={{ textDecoration: 'none', cursor: 'pointer', gap: '10px' }}>
          <img src="/logo-gold.png" alt="Golden preneur" className="h-[44px] w-auto object-contain" />
        </Link>

        {/* Mobile Centered Logo */}
        <Link to="/" className="lg:hidden absolute left-1/2 -translate-x-1/2 flex items-center justify-center" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          <img src="/logo-gold.png" alt="Golden preneur" className="h-[46px] w-auto object-contain" />
        </Link>

        {/* Desktop Center Nav Links (reduced gap to prevent overflow) */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-5 mx-auto">
          <NavLink to="/" className={({ isActive }) => `font-inter text-[13px] font-semibold uppercase tracking-[0.8px] whitespace-nowrap py-1 border-b-2 transition-all duration-200 ${isActive ? 'text-indian-green border-indian-green' : 'text-[#1A1A1A] border-transparent hover:text-[#B38728] hover:border-[#B38728]'}`}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `font-inter text-[13px] font-semibold uppercase tracking-[0.8px] whitespace-nowrap py-1 border-b-2 transition-all duration-200 ${isActive ? 'text-indian-green border-indian-green' : 'text-[#1A1A1A] border-transparent hover:text-[#B38728] hover:border-[#B38728]'}`}>
            About
          </NavLink>

          {/* Event & Awards Hover Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setIsDropdownHovered(true)}
            onMouseLeave={() => setIsDropdownHovered(false)}
          >
            <button
              className={`font-inter text-[13px] font-semibold uppercase tracking-[0.8px] whitespace-nowrap py-1 border-b-2 transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                isEventAwardsActive
                  ? 'text-indian-green border-indian-green font-semibold'
                  : 'text-[#1A1A1A] border-transparent hover:text-[#B38728] hover:border-[#B38728]'
              }`}
            >
              Event & Awards <span className="text-[12px] text-[#B38728]">▾</span>
            </button>

            <div
              className={`absolute left-0 mt-2 w-[220px] bg-pure-white border border-[#E5E7EB] shadow-[0_8px_24px_rgba(0,0,0,0.12)] rounded-lg transition-all duration-200 origin-top-left z-[999] ${
                isDropdownHovered
                  ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="py-2 flex flex-col">
                <Link
                  to="/event-2026"
                  className="px-5 py-3 text-sm font-inter text-[#1A1A1A] block hover:bg-[#F0F7F4] hover:text-[#B38728] hover:pl-6 transition-all duration-150"
                >
                  Event Overview
                </Link>
                <a
                  href="/event-2026#agenda"
                  className="px-5 py-3 text-sm font-inter text-[#1A1A1A] block hover:bg-[#F0F7F4] hover:text-[#B38728] hover:pl-6 transition-all duration-150"
                >
                  Event Agenda
                </a>
                <Link
                  to="/awards/categories"
                  className="px-5 py-3 text-sm font-inter text-[#1A1A1A] block hover:bg-[#F0F7F4] hover:text-[#B38728] hover:pl-6 transition-all duration-150"
                >
                  Award Categories
                </Link>
                <Link
                  to="/awards/overview"
                  className="px-5 py-3 text-sm font-inter text-[#1A1A1A] block hover:bg-[#F0F7F4] hover:text-[#B38728] hover:pl-6 transition-all duration-150"
                >
                  How to Nominate
                </Link>
                <a
                  href="/awards/overview#jury"
                  className="px-5 py-3 text-sm font-inter text-[#1A1A1A] block hover:bg-[#F0F7F4] hover:text-[#B38728] hover:pl-6 transition-all duration-150"
                >
                  Speakers & Jury Panel 2026
                </a>
                <a
                  href="/awards/overview#why-attend"
                  className="px-5 py-3 text-sm font-inter text-[#1A1A1A] block hover:bg-[#F0F7F4] hover:text-[#B38728] hover:pl-6 transition-all duration-150"
                >
                  Why Attend
                </a>
                <Link
                  to="/sponsors/opportunities"
                  className="px-5 py-3 text-sm font-inter text-[#1A1A1A] block hover:bg-[#F0F7F4] hover:text-[#B38728] hover:pl-6 transition-all duration-150 font-semibold"
                >
                  Sponsors
                </Link>
                <Link
                  to="/coffee-table-book"
                  className="px-5 py-3 text-sm font-inter text-[#1A1A1A] block hover:bg-[#F0F7F4] hover:text-[#B38728] hover:pl-6 transition-all duration-150 font-semibold"
                >
                  The Book
                </Link>
              </div>
            </div>
          </div>

          <NavLink to="/winners" className={({ isActive }) => `font-inter text-[13px] font-semibold uppercase tracking-[0.8px] whitespace-nowrap py-1 border-b-2 transition-all duration-200 ${isActive ? 'text-indian-green border-indian-green' : 'text-[#1A1A1A] border-transparent hover:text-[#B38728] hover:border-[#B38728]'}`}>
            Winners
          </NavLink>

          {/* Community Hover Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setIsCommunityDropdownHovered(true)}
            onMouseLeave={() => setIsCommunityDropdownHovered(false)}
          >
            <button
              className={`font-inter text-[13px] font-semibold uppercase tracking-[0.8px] whitespace-nowrap py-1 border-b-2 transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                isCommunityActive
                  ? 'text-indian-green border-indian-green font-semibold'
                  : 'text-[#1A1A1A] border-transparent hover:text-[#B38728] hover:border-[#B38728]'
              }`}
            >
              Community <span className="text-[12px] text-[#B38728]">▾</span>
            </button>

            <div
              className={`absolute left-0 mt-2 w-[220px] bg-pure-white border border-[#E5E7EB] shadow-[0_8px_24px_rgba(0,0,0,0.12)] rounded-lg transition-all duration-200 origin-top-left z-[999] ${
                isCommunityDropdownHovered
                  ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="py-2 flex flex-col">
                <Link
                  to="/community"
                  className="px-5 py-3 text-sm font-inter text-[#1A1A1A] block hover:bg-[#F0F7F4] hover:text-[#B38728] hover:pl-6 transition-all duration-150 font-semibold"
                >
                  Community Hub
                </Link>
                <Link
                  to="/voice-of-golden preneur"
                  className="px-5 py-3 text-sm font-inter text-[#1A1A1A] block hover:bg-[#F0F7F4] hover:text-[#B38728] hover:pl-6 transition-all duration-150 font-semibold"
                >
                  Voice of Golden preneur
                </Link>
              </div>
            </div>
          </div>

          {/* More Hover Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setIsMoreDropdownHovered(true)}
            onMouseLeave={() => setIsMoreDropdownHovered(false)}
          >
            <button
              className={`font-inter text-[13px] font-semibold uppercase tracking-[0.8px] whitespace-nowrap py-1 border-b-2 transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                isMoreActive
                  ? 'text-indian-green border-indian-green font-semibold'
                  : 'text-[#1A1A1A] border-transparent hover:text-[#B38728] hover:border-[#B38728]'
              }`}
            >
              More <span className="text-[12px] text-[#B38728]">▾</span>
            </button>

            <div
              className={`absolute left-0 mt-2 w-[220px] bg-pure-white border border-[#E5E7EB] shadow-[0_8px_24px_rgba(0,0,0,0.12)] rounded-lg transition-all duration-200 origin-top-left z-[999] ${
                isMoreDropdownHovered
                  ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="py-2 flex flex-col">
                <Link
                  to="/jury"
                  className="px-5 py-3 text-sm font-inter text-[#1A1A1A] block hover:bg-[#F0F7F4] hover:text-[#B38728] hover:pl-6 transition-all duration-150 font-semibold"
                >
                  Speakers & Jury
                </Link>
                <Link
                  to="/partners"
                  className="px-5 py-3 text-sm font-inter text-[#1A1A1A] block hover:bg-[#F0F7F4] hover:text-[#B38728] hover:pl-6 transition-all duration-150 font-semibold"
                >
                  Partners
                </Link>
                <Link
                  to="/blogs"
                  className="px-5 py-3 text-sm font-inter text-[#1A1A1A] block hover:bg-[#F0F7F4] hover:text-[#B38728] hover:pl-6 transition-all duration-150 font-semibold"
                >
                  Blogs
                </Link>
              </div>
            </div>
          </div>
          <NavLink to="/faqs" className={({ isActive }) => `font-inter text-[13px] font-semibold uppercase tracking-[0.8px] whitespace-nowrap py-1 border-b-2 transition-all duration-200 ${isActive ? 'text-indian-green border-indian-green' : 'text-[#1A1A1A] border-transparent hover:text-[#B38728] hover:border-[#B38728]'}`}>
            FAQs
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `font-inter text-[13px] font-semibold uppercase tracking-[0.8px] whitespace-nowrap py-1 border-b-2 transition-all duration-200 ${isActive ? 'text-indian-green border-indian-green' : 'text-[#1A1A1A] border-transparent hover:text-[#B38728] hover:border-[#B38728]'}`}>
            Contact
          </NavLink>
        </div>

        {/* Desktop Right Nav Buttons */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link
            to="/event-2026"
            className="h-[40px] px-5 flex items-center justify-center text-[13px] font-bold font-inter uppercase rounded-[6px] border border-[#B38728] text-[#B38728] hover:bg-gold-metallic hover:text-dark-green hover:border-transparent whitespace-nowrap transition-all duration-200"
          >
            GET PASS
          </Link>
          <Link
            to="/awards/apply"
            className="h-[40px] px-[24px] flex items-center justify-center text-[13px] font-black font-inter uppercase bg-gold-metallic text-dark-green hover:shadow-gold-lux hover:scale-102 rounded-[6px] whitespace-nowrap transition-all duration-200"
          >
            NOMINATE
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-primary-green hover:scale-105 transition-all focus:outline-none cursor-pointer ml-auto"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Fix 6: Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 h-screen w-screen bg-gradient-to-b from-[#03150d] via-[#052216] to-[#010905] text-pure-white shadow-2xl flex flex-col p-6 transition-transform duration-300 overflow-y-auto ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header in mobile drawer */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-pure-white/10 shrink-0">
            <Link to="/" className="flex items-center" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
              <img src="/logo-gold.png" alt="Golden preneur" className="h-[36px] w-auto object-contain" />
            </Link>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-pure-white hover:scale-110 active:scale-95 transition-all p-2 rounded-full bg-pure-white/5 border border-pure-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Trendy Bento Grid Navigation Menu */}
          <div className="grid grid-cols-2 gap-4 font-inter shrink-0">
            {/* HOME: Full width bento card */}
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="col-span-2 bg-gradient-to-r from-gold-metallic/15 to-transparent border border-gold-metallic/30 p-4 rounded-2xl flex items-center justify-between hover:border-gold-metallic/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold-metallic/10 border border-gold-metallic/20 flex items-center justify-center text-accent-gold">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </div>
                <div className="text-left">
                  <span className="block text-[14px] font-black tracking-wider uppercase text-pure-white">Home</span>
                  <span className="block text-[9px] text-pure-white/40 font-semibold tracking-wide">Return to Landing Page</span>
                </div>
              </div>
              <span className="text-accent-gold font-bold text-sm">→</span>
            </Link>

            {/* ABOUT: Square bento card */}
            <Link 
              to="/about" 
              onClick={() => setIsOpen(false)}
              className="bg-pure-white/5 border border-pure-white/10 p-4 rounded-2xl flex flex-col justify-between items-start text-left min-h-[110px] hover:border-gold-metallic/30 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-xl bg-pure-white/5 border border-pure-white/10 flex items-center justify-center text-accent-gold mb-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <div>
                <span className="block text-[12px] font-black tracking-wider uppercase text-pure-white">About</span>
                <span className="block text-[8px] text-pure-white/30 tracking-wide font-medium mt-0.5">Legacy &amp; Vision</span>
              </div>
            </Link>

            {/* WINNERS: Square bento card */}
            <Link 
              to="/winners" 
              onClick={() => setIsOpen(false)}
              className="bg-pure-white/5 border border-pure-white/10 p-4 rounded-2xl flex flex-col justify-between items-start text-left min-h-[110px] hover:border-gold-metallic/30 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-xl bg-pure-white/5 border border-pure-white/10 flex items-center justify-center text-accent-gold mb-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <div>
                <span className="block text-[12px] font-black tracking-wider uppercase text-pure-white">Winners</span>
                <span className="block text-[8px] text-pure-white/30 tracking-wide font-medium mt-0.5">Pioneers List</span>
              </div>
            </Link>

            {/* EVENT & AWARDS: Expandable card */}
            <div className="col-span-2 bg-pure-white/5 border border-pure-white/10 p-4 rounded-2xl hover:border-gold-metallic/30 transition-all duration-300">
              <button
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-pure-white/5 border border-pure-white/10 flex items-center justify-center text-accent-gold">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <span className="block text-[12px] font-black tracking-wider uppercase text-pure-white">Event &amp; Awards</span>
                    <span className="block text-[8px] text-pure-white/30 mt-0.5 font-medium">Conclave &amp; Nominations</span>
                  </div>
                </div>
                <span className={`text-[10px] text-pure-white/40 transform transition-transform duration-200 ${mobileDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              <div className={`grid grid-cols-2 gap-2 overflow-hidden transition-all duration-300 ${mobileDropdownOpen ? 'max-h-[300px] mt-3 pt-3 border-t border-pure-white/5' : 'max-h-0'}`}>
                <Link to="/event-2026" onClick={() => setIsOpen(false)} className="py-2 px-3 rounded-lg bg-pure-white/5 border border-pure-white/5 text-[10px] font-semibold text-pure-white/80 hover:text-accent-gold">
                  Event Overview
                </Link>
                <a href="/event-2026#agenda" onClick={() => setIsOpen(false)} className="py-2 px-3 rounded-lg bg-pure-white/5 border border-pure-white/5 text-[10px] font-semibold text-pure-white/80 hover:text-accent-gold">
                  Event Agenda
                </a>
                <Link to="/awards/categories" onClick={() => setIsOpen(false)} className="py-2 px-3 rounded-lg bg-pure-white/5 border border-pure-white/5 text-[10px] font-semibold text-pure-white/80 hover:text-accent-gold">
                  Award Categories
                </Link>
                <Link to="/awards/overview" onClick={() => setIsOpen(false)} className="py-2 px-3 rounded-lg bg-pure-white/5 border border-pure-white/5 text-[10px] font-semibold text-pure-white/80 hover:text-accent-gold">
                  How to Nominate
                </Link>
                <Link to="/sponsors/opportunities" onClick={() => setIsOpen(false)} className="py-2 px-3 rounded-lg bg-pure-white/5 border border-pure-white/5 text-[10px] font-bold text-accent-gold hover:text-pure-white">
                  Sponsors
                </Link>
                <Link to="/coffee-table-book" onClick={() => setIsOpen(false)} className="py-2 px-3 rounded-lg bg-pure-white/5 border border-pure-white/5 text-[10px] font-bold text-accent-gold hover:text-pure-white">
                  The Book
                </Link>
              </div>
            </div>

            {/* COMMUNITY: Expandable card */}
            <div className="col-span-2 bg-pure-white/5 border border-pure-white/10 p-4 rounded-2xl hover:border-gold-metallic/30 transition-all duration-300">
              <button
                onClick={() => setMobileCommunityOpen(!mobileCommunityOpen)}
                className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-pure-white/5 border border-pure-white/10 flex items-center justify-center text-accent-gold">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <div>
                    <span className="block text-[12px] font-black tracking-wider uppercase text-pure-white">Community</span>
                    <span className="block text-[8px] text-pure-white/30 mt-0.5 font-medium">Stories &amp; Hub</span>
                  </div>
                </div>
                <span className={`text-[10px] text-pure-white/40 transform transition-transform duration-200 ${mobileCommunityOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              <div className={`grid grid-cols-2 gap-2 overflow-hidden transition-all duration-300 ${mobileCommunityOpen ? 'max-h-[150px] mt-3 pt-3 border-t border-pure-white/5' : 'max-h-0'}`}>
                <Link to="/community" onClick={() => setIsOpen(false)} className="py-2 px-3 rounded-lg bg-pure-white/5 border border-pure-white/5 text-[10px] font-bold text-pure-white/80 hover:text-accent-gold">
                  Community Hub
                </Link>
                <Link to="/voice-of-golden preneur" onClick={() => setIsOpen(false)} className="py-2 px-3 rounded-lg bg-pure-white/5 border border-pure-white/5 text-[10px] font-bold text-pure-white/80 hover:text-accent-gold">
                  Voice Gallery
                </Link>
              </div>
            </div>

            {/* FAQS: Square bento card */}
            <Link 
              to="/faqs" 
              onClick={() => setIsOpen(false)}
              className="bg-pure-white/5 border border-pure-white/10 p-4 rounded-2xl flex flex-col justify-between items-start text-left min-h-[110px] hover:border-gold-metallic/30 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-xl bg-pure-white/5 border border-pure-white/10 flex items-center justify-center text-accent-gold mb-2">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <span className="block text-[12px] font-black tracking-wider uppercase text-pure-white">FAQs</span>
                <span className="block text-[8px] text-pure-white/30 tracking-wide font-medium mt-0.5">Help &amp; Support</span>
              </div>
            </Link>

            {/* CONTACT: Square bento card */}
            <Link 
              to="/contact" 
              onClick={() => setIsOpen(false)}
              className="bg-pure-white/5 border border-pure-white/10 p-4 rounded-2xl flex flex-col justify-between items-start text-left min-h-[110px] hover:border-gold-metallic/30 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-xl bg-pure-white/5 border border-pure-white/10 flex items-center justify-center text-accent-gold mb-2">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <span className="block text-[12px] font-black tracking-wider uppercase text-pure-white">Contact</span>
                <span className="block text-[8px] text-pure-white/30 tracking-wide font-medium mt-0.5">Get in Touch</span>
              </div>
            </Link>

            {/* MORE Section (Jury, Partners, Blogs) */}
            <div className="col-span-2 bg-pure-white/5 border border-pure-white/10 p-4 rounded-2xl hover:border-gold-metallic/30 transition-all duration-300">
              <button
                onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
                className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-pure-white/5 border border-pure-white/10 flex items-center justify-center text-accent-gold">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                  </div>
                  <div>
                    <span className="block text-[12px] font-black tracking-wider uppercase text-pure-white">More Resources</span>
                    <span className="block text-[8px] text-pure-white/30 mt-0.5 font-medium">Jury, Partners &amp; Blogs</span>
                  </div>
                </div>
                <span className={`text-[10px] text-pure-white/40 transform transition-transform duration-200 ${mobileMoreOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              <div className={`grid grid-cols-3 gap-2 overflow-hidden transition-all duration-300 ${mobileMoreOpen ? 'max-h-[150px] mt-3 pt-3 border-t border-pure-white/5' : 'max-h-0'}`}>
                <Link to="/jury" onClick={() => setIsOpen(false)} className="py-2 px-1 text-center rounded-lg bg-pure-white/5 border border-pure-white/5 text-[9px] font-bold text-pure-white/80 hover:text-accent-gold">
                  Jury
                </Link>
                <Link to="/partners" onClick={() => setIsOpen(false)} className="py-2 px-1 text-center rounded-lg bg-pure-white/5 border border-pure-white/5 text-[9px] font-bold text-pure-white/80 hover:text-accent-gold">
                  Partners
                </Link>
                <Link to="/blogs" onClick={() => setIsOpen(false)} className="py-2 px-1 text-center rounded-lg bg-pure-white/5 border border-pure-white/5 text-[9px] font-bold text-pure-white/80 hover:text-accent-gold">
                  Blogs
                </Link>
              </div>
            </div>
          </div>

          {/* CTA Buttons in mobile menu */}
          <div className="flex flex-col gap-3 mt-6 shrink-0">
            <Link
              to="/awards/apply"
              onClick={() => setIsOpen(false)}
              className="w-full h-[52px] flex items-center justify-center bg-gold-metallic text-dark-green font-black uppercase tracking-wider text-xs rounded-[10px] shadow-gold-lux"
            >
              🌿 NOMINATE — FREE
            </Link>
            <Link
              to="/event-2026"
              onClick={() => setIsOpen(false)}
              className="w-full h-[52px] flex items-center justify-center border border-gold-metallic/35 bg-transparent text-gold-metallic font-bold uppercase tracking-wider text-xs rounded-[10px] hover:bg-gold-metallic hover:text-dark-green transition-all"
            >
              GET EVENT PASS
            </Link>
          </div>

          {/* Bottom metadata and social row */}
          <div className="mt-auto pt-6 border-t border-pure-white/10 flex flex-col gap-4">
            <div className="flex flex-col gap-2 text-xs text-pure-white/70">
              <a href="tel:+919558739086" className="flex items-center gap-2 hover:text-pure-white transition-colors">
                <Phone className="w-4 h-4 text-accent-gold" /> +91 95587 39086
              </a>
              <a href="mailto:hardikpparmar2006@gmail.com" className="flex items-center gap-2 hover:text-pure-white transition-colors">
                <Mail className="w-4 h-4 text-accent-gold" /> hardikpparmar2006@gmail.com
              </a>
            </div>

            {/* Social Icons row */}
            <div className="flex gap-4">
              <a href="https://www.instagram.com/thehardik151?igsh=MWNjemdjcHVkOXZ1YQ==" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-pure-white/10 flex items-center justify-center hover:bg-accent-gold transition-all" aria-label="Instagram">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
              <a href="https://github.com/Hardikparmar2006" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-pure-white/10 flex items-center justify-center hover:bg-accent-gold transition-all" aria-label="GitHub">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/hardik-parmar-0469533bb/" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-pure-white/10 flex items-center justify-center hover:bg-accent-gold transition-all" aria-label="LinkedIn">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content Body */}
      <main className={`flex-grow ${bannerVisible ? 'pt-[100px] lg:pt-[116px]' : 'pt-[60px] lg:pt-[76px]'} pb-16 lg:pb-0 transition-all duration-300`}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-dark-green text-pure-white py-16 mt-auto relative z-10 border-t-[5px]" style={{ borderImage: 'linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C) 1' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Col 1: Brand details */}
            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '260px' }}>
              {/* Footer Logo */}
              <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '12px' }}>
                <img src="/logo-gold.png" alt="Golden preneur" className="h-[48px] md:h-[54px] w-auto object-contain" />
              </Link>
              {/* Footer tagline */}
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                Entrepreneurs Redefining Sustainability for Viksit Bharat
              </p>
              {/* Social Icons */}
              <div style={{ display: 'flex', gap: '14px', marginBottom: '20px' }}>
                <a
                  href="https://www.instagram.com/thehardik151?igsh=MWNjemdjcHVkOXZ1YQ=="
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-icon"
                  aria-label="Instagram"
                  style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://github.com/Hardikparmar2006"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/hardik-parmar-0469533bb/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, margin: 0 }}>
                India's most comprehensive green entrepreneurship platform. An annual initiative by MEIF powered by VyapaarJagat.com.
              </p>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h5 className="text-[#D4AF37] font-bold uppercase tracking-[0.2em] text-xs mb-6 pb-2 border-b border-pure-white/10">
                Quick Links
              </h5>
              <ul className="space-y-3 text-pure-white/70 text-sm">
                <li>
                  <Link to="/" className="hover:text-pure-white transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-pure-white transition-colors">About Legacy</Link>
                </li>
                <li>
                  <Link to="/awards/overview" className="hover:text-pure-white transition-colors">Awards Overview</Link>
                </li>
                <li>
                  <Link to="/event-2026" className="hover:text-pure-white transition-colors">Event 2026 Agenda</Link>
                </li>
                <li>
                  <Link to="/sponsors/opportunities" className="hover:text-pure-white transition-colors">Sponsorships</Link>
                </li>
                <li>
                  <Link to="/winners" className="hover:text-pure-white transition-colors">Past Winners</Link>
                </li>
                <li>
                  <Link to="/community" className="hover:text-pure-white transition-colors">Community</Link>
                </li>
                <li>
                  <Link to="/voice-of-golden preneur" className="hover:text-pure-white transition-colors">Voice of Golden preneur</Link>
                </li>
                <li>
                  <Link to="/blogs" className="hover:text-pure-white transition-colors">Blogs</Link>
                </li>
                <li>
                  <Link to="/faqs" className="hover:text-pure-white transition-colors">FAQs</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-pure-white transition-colors">Contact Us</Link>
                </li>

                {showAllQuickLinks && (
                  <>
                    <li className="pt-2 border-t border-pure-white/10">
                      <Link to="/privacy-policy" className="hover:text-pure-white transition-colors">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to="/terms-conditions" className="hover:text-pure-white transition-colors">Terms &amp; Conditions</Link>
                    </li>
                    <li>
                      <Link to="/refund-cancellation" className="hover:text-pure-white transition-colors">Refund &amp; Cancellation</Link>
                    </li>
                  </>
                )}

                <li>
                  <button
                    onClick={() => setShowAllQuickLinks(!showAllQuickLinks)}
                    className="text-[#D4AF37] hover:text-pure-white transition-colors text-xs uppercase tracking-wider font-bold flex items-center gap-1 mt-2"
                  >
                    {showAllQuickLinks ? '- Show Less' : '+ Show More'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Participate */}
            <div>
              <h5 className="text-[#D4AF37] font-bold uppercase tracking-[0.2em] text-xs mb-6 pb-2 border-b border-pure-white/10">
                Participate & Inquiries
              </h5>
              <ul className="space-y-3 text-pure-white/70 text-sm">
                <li>
                  <Link to="/awards/apply" className="hover:text-pure-white transition-colors">Apply for Award</Link>
                </li>
                <li>
                  <Link to="/inquiry/membership" className="hover:text-pure-white transition-colors">Membership Inquiry</Link>
                </li>
                <li>
                  <Link to="/inquiry/apply-magazine" className="hover:text-pure-white transition-colors">Apply for Magazine</Link>
                </li>
                <li>
                  <Link to="/inquiry/start-chapter" className="hover:text-pure-white transition-colors">Start A Chapter</Link>
                </li>
                <li>
                  <Link to="/inquiry/sponsor" className="hover:text-pure-white transition-colors">Become a Sponsor</Link>
                </li>

                {showAllInquiries && (
                  <>
                    <li>
                      <Link to="/event-2026" className="hover:text-pure-white transition-colors">Get Event Pass</Link>
                    </li>
                    <li>
                      <Link to="/inquiry/advertise-magazine" className="hover:text-pure-white transition-colors">Advertise in Magazine</Link>
                    </li>
                    <li>
                      <Link to="/inquiry/partner" className="hover:text-pure-white transition-colors">Apply as Partner</Link>
                    </li>
                    <li>
                      <Link to="/inquiry/advertise-us" className="hover:text-pure-white transition-colors">Advertise with Us</Link>
                    </li>
                    <li>
                      <Link to="/inquiry/collaborate" className="hover:text-pure-white transition-colors">Collaboration</Link>
                    </li>
                    <li>
                      <Link to="/inquiry/fundraise" className="hover:text-pure-white transition-colors">Join to Fundraise</Link>
                    </li>
                    <li>
                      <Link to="/inquiry/invest" className="hover:text-pure-white transition-colors">Join to Invest</Link>
                    </li>
                    <li>
                      <Link to="/inquiry/publish-story" className="hover:text-pure-white transition-colors">Publish Your Story</Link>
                    </li>
                    <li>
                      <Link to="/inquiry/speaker-application" className="hover:text-pure-white transition-colors">Speaker Applications</Link>
                    </li>
                    <li>
                      <Link to="/inquiry/talk-show-speaker" className="hover:text-pure-white transition-colors">Talk Show Speakers</Link>
                    </li>
                  </>
                )}

                <li>
                  <button 
                    onClick={() => setShowAllInquiries(!showAllInquiries)}
                    className="text-[#D4AF37] hover:text-pure-white transition-colors text-xs uppercase tracking-wider font-bold flex items-center gap-1 mt-2"
                  >
                    {showAllInquiries ? '- Show Less' : '+ Show More'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact */}
            <div>
              <h5 className="text-[#D4AF37] font-bold uppercase tracking-[0.2em] text-xs mb-6 pb-2 border-b border-pure-white/10">
                Secretariat
              </h5>
              <div className="space-y-4 text-sm text-pure-white/80">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <a href="tel:+919558739086" className="font-semibold hover:text-pure-white transition-colors">
                      +91 95587 39086
                    </a>
                    <span className="text-xs text-pure-white/50">Hardik Parmar (Developer)</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <a href="mailto:hardikpparmar2006@gmail.com" className="font-semibold hover:text-pure-white transition-colors">
                      hardikpparmar2006@gmail.com
                    </a>
                    <span className="text-xs text-pure-white/50">Official Inquiries</span>
                  </div>
                
              </div>
              </div>
            </div>
          </div>

          {/* Divider and Bottom bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', marginTop: '40px', paddingTop: '20px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.45)', textAlign: 'center', margin: 0 }}>
              © 2026 Golden preneur | Designed &amp; Developed by <span className="text-pure-white/80 font-bold hover:text-accent-gold transition-colors duration-200 cursor-pointer">Hardik Parmar</span>
            </p>

            {/* Indian Flag stripe */}
            <div className="h-1.5 w-full rounded-full mt-6 opacity-90" style={{ background: 'linear-gradient(to right, #FF9933, #FFFFFF, #138808)' }}></div>
            {/* SDG color bar */}
            <div className="h-2 w-full rounded-full mt-2 opacity-80" style={{ background: 'linear-gradient(to right, #E5243B, #DDA63A, #4C9F38, #C5192D, #EF402C, #26BDE2, #FCC30B, #A21942, #FD6925, #DD1367, #FD9D24, #BF8B2E, #3F7E44, #0A97D9, #56C02B, #00689D, #19486A)' }}></div>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom CTAs (Mobile-only) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-[45] bg-pure-white border-t border-light-grey grid grid-cols-2 p-2 gap-2 shadow-2xl">
        <Link
          to="/event-2026"
          className="h-[56px] flex items-center justify-center text-xs uppercase tracking-widest font-black border border-[#B38728] text-[#B38728] rounded-md hover:bg-gold-metallic hover:text-dark-green"
        >
          Get Pass
        </Link>
        <Link
          to="/awards/apply"
          className="h-[56px] flex items-center justify-center text-xs uppercase tracking-widest font-black bg-gold-metallic text-dark-green rounded-md shadow-md shadow-gold-lux"
        >
          Apply Now
        </Link>
      </div>


      {/* <AppPopup /> */}
    </div>
  );
}
