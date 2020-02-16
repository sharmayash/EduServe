import React from "react"
import { Router } from "react-router-dom"
import { createBrowserHistory } from "history"
import { Provider } from "react-redux"

import { MuiThemeProvider as ThemeProvider } from "@material-ui/core/styles"

// Routes
import Routes from "./Routes"

import store from "./redux/store"

import theme from "./themes/theme"

import Header from "./components/header"
import Footer from "./components/footer"

// Browser history
const browserHistory = createBrowserHistory()

export default () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Header />
      <Router history={browserHistory}>
        <Routes />
      </Router>
      <Footer />
    </ThemeProvider>
  </Provider>
)
