import React from 'react';
import { MapPin, Clock, Phone, ExternalLink, Sparkles, Navigation, Check } from 'lucide-react';

export default function StoreLocationSection({ storeConfig }) {
  return (
    <section id="location" className="py-20 bg-stone-50 text-stone-900 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5 text-stone-700" />
              <span>Find Our Gift Shop</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Visit Us on Katani Road
            </h2>

            <p className="text-stone-600 text-sm leading-relaxed">
              Visit us for gift ideas, custom gift branding, and flower bouquets. Contact us to arrange gift delivery.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-4 bg-white rounded-2xl border border-stone-200 shadow-sm">
                <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-bold text-stone-900">Boutique Address</h4>
                  <p className="text-xs text-stone-500 mt-0.5">{storeConfig?.address}</p>
                  <a
                    href={storeConfig?.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-700 font-semibold hover:underline mt-1.5"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 bg-white rounded-2xl border border-stone-200 shadow-sm">
                <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-bold text-stone-900">Visiting Hours</h4>
                  <p className="text-xs text-stone-500 mt-0.5">{storeConfig?.openingHours}</p>
                  <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded mt-1 inline-block">
                    Contact us to confirm visiting hours
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 bg-white rounded-2xl border border-stone-200 shadow-sm">
                <Phone className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-bold text-stone-900">Direct Telephone</h4>
                  <p className="text-xs text-stone-500 mt-0.5">{storeConfig?.phone}</p>
                  <a
                    href={`tel:${storeConfig?.phone?.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center gap-1 text-xs text-stone-900 font-bold hover:underline mt-1"
                  >
                    <span>Click to Call Boutique</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Store Card / Simulated Interactive Map */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-300 bg-stone-900 text-white">
              {/* Image banner representing showroom */}
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&auto=format&fit=crop&q=80"
                  alt="Gift shop interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-stone-950/40" />

                {/* Pin callout */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce-slow">
                  <div className="bg-amber-400 text-stone-950 font-bold text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-stone-950">
                    <MapPin className="w-4 h-4 text-stone-950" />
                    <span>{storeConfig?.storeName} Boutique</span>
                  </div>
                  <div className="w-3 h-3 bg-amber-400 rotate-45 -mt-1.5 shadow" />
                </div>
              </div>

              {/* Showroom Perks */}
              <div className="p-6 bg-stone-900 space-y-4">
                <h4 className="font-serif text-base font-bold text-white">
                  Gift Services
                </h4>
                
                <div className="grid grid-cols-2 gap-3 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Gift ideas for every occasion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Custom gift branding</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Flower bouquets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Gift delivery services</span>
                  </div>
                </div>

                <a
                  href={storeConfig?.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-2 flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 text-xs font-semibold border border-stone-700 transition-colors"
                >
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span>Directions to Katani Road</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
