import React, { useEffect, } from "react"
import { useDispatch, useSelector, } from "react-redux"
import { Helmet, } from "react-helmet"

export default function HomeComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({}))

  return (
    <div className="container home-container">
      <Helmet>
        <title>Home - {import.meta.env.VITE_APP_NAME}</title>
      </Helmet>
      <div className="text-center">
        <button className="btn btn-primary home-button">
          Test Button
        </button>
      </div>
    </div>
  )
}
