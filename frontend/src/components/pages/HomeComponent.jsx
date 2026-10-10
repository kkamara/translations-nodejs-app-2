import React, { useCallback, useEffect, useState, } from "react"
import { Helmet, } from "react-helmet"
import { useTranslation, } from "react-i18next"

import HttpService from "../../services/HttpService"

const http = new HttpService()

export default function HomeComponent() {
  const { t, i18n, } = useTranslation()
  const lng = (i18n.resolvedLanguage || "en").slice(0, 2)
  const [data, setData] = useState(null)
  const [status, setStatus] = useState("loading")

  // Refetches when the language changes; returns a cancel function for stale responses.
  const load = useCallback(() => {
    let cancelled = false
    setStatus("loading")
    http.getData("/home")
      .then(res => {
        if (cancelled) return
        setData(res.data)
        setStatus("ready")
      })
      .catch(() => {
        if (!cancelled) setStatus("error")
      })
    return () => { cancelled = true }
  }, [lng])

  useEffect(() => load(), [load])

  return (
    <div className="container home-container">
      <Helmet>
        <title>{t("home.pageTitle")} - {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <div className="text-center">
        {"loading" === status && <p>{t("home.loading")}</p>}
        {"error" === status && (
          <>
            <p className="text-danger">{t("home.error")}</p>
            <button className="btn btn-primary" onClick={load}>{t("home.retry")}</button>
          </>
        )}
        {"ready" === status && data && (
          <>
            <h1>{data.title}</h1>
            <p>{data.welcomeMessage}</p>
            <p>{data.cartMessage}</p>
          </>
        )}
      </div>
    </div>
  )
}
