import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Heart, 
  ShoppingBag, 
  MessageCircle, 
  Eye, 
  Star,
  SlidersHorizontal,
  Check,
  ArrowUpDown
} from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { createWhatsAppLink, generateSingleProductMessage } from '../utils/whatsapp';
import { getPublicAssetUrl } from '../utils/assetPaths';

export default function ProductCatalog({ 
  products, 
  storeConfig, 
  wishlist, 
  onToggleWishlist, 
  onAddToCart, 
  onSelectProduct,
  onQuickOrder
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedBadge, setSelectedBadge] = useState('all');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      
      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = !query || 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        (p.badge && p.badge.toLowerCase().includes(query)) ||
        p.sku.toLowerCase().includes(query);

      // Badge filter
      const matchBadge = selectedBadge === 'all' || p.badge?.toLowerCase() === selectedBadge.toLowerCase();

      return matchCategory && matchSearch && matchBadge;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, selectedCategory, searchQuery, sortBy, selectedBadge]);

  const currency = storeConfig?.currency || '$';

  return (
    <section id="catalog" className="py-16 bg-stone-50 text-stone-900 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Gift Catalog</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Gifts & Thoughtful Finds
            </h2>
            <p className="text-stone-500 text-sm mt-1 max-w-xl">
              Browse gift ideas and place an order through WhatsApp. Ask us about custom branding, flower bouquets, and gift delivery.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-3 text-xs text-stone-500">
            <span className="px-3 py-1.5 bg-stone-200/70 rounded-full font-medium">
              Showing {filteredProducts.length} of {products.length} Items
            </span>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search gifts, drinkware, bags, flowers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-stone-50/50"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort & Quick Badges */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <ArrowUpDown className="w-4 h-4 text-stone-400 hidden sm:block" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 text-xs font-medium rounded-xl border border-stone-200 bg-stone-50/50 text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="featured">Featured / Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Customer Rated</option>
                </select>
              </div>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-stone-100">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-stone-900 text-white shadow-md shadow-stone-900/10'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300">
            <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800">No pieces found</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              We couldn't find items matching your search. Try resetting your query or category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              const defaultSize = product.sizes ? product.sizes[0] : 'Standard';
              const defaultColor = product.colors ? product.colors[0].name : 'Default';

              // Pre-generate WhatsApp direct URL
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
                  className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Top Image Box */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onSelectProduct(product)}>
                    <img
                      src={getPublicAssetUrl(product.images[0])}
                      alt={product.name}
                      className={`w-full h-full ${
                        product.imageFit === 'contain'
                          ? 'object-contain bg-white'
                          : 'object-cover object-top transition-transform duration-700 group-hover:scale-105'
                      }`}
                      loading="lazy"
                    />

                    {/* Secondary image hover effect if available */}
                    {product.images[1] && (
                      <img
                        src={getPublicAssetUrl(product.images[1])}
                        alt={product.name}
                        className={`w-full h-full absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                          product.imageFit === 'contain' ? 'object-contain bg-white' : 'object-cover object-top'
                        }`}
                        loading="lazy"
                      />
                    )}

                    {/* Badge */}
                    {product.badge && (
                      <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                        product.badgeType === 'gold' 
                          ? 'bg-amber-400 text-stone-950'
                          : product.badgeType === 'rose'
                          ? 'bg-rose-500 text-white'
                          : 'bg-stone-900 text-white'
                      }`}>
                        {product.badge}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full shadow-md backdrop-blur-md transition-all active:scale-90 ${
                        isWishlisted
                          ? 'bg-rose-500 text-white'
                          : 'bg-white/80 text-stone-700 hover:text-rose-500 hover:bg-white'
                      }`}
                      aria-label="Save to Wishlist"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>

                    {/* Quick View Pill on Desktop Hover */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="w-full py-2.5 rounded-xl bg-stone-950/90 text-white text-xs font-semibold backdrop-blur-md hover:bg-stone-900 shadow-lg flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View & Sizes</span>
                      </button>
                    </div>
                  </div>

                  {/* Bottom Content Box */}
                  <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                    
                    {/* Title & Ratings */}
                    <div>
                      <div className="flex items-center justify-between gap-1 text-[11px] text-stone-500 mb-1">
                        <span className="uppercase font-semibold tracking-wider text-amber-700">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{product.rating}</span>
                          <span className="text-stone-400 font-normal">({product.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 
                        onClick={() => onSelectProduct(product)}
                        className="font-serif text-base font-bold text-stone-900 hover:text-amber-700 transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h3>
                      
                      <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price and Sizes Summary */}
                    <div>
                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="font-serif text-lg font-bold text-stone-950">
                          {currency}{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-stone-400 line-through">
                            {currency}{product.originalPrice}
                          </span>
                        )}
                        {product.originalPrice && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                            Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                          </span>
                        )}
                      </div>

                      {/* Sizes Preview */}
                      {product.sizes && (
                        <div className="flex items-center gap-1 mt-2 overflow-x-auto pb-1">
                          <span className="text-[10px] text-stone-400 uppercase mr-1">Sizes:</span>
                          {product.sizes.slice(0, 4).map((s) => (
                            <span key={s} className="px-1.5 py-0.5 text-[10px] font-medium bg-stone-100 rounded text-stone-600 border border-stone-200">
                              {s}
                            </span>
                          ))}
                          {product.sizes.length > 4 && (
                            <span className="text-[10px] text-stone-400">+{product.sizes.length - 4}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons: Add to Bag & Direct WhatsApp Order */}
                    <div className="pt-2 grid grid-cols-3 gap-2 border-t border-stone-100">
                      
                      {/* WhatsApp Direct Order Button */}
                      <a
                        href={directWaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-700 font-bold text-xs border border-emerald-500/30 transition-all text-center"
                        title="Order this specific item on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Order WA</span>
                      </a>

                      {/* Add to Bag Button */}
                      <button
                        onClick={() => onAddToCart(product, defaultSize, defaultColor)}
                        className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-all shadow-sm active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add Bag</span>
                      </button>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
