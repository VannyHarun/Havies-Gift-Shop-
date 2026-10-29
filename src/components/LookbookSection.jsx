import React from 'react';
import { Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';
import { LOOKBOOK_ITEMS } from '../data/products';
import { getPublicAssetUrl } from '../utils/assetPaths';

export default function LookbookSection({ onSelectProductById }) {
  return (
    <section id="lookbook" className="py-20 bg-stone-900 text-stone-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Gift Inspiration</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Gifts for Every Occasion
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed">
            Explore gift ideas from the catalog, then contact us about custom branding, flower bouquets, and delivery.
          </p>
        </div>

        {/* Lookbook Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LOOKBOOK_ITEMS.map((look) => (
            <div 
              key={look.id}
              className="group relative rounded-3xl overflow-hidden bg-stone-800/80 border border-stone-700/80 shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={getPublicAssetUrl(look.image)}
                  alt={look.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-stone-900/90 text-amber-300 border border-stone-700 backdrop-blur-md">
                  {look.tag}
                </span>
              </div>

              {/* Look Info */}
              <div className="p-6 space-y-3 bg-stone-950/80 border-t border-stone-800">
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {look.title}
                </h3>
                <p className="text-xs text-stone-400">
                  {look.subtitle}
                </p>

                {/* Shop The Look Button */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (look.items && look.items[0]) {
                        onSelectProductById(look.items[0]);
                      }
                    }}
                    className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors group/btn"
                  >
                    <span>Explore Gift</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                  <span className="text-[11px] text-stone-500 font-mono">
                    {look.items.length} Featured Items
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
