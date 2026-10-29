import React from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquareQuote } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 bg-stone-100 text-stone-900 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-widest">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Client Satisfaction</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Loved by Fashion Connoisseurs
          </h2>
          <div className="flex items-center justify-center gap-2 pt-1 text-sm font-semibold text-stone-700">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span>4.9 / 5 Average Rating from over 3,800+ buyers</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative"
            >
              <MessageSquareQuote className="w-8 h-8 text-amber-200 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Stars */}
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-stone-700 text-sm leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-stone-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-stone-200"
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-stone-900 flex items-center gap-1.5">
                    <span>{t.name}</span>
                    {t.verified && (
                      <span className="inline-flex items-center text-[10px] text-emerald-700 font-sans font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                        Verified Buyer
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-stone-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
