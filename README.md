# Flavie's Gift Shop — Online Marketing Website & Progressive Web App (PWA)

An interactive, high-converting marketing website and installable Progressive Web App (PWA) for **Flavie's Gift Shop**, pre-populated with your authentic catalog items, prices in Kenyan Shillings (KES), and direct WhatsApp commerce integrated with **+254 745 731 397**.

---

## 🛍️ What is Included

### 1. Pre-Loaded Catalog with Real PDF Inventory & Pricing (KES)
- **Tumblers & Drinkware:**
  - Stanley Mug Big 40oz with Handle — `1,350 Kes` (Art. 006)
  - Cola Thermos Flask 500ml — `800 Kes` (Art. 001)
  - The Flowstate Floral Stanley Mug 1.18L — `3,350 Kes` (Art. 078)
  - Thermo-LED Smart Temperature Flask — `830 Kes` (Art. 008)
  - Thermoflask Luxury Gift Box Set with 3 Cups — `1,500 Kes` (Art. 007)
  - Fancy Diamond Textured Straw Tumbler — `1,150 Kes` (Art. 004)
- **Perfumes & Beauty Care:**
  - Mousuf Eau de Parfum 100ml — `2,500 Kes` (Art. 084)
  - Sauvage Men’s Luxury Perfume — `2,500 Kes` (Art. 124)
  - Yara Perfumed Body Lotion & Spray Set — `700 Kes` (Art. 067)
  - Handmade Aromatherapy Scented Candles — `1,000 Kes` (Art. 049)
  - Sadoer Coconut Hydrate Luxury Gift Set — `400 Kes` (Art. 090)
- **Bags & Handbags:**
  - Woven Luxury Shoulder Bag (36x12x25cm) — `1,980 Kes` (Art. 081)
  - Mini Push Lock Designer Handbag — `1,799 Kes` (Art. 018)
  - Summer Straw Beach Bag & Sun Hat Set — `2,500 Kes` (Art. 022)
  - 4-in-1 Handbag Combo Set — `500 Kes` (Art. 100)
- **Watches & Tech:**
  - GT6 Watch Ultimate AMOLED Smartwatch — `5,000 Kes` (Art. 029)
  - Poedager Green Dial Luxury Men’s Watch — `4,000 Kes` (Art. 031)
  - Q12 Kid’s GPS Smartwatch with SOS — `2,500 Kes` (Art. 034)
- **Footwear & Crocs:**
  - Lightweight Chunky Fashion Sneakers — `3,500 Kes` (Art. 123)
  - Lady’s Block Heels — `2,000 Kes` (Art. 099)
  - Comfort Charms Crocs Slides — `550 Kes` (Art. 106)
  - Quality Kids Designer Sneakers — `2,000 Kes` (Art. 044)
- **Home Decor, Kitchen & Gifts:**
  - Ceramic Table Geometric Vase — `2,350 Kes` (Art. 014)
  - Giant Plush Teddy Bear — `2,000 Kes` (Art. 021)
  - Non-Stick Stainless Steel Kitchen Knife Set — `900 Kes` (Art. 108)
  - Executive A5 Business Notebook & Pen Set — `1,500 Kes` (Art. 055)
  - Chunky Knitted Sofa Throw Blanket — `2,850 Kes` (Art. 129)

### 2. WhatsApp Direct Commerce (+254 745 731 397)
- **Instant Item Order:** Clicking "Order WA" on any item generates a pre-formatted message:
  ```
  Hello Flavie's Gift Shop! 👋
  I would like to order:
  ✨ Product: Stanley Mug Big 40oz
  🏷️ SKU: ART-006
  💰 Price: 1,350 Kes
  📏 Spec: 40oz (1.18L)
  🎨 Color: Teal Green
  ```
- **Shopping Bag Checkout:** Compiles all selected items, discounts, customer name, phone number, and delivery location into one clean WhatsApp message sent to **`254745731397`**.

---

## 🚀 How to Open and Run

### Open the standalone shop

Visit the hosted standalone shop at `https://vannyharun.github.io/Havies-Gift-Shop-/index-standalone.html`.

### Use the shop offline

1. Open the hosted standalone shop while connected to the internet: `https://vannyharun.github.io/Havies-Gift-Shop-/index-standalone.html`.
2. Keep the page open until it says **Offline catalog ready on this device**. This saves the shop, its product images, and app files to that browser.
3. Select **Install** (or use the browser menu and choose **Install app** / **Add to Home Screen**). After setup, the catalog, cart, and wishlist work without data on that same device and browser.

The initial admin password is `123`. After 14 days, the admin must sign in with the current password and set a new password of at least eight characters. This password is stored only in the browser and is not server-side security. WhatsApp ordering still needs an internet connection.

## Facebook
- Use the Facebook button in the site navigation or footer to visit the shop's Facebook profile.

## Deploy to GitHub Pages

1. Push this project to a GitHub repository on the `main` or `master` branch.
2. In the repository, open **Settings → Pages** and set the build and deployment source to **GitHub Actions**.
3. The included workflow builds both store pages and deploys them automatically after each push. Its status and live URL appear under the repository's **Actions** tab.

The main store is at the repository root; the standalone Havie's Gift Shop is available at `/index-standalone.html`. The Vite build configures the correct base path for both project pages and `username.github.io` sites. Product images, the PWA manifest, and service worker use that path as well.
