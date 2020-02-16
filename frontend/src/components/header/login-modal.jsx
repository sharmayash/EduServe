import React from "react"
import { GoogleLogin } from "react-google-login"
import axios from "axios"

// Material components
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  FormControlLabel,
  Link,
  Checkbox,
  Divider,
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function FormDialog(props) {
  const classes = useStyles()
  const { open, changeOpenState } = props

  const handleClose = () => {
    changeOpenState()
  }

  const onGoogleSignIn = googleUser => {
    console.log("Logged in as: " + googleUser.getBasicProfile().getName())
    const id_token = googleUser.getAuthResponse().id_token
    console.log(id_token)
    const requestBody = {
      query: `
        query{
           googleSignIn(id_token:"${id_token}"){
               token
           }
        }
        `,
    }
    axios
      .post("http://localhost:4000/graphql", requestBody)
      .then(x => console.log(x.data.data))
      .catch(err => console.log(err))
  }

  const onGoogleSignInFailure = err => {
    console.log(err)
  }

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
          Welcome Back
        </DialogTitle>
        <DialogContent>
          <center>
            <DialogContentText>
              Login with your email & password
            </DialogContentText>
          </center>
          <div className={classes.form}>
            <TextField
              margin="dense"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              Continue
            </Button>
            <Divider
              variant="middle"
              style={{ width: "43%", float: "left", marginTop: "0.8rem" }}
            />
            <span style={{ fontSize: "1rem" }}>Or</span>
            <Divider
              style={{ width: "42%", float: "right", marginTop: "0.8rem" }}
            />
            <div className={classes.submit}>
              <GoogleLogin
                clientId="757653173276-vtfmi7r68aphk76gccne70c7af3uh8hj.apps.googleusercontent.com"
                buttonText="Continue with Google"
                onSuccess={onGoogleSignIn}
                onFailure={onGoogleSignInFailure}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
