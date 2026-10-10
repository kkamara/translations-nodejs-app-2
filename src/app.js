'use strict';
const path = require('node:path');
const cookieParser = require('cookie-parser');
const sanitize = require('sanitize');
const express = require('express');
const config = require('./config');
const routes = require('./routes');
const { notFound, jsonError, } = require('./middlewares/V1/errorMiddleware');
const { session } = require('./middlewares/V1/sessionMiddleware');
const { minifyHTML } = require('./middlewares/V1/minifyHTMLMiddleware');
const { requestLog } = require('./middlewares/V1/loggingMiddleware');
const { limiter } = require('./middlewares/V1/throttleMiddleware');
const { cors } = require('./middlewares/V1/corsMiddleware');
const { setUserTimezone } = require('./middlewares/V1/timezoneMiddleware');
const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");
const { setLanguage } = require('./middlewares/V1/setLanguageMiddleware.js');

i18next
  .use(Backend)                     // Connects the file system backend
  .use(middleware.LanguageDetector) // Enables automatic language detection
  .init({
    ns: [
      "translation",
      "business",
    ],
    defaultNs: "translation",
    backend: {
      loadPath: path.join(process.cwd(), 'src/locales', '{{lng}}', '{{ns}}.json'), // Path to translation files
    },
    detection: {
      order: ['querystring', 'cookie'], // Priority: URL query string first, then cookies
      caches: ['cookie'],               // Cache detected language in cookies
    },
    fallbackLng: 'en',                   // Default language when no language is detected
    preload: ['en', 'ru'],               // Preload these languages at startup
  });

const app = express();

app.use(middleware.handle(i18next));
app.use(setLanguage);

// For request logs when deployed on remote servers.
// If we don't do this, the logs show the remote address as "127.0.0.1".
if ("production" === config.nodeEnv) {
  app.enable("trust proxy");
}

app.use(limiter);
app.use(requestLog);

app.set('view engine', 'pug');
app.set('views', path.join(
  __dirname,
  'views',
));

app.use(express.static("public"));
app.use('/assets', express.static("frontend/dist/assets"));
app.get('/*', express.static('frontend/dist'));

if ('production' === config.nodeEnv) {
  app.use(minifyHTML);
}

app.use(session);
app.use(cookieParser(config.appKey));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(sanitize.middleware);
app.use(cors);
app.use(setUserTimezone);

app.use('/', routes);

// Serve React app routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.use(notFound);
app.use(jsonError);

if ('production' === config.nodeEnv) {
  app.listen(config.appPort);
} else {
  app.listen(config.appPort, () => {
    const url = `http://127.0.0.1:${config.appPort}`;
    console.log(`Listening on ${url}`);
  });
}
