export const DEFAULT_STORE_CONFIG = {
  storeName: "Flavie's Gift Shop",
  storeTagline: "Gift Ideas, Custom Gift Branding, Flower Bouquets & Gift Delivery Services",
  phone: "+254 745 731 397",
  whatsappNumber: "254745731397",
  email: "orders@flaviesgiftshop.co.ke",
  currency: "KES",
  currencyCode: "KES",
  address: "Katani Road, Kenya",
  googleMapsUrl: "https://maps.google.com/?q=Katani+Road,+Kenya",
  openingHours: "Mon - Sat: 8:30 AM - 7:30 PM | Sun: 10:00 AM - 5:00 PM",
  freeShippingThreshold: 5000,
  socials: {
    instagram: "@flaviesgiftshop",
    tiktok: "@flaviesgiftshop",
    facebook: "FlaviesGiftShopKE",
    facebookUrl: "https://www.facebook.com/profile.php?id=100063752151106"
  },
  promoBanners: [
    { id: 1, text: "FLAVIE FLASH: Use code FLAVIE10 for 10% off your first gift order", code: "FLAVIE10", discount: 10 },
    { id: 2, text: "Gift Delivery Available — Contact Us to Arrange Delivery", code: "DELIVERY", discount: 0 },
    { id: 3, text: "Fast Countrywide Dispatch via Fargo / G4S / EasyCoach / Speedaf", code: "PARCEL", discount: 0 }
  ],
  announcementTicker: [
    "🎁 Welcome to Flavie's Gift Shop — Kenya's Favorite Gift & Lifestyle Boutique",
    "🚚 Gift Delivery Services Available — Contact Us to Arrange Delivery",
    "💬 Instant WhatsApp Ordering: 0745 731 397",
    "🌸 Flower Bouquets, Gift Ideas & Custom Gift Branding",
    "⭐ Rated 4.9/5 by 4,200+ Happy Customers across Kenya"
  ]
};

export const getStoreConfig = () => {
  const saved = localStorage.getItem('flavie_store_config') || localStorage.getItem('aura_store_config');
  if (saved) {
    try {
      const savedConfig = JSON.parse(saved);
      const config = { ...DEFAULT_STORE_CONFIG, ...savedConfig };
      let migrated = false;
      if (config.whatsappNumber === '254714429443') {
        config.whatsappNumber = DEFAULT_STORE_CONFIG.whatsappNumber;
        config.phone = DEFAULT_STORE_CONFIG.phone;
        config.announcementTicker = DEFAULT_STORE_CONFIG.announcementTicker;
        migrated = true;
      }
      if (config.storeTagline === 'Curated Gifts, Trendy Tumblers, Luxury Perfumes, Bags & Lifestyle Accents') {
        config.storeTagline = DEFAULT_STORE_CONFIG.storeTagline;
        migrated = true;
      }
      if (config.address === 'Nairobi, Kenya • Countrywide Parcel Delivery Available') {
        config.address = DEFAULT_STORE_CONFIG.address;
        migrated = true;
      }
      if (config.googleMapsUrl === 'https://maps.google.com/?q=Nairobi+Kenya') {
        config.googleMapsUrl = DEFAULT_STORE_CONFIG.googleMapsUrl;
        migrated = true;
      }
      if (Array.isArray(config.announcementTicker)) {
        const oldDeliveryMessage = '🚚 Fast Doorstep Delivery in Nairobi & Same-Day Countrywide Parcel Dispatch';
        const deliveryIndex = config.announcementTicker.indexOf(oldDeliveryMessage);
        if (deliveryIndex !== -1) {
          config.announcementTicker = [...config.announcementTicker];
          config.announcementTicker[deliveryIndex] = DEFAULT_STORE_CONFIG.announcementTicker[1];
          migrated = true;
        }
      }
      if (migrated) saveStoreConfig(config);
      return config;
    } catch (e) {
      console.error("Failed to parse store config", e);
    }
  }
  return DEFAULT_STORE_CONFIG;
};

export const saveStoreConfig = (config) => {
  localStorage.setItem('flavie_store_config', JSON.stringify(config));
};
