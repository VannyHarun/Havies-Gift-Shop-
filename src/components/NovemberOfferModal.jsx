import React, { useEffect } from 'react';
import { ArrowRight, Gift, Sparkles, X } from 'lucide-react';

export default function NovemberOfferModal({ isOpen, onClose, onShop }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-stone-950/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="november-offer-title"
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-pink-200 bg-white text-center shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close November offer"
          className="absolute right-3 top-3 z-10 rounded-full bg-white/15 p-2 text-white transition-colors hover:bg-white/25"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative overflow-hidden bg-gradient-to-br from-stone-950 via-fuchsia-950 to-pink-700 px-6 pb-7 pt-8 text-white">
          <div className="absolute -left-12 -top-16 h-40 w-40 rounded-full bg-pink-400/20 blur-2xl" />
          <div className="absolute -bottom-16 -right-10 h-40 w-40 rounded-full bg-amber-300/20 blur-2xl" />
          <div className="relative">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-pink-200/40 bg-white/10">
              <Gift className="h-6 w-6 text-pink-200" />
            </div>
            <p className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-pink-200/30 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-pink-100">
              <Sparkles className="h-3.5 w-3.5" />
              This month's special offer
            </p>
            <h2 id="november-offer-title" className="font-serif text-4xl font-black uppercase leading-tight sm:text-5xl">
              Black <span className="block text-pink-300">November</span>
            </h2>
            <p className="mt-2 text-5xl font-black tracking-tight text-amber-300 sm:text-6xl">20% OFF</p>
            <p className="mt-2 text-sm font-medium text-pink-50">
              On all gifts, flowers, and more — this November only!
            </p>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <p className="text-sm text-stone-600">
            Use code <strong className="rounded-md bg-pink-50 px-2 py-1 font-mono text-base font-bold text-fuchsia-800">NOV20</strong> at checkout.
          </p>
          <button
            type="button"
            onClick={onShop}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-fuchsia-800 px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-fuchsia-700"
          >
            Shop the offer
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-1 text-xs font-medium text-stone-500 transition-colors hover:text-stone-800"
          >
            Continue browsing
          </button>
        </div>
      </section>
    </div>
  );
}
