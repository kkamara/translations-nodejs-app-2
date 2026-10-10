"use strict";
const SUPPORTED_LANGUAGES = ['en', 'ru'];

// API clients are stateless: ?lng= wins, then Accept-Language, else the default detection.
const setApiLanguage = (req, res, next) => {
  const requested = SUPPORTED_LANGUAGES.includes(req.query.lng)
    ? req.query.lng
    : req.acceptsLanguages(SUPPORTED_LANGUAGES) || 'en';

  req.language = requested;
  req.t = req.i18n.getFixedT(requested);
  res.locals.lng = requested;
  res.set('Content-Language', requested);
  res.vary('Accept-Language');
  next();
};

module.exports = { setApiLanguage, SUPPORTED_LANGUAGES };
