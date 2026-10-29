import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  MessageCircle, 
  ArrowRight, 
  Tag, 
  Check, 
  Truck, 
  Sparkles,
  MapPin,
  User,
  Phone,
  Copy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { createWhatsAppLink, generateCartOrderMessage } from '../utils/whatsapp';
import { getPublicAssetUrl } from '../utils/assetPaths';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  storeConfig,
  onClearCart
}) {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [copied, setCopied] = useState(false);

  // Customer Delivery Info for WhatsApp
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const currency = storeConfig?.currency || '$';
  const freeShippingThreshold = storeConfig?.freeShippingThreshold || 75;

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.code === 'LUXE20') {
      discountAmount = subtotal * 0.20;
    } else if (appliedPromo.code === 'VIPSTYLE') {
      discountAmount = subtotal * 0.15;
    } else if (appliedPromo.code === 'FREESHIP') {
      discountAmount = 0; // free shipping handled below
    }
  }

  const shippingCost = (subtotal >= freeShippingThreshold || appliedPromo?.code === 'FREESHIP') ? 0 : 10;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const cleanCode = promoCode.trim().toUpperCase();

    if (cleanCode === 'LUXE20') {
      setAppliedPromo({ code: 'LUXE20', label: '20% Off Apparel Discount' });
      confetti({ particleCount: 60, spread: 55, origin: { y: 0.7 } });
    } else if (cleanCode === 'FREESHIP') {
      setAppliedPromo({ code: 'FREESHIP', label: 'Complimentary Free Shipping' });
      confetti({ particleCount: 60, spread: 55, origin: { y: 0.7 } });
    } else if (cleanCode === 'VIPSTYLE') {
      setAppliedPromo({ code: 'VIPSTYLE', label: '15% Off VIP Member Discount' });
      confetti({ particleCount: 60, spread: 55, origin: { y: 0.7 } });
    } else {
      setPromoError('Invalid coupon code. Try LUXE20 or FREESHIP');
    }
  };

  // WhatsApp Order Link Generator
  const waOrderMessage = generateCartOrderMessage({
    cart,
    subtotal,
    discount: discountAmount,
    discountCode: appliedPromo?.code,
    total: grandTotal,
    customer: customerInfo,
    storeConfig
  });
  const waUrl = createWhatsAppLink(storeConfig?.whatsappNumber, waOrderMessage);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(waOrderMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Your Shopping Bag ({cart.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-amber-50/60 border-b border-amber-100 text-xs">
            {amountToFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex justify-between font-medium text-amber-900">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-amber-600" />
                    <span>Add {currency}{amountToFreeShipping.toFixed(2)} more for <strong>FREE Delivery</strong></span>
                  </span>
                  <span>{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full h-1.5 bg-amber-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500 rounded-full" 
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>You qualify for FREE Express Delivery! 🎉</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-base font-bold text-stone-800">Your bag is currently empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our luxury collection and add pieces you love to order directly.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map((item, index) => (
                    <div 
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                      className="flex gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200"
                    >
                      {/* Thumbnail */}
                      <img
                        src={getPublicAssetUrl(item.images ? item.images[0] : item.image)}
                        alt={item.name}
                        className="w-18 h-22 object-cover object-top rounded-xl bg-stone-200 flex-shrink-0"
                      />

                      {/* Info & Quantity */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-serif text-xs font-bold text-stone-900 line-clamp-1">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(index)}
                              className="text-stone-400 hover:text-rose-500 transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-1.5 mt-1 text-[11px] text-stone-500">
                            <span className="bg-white px-2 py-0.5 rounded border border-stone-200">
                              Size: <strong>{item.selectedSize}</strong>
                            </span>
                            <span className="bg-white px-2 py-0.5 rounded border border-stone-200">
                              Color: <strong>{item.selectedColor}</strong>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/60">
                          {/* Stepper */}
                          <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden text-xs">
                            <button
                              onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                              className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 font-bold"
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 font-bold font-mono text-stone-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                              className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 font-bold"
                            >
                              +
                            </button>
                          </div>

                          <span className="font-serif text-sm font-bold text-stone-900">
                            {currency}{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="pt-2">
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Discount code (e.g. LUXE20)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 uppercase focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold"
                    >
                      Apply
                    </button>
                  </form>

                  {appliedPromo && (
                    <div className="mt-1.5 flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      <span className="flex items-center gap-1 font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{appliedPromo.label} ({appliedPromo.code})</span>
                      </span>
                      <button 
                        onClick={() => setAppliedPromo(null)}
                        className="text-stone-400 hover:text-rose-500 text-[10px]"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {promoError && (
                    <p className="mt-1 text-xs text-rose-500">{promoError}</p>
                  )}
                </div>

                {/* Delivery Information Accordion for WhatsApp */}
                <div className="border border-stone-200 rounded-2xl p-3.5 bg-stone-50 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>Delivery & Contact Details (for WhatsApp checkout):</span>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <input
                      type="text"
                      placeholder="Phone / WhatsApp Contact Number"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <input
                      type="text"
                      placeholder="Delivery Address / City / Landmark"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900">{currency}{subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount ({appliedPromo?.code})</span>
                    <span>-{currency}{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span>{shippingCost === 0 ? <strong className="text-emerald-600">FREE</strong> : `${currency}${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-bold text-stone-900 font-serif">
                  <span>Estimated Total</span>
                  <span className="text-base text-stone-950">{currency}{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Main CTA: Complete Order on WhatsApp */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all text-center"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Order via WhatsApp ({currency}{grandTotal.toFixed(2)})</span>
              </a>

              {/* Copy Summary helper */}
              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                <button
                  onClick={handleCopySummary}
                  className="hover:text-stone-700 flex items-center gap-1 underline"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copied ? 'Copied Order Summary!' : 'Copy order text'}</span>
                </button>
                <button
                  onClick={onClearCart}
                  className="hover:text-rose-500 underline"
                >
                  Empty bag
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
