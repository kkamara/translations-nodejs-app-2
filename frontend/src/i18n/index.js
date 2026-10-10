import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next, } from "react-i18next"

import en from "./locales/en.json"
import ru from "./locales/ru.json"

export const SUPPORTED_LANGUAGES = ["en", "ru"]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
        en: { translation: en, },
        ru: { translation: ru, },
    },
    supportedLngs: SUPPORTED_LANGUAGES,
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    fallbackLng: "en",
    interpolation: { escapeValue: false, },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "lng",
      caches: ["localStorage"],
    },
  })

const syncHtmlLang = (lng) => {
  document.documentElement.lang = (lng || "en").slice(0, 2)
}
syncHtmlLang(i18n.language)
i18n.on("languageChanged", syncHtmlLang)

export default i18n
