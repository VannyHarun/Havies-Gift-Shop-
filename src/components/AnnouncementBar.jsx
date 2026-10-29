import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, Clock, ChevronRight } from 'lucide-react';

export default function AnnouncementBar({ storeConfig, onSelectPromo }) {
  const [currentTickerIndex, setCurrentTickerIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 42, seconds: 19 });

  const tickerItems = storeConfig?.announcementTicker || [
    "✨ 100% Authentic Designer Quality",
    "🚚 Express Doorstep Delivery Available",
    "💬 Instant WhatsApp Ordering & Fit Assistance"
  ];

  // Rotate ticker every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTickerIndex((prev) => (prev + 1) % tickerItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [tickerItems.length]);

  // Flash sale countdown timer
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const formatNum = (n) => String(n).padStart(2, '0');

  return (
    <div className="bg-stone-950 text-stone-200 text-xs tracking-wider border-b border-stone-800">
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
        
        {/* Left: Rotating Announcements */}
        <div className="flex items-center gap-2 overflow-hidden h-5">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 uppercase tracking-widest">
            Aura Perks
          </span>
          <p className="transition-all duration-500 transform text-stone-300 font-medium">
            {tickerItems[currentTickerIndex]}
          </p>
        </div>

        {/* Center / Right: Flash Promo & Countdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-stone-300">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-[11px] font-semibold text-stone-200">
              Flash Offer Ends:
            </span>
            <span className="font-mono bg-stone-900 border border-stone-700 px-1.5 py-0.5 rounded text-amber-400 font-bold text-[11px]">
              {formatNum(timeLeft.hours)}:{formatNum(timeLeft.minutes)}:{formatNum(timeLeft.seconds)}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-stone-800 text-[11px]">
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            <span>Code <strong className="text-amber-400 font-mono tracking-normal">LUXE20</strong> for 20% OFF</span>
            <button 
              onClick={() => onSelectPromo && onSelectPromo('LUXE20')}
              className="text-amber-400 hover:text-amber-300 underline ml-1 cursor-pointer font-medium"
            >
              Apply
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
