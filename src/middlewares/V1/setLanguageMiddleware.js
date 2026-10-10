"use strict";

const setLanguage = async (req, res, next) => {
  const routePath = req.originalUrl || req.path;
  const header = req.get("Accept-Language");

  // API clients send Accept-Language; it must beat a stale i18next cookie.
  if (routePath.includes("/api") && header && !req.query.lng) {
    const supported = req.i18n.options.supportedLngs || [];
    const requested = header.split(",")[0].trim().split("-")[0].toLowerCase();
    if (supported.includes(requested)) {
      await req.i18n.changeLanguage(requested);
    }
  }

  res.locals.lng = req.i18n.language;
  next();
};

module.exports = { setLanguage };