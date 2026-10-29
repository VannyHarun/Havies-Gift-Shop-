import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { getStoreConfig, saveStoreConfig } from './data/storeConfig';

// Components
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import LookbookSection from './components/LookbookSection';
import ReviewsSection from './components/ReviewsSection';
import CustomerInquiryForm from './components/CustomerInquiryForm';
import StoreLocationSection from './components/StoreLocationSection';
import WhatsAppInquiryWidget from './components/WhatsAppInquiryWidget';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import AdminSettingsModal from './components/AdminSettingsModal';
import Footer from './components/Footer';

export default function App() {
  const [storeConfig, setStoreConfig] = useState(() => getStoreConfig());
  const [products] = useState(PRODUCTS);
  
  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal & Drawer toggles
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [pwaModalOpen, setPwaModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Sync cart & wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aura_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // PWA beforeinstallprompt handler
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  useEffect(() => {
    const productId = new URLSearchParams(window.location.search).get('product');
    const sharedProduct = products.find((product) => product.id === productId);
    if (sharedProduct) setSelectedProduct(sharedProduct);
  }, [products]);

  const handlePromptInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted PWA installation');
      }
      setDeferredPrompt(null);
    } else {
      // Open informative dialog (especially for iOS or already installed)
      setPwaModalOpen(true);
    }
  };

  // Cart actions
  const handleAddToCart = (product, size, color, qty = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }

      return [
        ...prev,
        {
          ...product,
          selectedSize: size,
          selectedColor: color,
          quantity: qty
        }
      ];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter(id => id !== productId));
  };

  // Store config customizer
  const handleSaveConfig = (newConfig) => {
    setStoreConfig(newConfig);
    saveStoreConfig(newConfig);
  };

  const handleSelectProductById = (productId) => {
    const found = products.find(p => p.id === productId);
    if (found) {
      setSelectedProduct(found);
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-stone-900 selection:bg-amber-400 selection:text-stone-950">
      
      {/* Top Announcement Bar */}
      <AnnouncementBar 
        storeConfig={storeConfig} 
        onSelectPromo={() => setCartOpen(true)}
      />

      {/* Main Sticky Navbar */}
      <Navbar
        storeConfig={storeConfig}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onInstallPwa={() => setPwaModalOpen(true)}
        canInstallPwa={!!deferredPrompt}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          storeConfig={storeConfig}
          onExploreCatalog={scrollToCatalog}
          onInstallApp={() => setPwaModalOpen(true)}
        />

        {/* Product Catalog & Showroom */}
        <ProductCatalog
          products={products}
          storeConfig={storeConfig}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        {/* Lookbook / Shop the Look */}
        <LookbookSection 
          onSelectProductById={handleSelectProductById}
        />

        {/* Customer Reviews & Social Proof */}
        <ReviewsSection />

        {/* Concierge & Bespoke Styling Inquiries */}
        <CustomerInquiryForm 
          storeConfig={storeConfig} 
        />

        {/* Showroom & Physical Location */}
        <StoreLocationSection 
          storeConfig={storeConfig} 
        />
      </main>

      {/* Footer */}
      <Footer 
        storeConfig={storeConfig} 
        onInstallPwa={() => setPwaModalOpen(true)}
      />

      {/* Floating WhatsApp Quick Action Widget */}
      <WhatsAppInquiryWidget 
        storeConfig={storeConfig} 
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        storeConfig={storeConfig}
        onAddToCart={handleAddToCart}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        storeConfig={storeConfig}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        products={products}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
        storeConfig={storeConfig}
      />

      {/* PWA Install Modal */}
      <PWAInstallPrompt
        isOpen={pwaModalOpen}
        onClose={() => setPwaModalOpen(false)}
        deferredPrompt={deferredPrompt}
        onPromptInstall={handlePromptInstall}
      />

      {/* Store Owner Admin / Settings Modal */}
      <AdminSettingsModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        storeConfig={storeConfig}
        onSaveConfig={handleSaveConfig}
      />

    </div>
  );
}
