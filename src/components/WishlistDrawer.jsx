import React from 'react';
import { X, Heart, ShoppingBag, Trash2, MessageCircle } from 'lucide-react';
import { createWhatsAppLink, generateSingleProductMessage } from '../utils/whatsapp';
import { getPublicAssetUrl } from '../utils/assetPaths';

export default function WishlistDrawer({ 
  isOpen, 
  onClose, 
  wishlist, 
  products, 
  onRemoveFromWishlist, 
  onAddToCart, 
  storeConfig 
}) {
  if (!isOpen) return null;

  const currency = storeConfig?.currency || '$';
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Saved Wishlist ({wishlistedProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-300">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-base font-bold text-stone-800">Your wishlist is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Click the heart icon on any product to bookmark your favorite items for later.
                </p>
              </div>
            ) : (
              wishlistedProducts.map((product) => {
                const defaultSize = product.sizes ? product.sizes[0] : 'Standard';
                const defaultColor = product.colors ? product.colors[0].name : 'Standard';

                const waMessage = generateSingleProductMessage({
                  product,
                  selectedSize: defaultSize,
                  selectedColor: defaultColor,
                  quantity: 1,
                  storeConfig
                });
                const directWaLink = createWhatsAppLink(storeConfig?.whatsappNumber, waMessage);

                return (
                  <div 
                    key={product.id}
                    className="flex gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200 items-center justify-between"
                  >
                    <img
                      src={getPublicAssetUrl(product.images[0])}
                      alt={product.name}
                      className={`w-16 h-20 rounded-xl flex-shrink-0 ${
                        product.imageFit === 'contain' ? 'object-contain bg-white' : 'object-cover object-top bg-stone-200'
                      }`}
                    />

                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="font-serif text-xs font-bold text-stone-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs font-mono font-bold text-stone-950 mt-0.5">
                        {currency}{product.price}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => {
                            onAddToCart(product, defaultSize, defaultColor, 1);
                            onRemoveFromWishlist(product.id);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-stone-900 text-white text-[11px] font-semibold flex items-center gap-1 hover:bg-stone-800"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Bag</span>
                        </button>

                        <a
                          href={directWaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 rounded-lg bg-emerald-600/15 text-emerald-700 text-[11px] font-bold flex items-center gap-1 border border-emerald-500/30"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveFromWishlist(product.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-500 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-stone-200 bg-white">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold"
            >
              Back to Catalog
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
