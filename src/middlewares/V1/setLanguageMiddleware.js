"use strict";

const setLanguage = (req, res, next) => {
  res.locals.lng = req.language;
  next();
};

module.exports = { setLanguage };