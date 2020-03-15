import React from "react"
import { connect } from "react-redux"

// Material components
import {
  AppBar,
  Toolbar,
  CssBaseline,
  useScrollTrigger,
  Button,
  InputBase,
} from "@material-ui/core"

// Material helpers
import { makeStyles } from "@material-ui/core/styles"

// Material icons
import { Search as SearchIcon } from "@material-ui/icons"

// Custom styles
import styles from "./styles"

// Custom components
import LoginModal from "./login-modal"

import logo from "../../../static/images/logo.png"

const useStyles = makeStyles(styles)

function ElevationScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}
function ElevateAppBar(props) {
  const classes = useStyles()
  const { auth } = props

  const [dialogOpen, setDialogOpen] = React.useState(false)

  return (
    <React.Fragment>
      <CssBaseline />
      <LoginModal
        open={dialogOpen}
        changeOpenState={() => setDialogOpen(!dialogOpen)}
      />
      <ElevationScroll {...props}>
        <AppBar
          color="default"
          classes={{
            colorDefault: classes.colorTransparent,
          }}>
          <Toolbar>
            <img style={{ height: "1.35rem" }} src={logo} />
            <span className={classes.title}></span>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            {auth.isAuthenticated ? (
              <Button
                color="primary"
                variant="contained">
                Profile
              </Button>
            ) : (
              <Button
                onClick={() => setDialogOpen(true)}
                color="primary"
                variant="contained">
                Join
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  )
}
const mapStateToProps = state => ({
  auth: state.authReducer,
})

export default connect(mapStateToProps)(ElevateAppBar)
