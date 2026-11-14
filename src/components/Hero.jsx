import React from 'react';
import { ArrowRight, MessageCircle, Sparkles, ShieldCheck, Truck, Clock, Smartphone } from 'lucide-react';
import { createWhatsAppLink } from '../utils/whatsapp';
import { isNovemberOfferActive } from '../utils/promotions';

export default function Hero({ storeConfig, onExploreCatalog, onInstallApp }) {
  const promoActive = isNovemberOfferActive();
  const whatsappUrl = createWhatsAppLink(
    storeConfig?.whatsappNumber,
    `Hello ${storeConfig?.storeName}! I am interested in gift ideas, gift branding, flower bouquets, and gift delivery.`
  );

  return (
    <section className="relative overflow-hidden bg-stone-900 text-stone-100">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.15),rgba(255,255,255,0))]" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-stone-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{promoActive ? "This Month's Special Offer" : 'Thoughtful Gifts & Floral Bouquets'}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              {promoActive ? (
                <>
                  Black
                  <span className="block bg-gradient-to-r from-rose-200 via-pink-400 to-amber-300 bg-clip-text text-transparent italic">
                    November
                  </span>
                  <span className="block mt-2 text-amber-300">20% OFF</span>
                </>
              ) : (
                <>
                  Make Every Occasion
                  <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent italic">
                    Feel Special.
                  </span>
                </>
              )}
            </h1>

            <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              {promoActive
                ? 'Enjoy 20% off on all gifts, flower bouquets, and custom gift branding this November only. Limited-time savings for thoughtful gifting and seasonal surprises.'
                : 'Find thoughtful gift ideas, personalize gifts with custom branding, choose a fresh flower bouquet, and arrange gift delivery. Visit us on Katani Road, Kenya.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreCatalog}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-stone-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-amber-500 hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>{promoActive ? 'Shop This Offer' : 'Explore Gift Ideas'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-semibold text-sm border border-emerald-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Fast Order</span>
              </a>

              <button
                onClick={onInstallApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-stone-800/90 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition-all"
                title="Install app to your home screen"
              >
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>Install Mobile App</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-800/80 text-xs text-stone-400">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-stone-200">Thoughtful Gifts</div>
                  <div className="text-[11px] text-stone-400">Ideas for every occasion</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-stone-200">Gift Delivery</div>
                  <div className="text-[11px] text-stone-400">Ask us to arrange delivery</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-stone-200">{promoActive ? 'This Month Only' : 'Custom Branding'}</div>
                  <div className="text-[11px] text-stone-400">{promoActive ? 'Valid throughout November' : 'Make your gift personal'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-700/60 group">
                <img
                  src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1000&auto=format&fit=crop&q=80"
                  alt="Colorful flower bouquet arranged as a thoughtful gift"
                  className="w-full h-[460px] sm:h-[520px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                <div className="absolute top-4 right-4 bg-stone-950/70 backdrop-blur-sm px-4 py-3 rounded-xl border border-rose-400/50 shadow-lg text-left">
                  <span className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider block">{promoActive ? 'November Promo' : 'Made Personal'}</span>
                  <p className="text-sm text-white font-serif font-bold">{promoActive ? '20% OFF' : 'Gifts for Every Occasion'}</p>
                  <span className="text-[11px] text-stone-300 font-mono">{promoActive ? 'On all orders this month' : 'Gift branding available'}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-stone-950/70 backdrop-blur-sm p-3.5 rounded-xl border border-stone-700/80 shadow-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <span>★ 4.9 Rating</span>
                      <span className="text-stone-400 font-normal">| 3,800+ Clients</span>
                    </div>
                    <p className="text-[11px] text-stone-300">"A thoughtful gift, beautifully put together."</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-emerald-600/30 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
