export const isNovemberOfferActive = (date = new Date()) =>
  date.getFullYear() === 2026 && date.getMonth() === 10;
