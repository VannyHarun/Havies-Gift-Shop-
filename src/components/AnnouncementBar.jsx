import React, { useState, useEffect } from 'react';
import { Tag, Sparkles } from 'lucide-react';
import { isNovemberOfferActive } from '../utils/promotions';

export default function AnnouncementBar({ storeConfig, onSelectPromo }) {
  const [currentTickerIndex, setCurrentTickerIndex] = useState(0);
  const promoActive = isNovemberOfferActive();

  const defaultTickerItems = [
    "✨ 100% Authentic Designer Quality",
    "🚚 Express Doorstep Delivery Available",
    "💬 Instant WhatsApp Ordering & Fit Assistance"
  ];
  const tickerItems = promoActive
    ? [
        "🎉 This month's special offer: 20% OFF all items",
        "🛍️ Black November savings on gifts, flowers & more"
      ]
    : storeConfig?.announcementTicker || defaultTickerItems;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTickerIndex((prev) => (prev + 1) % tickerItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [tickerItems.length]);

  return (
    <div className="bg-stone-950 text-stone-200 text-xs tracking-wider border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden h-5">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 uppercase tracking-widest">
            {promoActive ? "This Month's Special" : 'Store News'}
          </span>
          <p className="transition-all duration-500 transform text-stone-300 font-medium">
            {tickerItems[currentTickerIndex]}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {promoActive && (
            <>
              <div className="flex items-center gap-1.5 text-stone-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-[0.2em]">
                  November only
                </span>
              </div>

              <div className="flex items-center gap-1.5 pl-3 border-l border-stone-800 text-[11px]">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span>Code <strong className="text-amber-400 font-mono tracking-normal">NOV20</strong> for 20% OFF</span>
                <button
                  onClick={() => onSelectPromo?.('NOV20')}
                  className="text-amber-400 hover:text-amber-300 underline ml-1 cursor-pointer font-medium"
                >
                  Shop Now
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
