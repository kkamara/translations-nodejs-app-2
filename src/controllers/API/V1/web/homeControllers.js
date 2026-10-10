"use strict";

const getHome = (req, res) => {
  const userName = req.query.name || 'Guest';  // Get the user's name from query parameters, default to 'Guest'
  const cartItemCount = parseInt(req.query.items, 10) || 0;  // Get item count from query parameters, default to 0

  return res.json({ 
    title: req.t('title', { ns: "API/home" }),
    welcomeMessage: req.t('welcome_user', {
      ns: "API/home",
      name: userName,
    }),  // Interpolate user's name
    cartMessage: req.t('cart_items', {
      ns: "API/home",
      count: cartItemCount,
    }),  // Display singular/plural based on count
  });
};

module.exports = { getHome };