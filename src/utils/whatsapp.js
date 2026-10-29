/**
 * Utilities for generating WhatsApp deep links and formatted order messages
 */

export const createWhatsAppLink = (phoneNumber, text) => {
  // Clean phone number: remove +, -, (), and spaces
  const cleanPhone = (phoneNumber || '').replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
};

export const generateSingleProductMessage = ({ product, selectedSize, selectedColor, quantity = 1, storeConfig, customerNote = '' }) => {
  const currency = storeConfig?.currency || '$';
  let message = `Hello ${storeConfig?.storeName || 'Store'}! 👋\n\n`;
  message += `I would like to order / inquire about this item from your online catalog:\n\n`;
  message += `✨ *Product:* ${product.name}\n`;
  message += `🏷️ *SKU:* ${product.sku || 'N/A'}\n`;
  message += `💰 *Price:* ${currency}${product.price} each\n`;
  message += `📏 *Size:* ${selectedSize || 'Standard'}\n`;
  message += `🎨 *Color:* ${selectedColor || 'Standard'}\n`;
  message += `🔢 *Quantity:* ${quantity}\n`;
  message += `💵 *Estimated Total:* ${currency}${product.price * quantity}\n`;

  if (customerNote && customerNote.trim()) {
    message += `📝 *Note:* ${customerNote.trim()}\n`;
  }

  message += `\nCould you please confirm availability, payment instructions, and delivery timeline? Thank you!`;
  return message;
};

export const generateCartOrderMessage = ({ cart, subtotal, discount, discountCode, total, customer, storeConfig }) => {
  const currency = storeConfig?.currency || '$';
  let message = `Hello ${storeConfig?.storeName || 'Store'}! 🛍️\n\n`;
  message += `I would like to place an order from your online store catalog:\n\n`;
  message += `📦 *ORDER ITEMS (${cart.length} item${cart.length > 1 ? 's' : ''}):*\n`;
  message += `--------------------------------\n`;

  cart.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    message += `   Size: ${item.selectedSize} | Color: ${item.selectedColor} | Qty: ${item.quantity}\n`;
    message += `   Price: ${currency}${item.price * item.quantity} (${currency}${item.price} each)\n\n`;
  });

  message += `--------------------------------\n`;
  message += `Subtotal: ${currency}${subtotal.toFixed(2)}\n`;
  if (discount > 0) {
    message += `Discount (${discountCode || 'PROMO'}): -${currency}${discount.toFixed(2)}\n`;
  }
  message += `*ESTIMATED TOTAL: ${currency}${total.toFixed(2)}*\n\n`;

  if (customer && (customer.name || customer.phone || customer.address)) {
    message += `📍 *CUSTOMER & DELIVERY DETAILS:*\n`;
    if (customer.name) message += `• Name: ${customer.name}\n`;
    if (customer.phone) message += `• Phone: ${customer.phone}\n`;
    if (customer.address) message += `• Address / City: ${customer.address}\n`;
    if (customer.notes) message += `• Special Instructions: ${customer.notes}\n`;
    message += `\n`;
  }

  message += `Please confirm my order, payment methods (M-Pesa / Bank / Card / Cash on Delivery), and shipping details. Thank you!`;
  return message;
};

export const generateInquiryMessage = ({ subject, messageText, storeConfig }) => {
  let message = `Hello ${storeConfig?.storeName || 'Store'}! 👋\n\n`;
  message += `*Topic:* ${subject || 'General Inquiry'}\n\n`;
  if (messageText) {
    message += `${messageText}\n\n`;
  }
  message += `I'm reaching out through your online store app. Looking forward to your response!`;
  return message;
};
