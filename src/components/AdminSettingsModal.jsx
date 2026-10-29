import React, { useState } from 'react';
import { X, SlidersHorizontal, Save, RotateCcw, Check, Sparkles, MessageCircle } from 'lucide-react';
import { DEFAULT_STORE_CONFIG } from '../data/storeConfig';

export default function AdminSettingsModal({ isOpen, onClose, storeConfig, onSaveConfig }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({ ...storeConfig });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    setFormData({ ...DEFAULT_STORE_CONFIG });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-stone-900 space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">Shop Customizer</h3>
              <p className="text-xs text-stone-500">Configure your store details & WhatsApp number</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Store Brand Name
            </label>
            <input
              type="text"
              required
              value={formData.storeName}
              onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Store Tagline / Slogan
            </label>
            <input
              type="text"
              value={formData.storeTagline}
              onChange={(e) => setFormData({ ...formData, storeTagline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
            <label className="block font-bold text-emerald-900 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Phone Number (with Country Code) *</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 15553829014 or 254712345678"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-emerald-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs"
            />
            <p className="text-[10px] text-emerald-700 leading-tight">
              Enter numbers only including country code (e.g. 1 for US, 44 for UK, 254 for Kenya). All WhatsApp orders and inquiries will be delivered directly to this number.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Currency Symbol
              </label>
              <input
                type="text"
                placeholder="$ / € / £ / KSh"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Free Delivery Above
              </label>
              <input
                type="number"
                value={formData.freeShippingThreshold}
                onChange={(e) => setFormData({ ...formData, freeShippingThreshold: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Physical Boutique Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Store Hours
            </label>
            <input
              type="text"
              value={formData.openingHours}
              onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {savedSuccess && (
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl flex items-center gap-2 font-bold animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Store settings updated successfully!</span>
            </div>
          )}

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 text-stone-500 hover:text-stone-800 flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold flex items-center gap-1.5 shadow-md"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>Save & Apply</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
