import React from "react"
import { useTranslation, } from "react-i18next"

import { SUPPORTED_LANGUAGES, } from "../../i18n"

export default function LanguageSwitcher() {
  const { i18n, t, } = useTranslation()
  const current = (i18n.resolvedLanguage || "en").slice(0, 2)

  return (
    <select
      className="form-select form-select-sm w-auto"
      aria-label={t("nav.language")}
      value={current}
      onChange={e => i18n.changeLanguage(e.target.value)}
    >
      {SUPPORTED_LANGUAGES.map(lng => (
        <option key={lng} value={lng}>{lng.toUpperCase()}</option>
      ))}
    </select>
  )
}
