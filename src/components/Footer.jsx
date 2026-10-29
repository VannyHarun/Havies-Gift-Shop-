import React, { useState } from 'react';
import { Sparkles, MessageCircle, Phone, Mail, MapPin, Send, Check, Heart, Facebook } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Footer({ storeConfig, onInstallPwa }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 flex items-center justify-center">
                <span className="font-serif font-black text-stone-950 text-base">A</span>
              </div>
              <span className="font-serif text-xl font-bold tracking-widest uppercase text-white">
                {storeConfig?.storeName}
              </span>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {storeConfig?.storeTagline}. Find a thoughtful present, add custom branding, choose a flower bouquet, and arrange delivery with our team.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-amber-400">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                PWA Enabled
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                WhatsApp Commerce
              </span>
              <a
                href={storeConfig?.socials?.facebookUrl || 'https://www.facebook.com/profile.php?id=100063752151106'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase">
              Boutique
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#catalog" className="hover:text-amber-400 transition-colors">Haute Collection</a></li>
              <li><a href="#lookbook" className="hover:text-amber-400 transition-colors">Gift Inspiration</a></li>
              <li><a href="#reviews" className="hover:text-amber-400 transition-colors">Verified Client Reviews</a></li>
              <li><a href="#inquiries" className="hover:text-amber-400 transition-colors">Gift Services</a></li>
              <li><a href="#location" className="hover:text-amber-400 transition-colors">Showroom & Map</a></li>
              <li>
                <button onClick={onInstallPwa} className="hover:text-amber-400 text-left cursor-pointer">
                  Install Web App
                </button>
              </li>
            </ul>
          </div>

          {/* VIP Newsletter Col */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase">
              Join The Inner Circle
            </h4>
            <p className="text-xs text-stone-400">
              Subscribe to unlock private drops, secret flash sales, and early WhatsApp preview invitations.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/70 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You're in! Use code <strong className="text-white font-mono">LUXE20</strong> for 20% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-stone-900 border border-stone-800 text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Join
                  </button>
                </div>
                <span className="text-[10px] text-stone-500 block">
                  Zero spam. Unsubscribe at any time.
                </span>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {storeConfig?.storeName}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>for seamless mobile shopping & WhatsApp commerce</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
