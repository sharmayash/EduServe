import React from "react"
import { Spring } from "react-spring/renderprops"

function Layout({ children }) {
  return (
    <Spring
      from={{ opacity: 0, marginLeft: -100 }}
      to={{ opacity: 1, marginLeft: 0 }}>
      {props => <main style={props}>{children}</main>}
    </Spring>
  )
}

export default Layout
