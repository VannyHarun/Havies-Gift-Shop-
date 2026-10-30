import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MessageCircle, 
  ShoppingBag, 
  Heart, 
  Check, 
  ShieldCheck, 
  Truck, 
  Ruler, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { createWhatsAppLink, generateSingleProductMessage } from '../utils/whatsapp';
import { getPublicAssetUrl } from '../utils/assetPaths';

export default function ProductModal({ 
  product, 
  isOpen, 
  onClose, 
  storeConfig, 
  onAddToCart, 
  wishlist, 
  onToggleWishlist 
}) {
  if (!isOpen || !product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0].name : 'Default');
  const [quantity, setQuantity] = useState(1);
  const [customerNote, setCustomerNote] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'materials' | 'shipping'

  const currency = storeConfig?.currency || '$';
  const isWishlisted = wishlist.includes(product.id);

  // Generate WhatsApp order text
  const waMessage = generateSingleProductMessage({
    product,
    selectedSize,
    selectedColor,
    quantity,
    storeConfig,
    customerNote
  });
  const waUrl = createWhatsAppLink(storeConfig?.whatsappNumber, waMessage);

  const handleAddAndClose = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-stone-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Gallery Column */}
          <div className="p-4 sm:p-6 bg-stone-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
            <div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-stone-200 shadow-inner">
                <img
                  src={getPublicAssetUrl(product.images[activeImageIndex] || product.images[0])}
                  alt={product.name}
                  className={`w-full h-full ${
                    product.imageFit === 'contain' ? 'object-contain bg-white' : 'object-cover object-top'
                  }`}
                />

                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-stone-900 text-amber-300 shadow">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeImageIndex === idx ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={getPublicAssetUrl(img)}
                        alt="thumbnail"
                        className={`w-full h-full ${
                          product.imageFit === 'contain' ? 'object-contain bg-white' : 'object-cover object-top'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Micro perks */}
            <div className="mt-6 pt-4 border-t border-stone-200 grid grid-cols-2 gap-3 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Doorstep Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Verified Quality</span>
              </div>
            </div>
          </div>

          {/* Right: Details & WhatsApp Action Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div className="space-y-5">
              
              {/* Category, Rating & Title */}
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span className="uppercase font-semibold tracking-wider text-amber-800">
                    {product.category} • SKU: {product.sku}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-stone-400">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-3 mt-2">
                  <span className="font-serif text-2xl font-bold text-stone-950">
                    {currency}{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      {currency}{product.originalPrice}
                    </span>
                  )}
                  {product.inStock && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      In Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs mb-2 font-medium text-stone-700">
                    <span>Color: <strong className="text-stone-900">{selectedColor}</strong></span>
                  </div>
                  <div className="flex gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`group relative p-1 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColor === c.name ? 'border-amber-600 scale-105' : 'border-stone-300 hover:border-stone-400'
                        }`}
                        title={c.name}
                      >
                        <span 
                          className="w-6 h-6 rounded-full block border border-black/10 shadow-inner" 
                          style={{ backgroundColor: c.hex }} 
                        />
                        {selectedColor === c.name && (
                          <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-medium text-stone-700">
                      Selected Size: <strong className="text-stone-900">{selectedSize}</strong>
                    </span>
                    <button 
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1 underline text-[11px]"
                    >
                      <Ruler className="w-3 h-3" />
                      <span>{showSizeGuide ? 'Hide Guide' : 'Size & Fit Guide'}</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`min-w-[42px] px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          selectedSize === s
                            ? 'bg-stone-900 text-white shadow-md'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {showSizeGuide && (
                    <div className="mt-3 p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                      <p className="font-bold">📐 Fit Advice:</p>
                      <p>True to size. For an oversized drape, consider sizing up one size. Our team is available on WhatsApp for custom measurements.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity Selector & Optional Note */}
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-xs font-medium text-stone-700 block mb-1">Quantity:</span>
                  <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-bold font-mono text-stone-900 min-w-[32px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex-grow">
                  <span className="text-xs font-medium text-stone-700 block mb-1">Custom Note (Optional):</span>
                  <input
                    type="text"
                    placeholder="e.g. Please hem 2cm or gift wrap"
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* WhatsApp Message Live Preview Box */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3.5 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Direct WhatsApp Order Format:</span>
                </div>
                <p className="text-[11px] text-emerald-950 font-mono bg-white/70 p-2 rounded-lg border border-emerald-100 whitespace-pre-line leading-relaxed">
                  "Hello {storeConfig?.storeName}! I want to order {product.name} (Size: {selectedSize}, Color: {selectedColor}, Qty: {quantity}) for {currency}{product.price * quantity}..."
                </p>
              </div>

            </div>

            {/* CTAs */}
            <div className="mt-6 pt-4 border-t border-stone-200 space-y-2.5">
              
              {/* Primary: Direct WhatsApp Order */}
              <div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Instant Order via WhatsApp</span>
                </a>
              </div>

              {/* Secondary: Add to Bag + Wishlist */}
              <div className="flex gap-2">
                <button
                  onClick={handleAddAndClose}
                  className="flex-grow flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Bag ({currency}{product.price * quantity})</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isWishlisted 
                      ? 'bg-rose-50 border-rose-300 text-rose-500' 
                      : 'border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
