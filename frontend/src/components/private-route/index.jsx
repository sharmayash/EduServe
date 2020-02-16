import React, { Component } from "react"
import { navigate } from "gatsby"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/login`) {
    navigate("/login")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute
