import React, { useState } from 'react';
import { MessageCircle, Send, Sparkles, Check, Phone, Mail, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { createWhatsAppLink, generateInquiryMessage } from '../utils/whatsapp';

export default function CustomerInquiryForm({ storeConfig }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: 'Gift Ideas',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const inquiryTypes = [
    'Gift Ideas',
    'Custom Gift Branding',
    'Flower Bouquet',
    'Gift Delivery',
    'Order Tracking'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });

    // Open WhatsApp after small delay
    const subject = `Inquiry: ${formData.inquiryType}`;
    const text = `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nTopic: ${formData.inquiryType}\nMessage: ${formData.message}`;
    const waUrl = createWhatsAppLink(
      storeConfig?.whatsappNumber,
      generateInquiryMessage({ subject, messageText: text, storeConfig })
    );

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 800);
  };

  return (
    <section id="inquiries" className="py-20 bg-stone-900 text-stone-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Personalized Gift Service</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Gifts, Bouquets & Custom Branding
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              Looking for a thoughtful gift, custom gift branding, a flower bouquet, or delivery? Tell us what you have in mind and we’ll help you arrange it.
            </p>

            <div className="space-y-4 pt-4 border-t border-stone-800 text-sm text-stone-300">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Direct WhatsApp Response</div>
                  <div className="text-xs text-stone-400">Ask about gifts, bouquets, branding, or delivery</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">{storeConfig?.phone}</div>
                  <div className="text-xs text-stone-400">{storeConfig?.openingHours}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">{storeConfig?.email}</div>
                  <div className="text-xs text-stone-400">For gift branding and service inquiries</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-stone-950/90 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">Inquiry Forwarded to WhatsApp!</h3>
                  <p className="text-stone-300 text-sm max-w-md mx-auto">
                    We've opened a WhatsApp chat window with your details pre-formatted. If WhatsApp didn't open automatically, click the button below.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-stone-800 text-stone-200 text-xs font-semibold hover:bg-stone-700"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-white">
                    Send a Stylist Inquiry
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Elena Rostova"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-700 bg-stone-900 text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +1 555 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-700 bg-stone-900 text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="elena@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-700 bg-stone-900 text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-300 mb-1">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-700 bg-stone-900 text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        {inquiryTypes.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      Your Gift or Delivery Details *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell us the occasion, branding details, bouquet preferences, or delivery needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-700 bg-stone-900 text-stone-100 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-amber-500 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Inquiry Direct to WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
