"use strict";

const getHome = (req, res) => {
  const userName = String(req.query.name || 'Guest').slice(0, 50);
  const cartItemCount = Math.min(Math.max(parseInt(req.query.items, 10) || 0, 0), 1_000_000);

  return res.json({
    language: req.language,
    title: req.t('title', { ns: "API/home" }),
    welcomeMessage: req.t('welcome_user', {
      ns: "API/home",
      name: userName,
      interpolation: { escapeValue: false }, // JSON response; React escapes on render
    }),
    cartMessage: req.t('cart_items', {
      ns: "API/home",
      count: cartItemCount,
    }),  // Display singular/plural based on count
  });
};

module.exports = { getHome };