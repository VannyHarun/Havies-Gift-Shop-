import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Download, 
  PhoneCall, 
  MessageCircle,
  SlidersHorizontal,
  Compass,
  Sparkles,
  Facebook
} from 'lucide-react';
import { createWhatsAppLink } from '../utils/whatsapp';

export default function Navbar({ 
  storeConfig, 
  cartCount, 
  wishlistCount, 
  onOpenCart, 
  onOpenWishlist, 
  onOpenAdmin, 
  onInstallPwa,
  canInstallPwa,
  activeSection,
  onNavigate
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Collection', href: '#catalog' },
    { name: 'Lookbook', href: '#lookbook' },
    { name: 'Gift Services & Inquiries', href: '#inquiries' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Boutique Location', href: '#location' },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappLink = createWhatsAppLink(
    storeConfig?.whatsappNumber, 
    `Hello ${storeConfig?.storeName}! I am browsing your online boutique and would like to ask a question.`
  );
  const facebookLink = storeConfig?.socials?.facebookUrl || 'https://www.facebook.com/profile.php?id=100063752151106';

  return (
    <nav className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-stone-900/95 backdrop-blur-md text-white shadow-xl py-3 border-b border-stone-800' 
        : 'bg-stone-900 text-stone-100 py-4 border-b border-stone-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left: Mobile Menu Toggle & Brand */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="font-serif font-black text-stone-950 text-xl tracking-tighter">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest uppercase bg-gradient-to-r from-stone-100 via-amber-100 to-stone-300 bg-clip-text text-transparent">
                  {storeConfig?.storeName || 'Gift Shop'}
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-amber-400/90 font-medium -mt-1 hidden sm:block">
                  Luxury Fashion & Apparel
                </span>
              </div>
            </a>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-stone-300 hover:text-amber-400 transition-colors tracking-wide cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-400 hover:after:w-full after:transition-all"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right: Actions (PWA install, WhatsApp quick chat, Wishlist, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* PWA Install Button (Always visible on desktop and mobile) */}
            <button
              onClick={onInstallPwa}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-stone-800 text-amber-300 hover:bg-stone-700 border border-amber-500/30 transition-all shadow-sm active:scale-95"
              title="Install Web App on your phone or desktop"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>

            {/* Direct WhatsApp Call/Chat */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-emerald-500/40 transition-all"
              title="Chat with Boutique Stylist on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            <a
              href={facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-blue-600/15 text-blue-300 hover:bg-blue-600/25 border border-blue-500/40 transition-all"
              title="Visit us on Facebook"
            >
              <Facebook className="w-3.5 h-3.5 text-blue-300" />
              <span className="hidden md:inline">Facebook</span>
            </a>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-full text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Wishlist"
              title="View Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce-slow">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-semibold text-xs tracking-wide shadow-md transition-all active:scale-95"
              aria-label="Shopping Cart"
              title="View Cart & WhatsApp Checkout"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="w-5 h-5 rounded-full bg-stone-950 text-amber-400 text-xs font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Shop Admin Customizer Pill */}
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-full text-stone-400 hover:text-amber-300 hover:bg-stone-800 transition-colors"
              title="Store Owner Settings (Customize Phone & Name)"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-800 bg-stone-950/98 backdrop-blur-xl px-4 pt-4 pb-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-stone-200 hover:bg-stone-800 hover:text-amber-400 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400/50" />
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onInstallPwa();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 text-amber-300 font-medium text-sm border border-stone-700"
            >
              <Download className="w-4 h-4" />
              <span>Install Web App to Home Screen</span>
            </button>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-medium text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>

          <div className="text-center text-[11px] text-stone-500 pt-2">
            {storeConfig?.storeTagline}
          </div>
        </div>
      )}
    </nav>
  );
}
