import React from "react"

// Material components
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CardActionArea,
} from "@material-ui/core"

// Material helpers
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    maxWidth: "1rem",
    cursor: "pointer",
    textAlign: "center",
    borderRadius: "8px",
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 2px 10px 0 rgba(0,0,0,0.12)",
    },
  },
  title: {
    fontSize: 14,
  },
  sectionHeading: {
    margin: theme.spacing(2),
    background: "linear-gradient(to right,#c5571633 36%, #FFF)",
    width: "54%",
    borderRadius: "7px",
    letterSpacing: "1px",
    padding: theme.spacing(1),
  },
}))

const streams = [
  { name: "Medical", n_colleges: "455" },
  { name: "Medical", n_colleges: "455" },
  { name: "Medical", n_colleges: "455" },
  { name: "Medical", n_colleges: "455" },
]

function Stream(props) {
  const classes = useStyles()
  const { name, n_colleges } = props

  return (
    <Card className={classes.root} elevation={0}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom>
          {n_colleges} Colleges
        </Typography>
      </CardActionArea>
    </Card>
  )
}

export default function Streams() {
  const classes = useStyles()

  return (
    <Container>
      <Typography variant="h5" className={classes.sectionHeading}>
        Streams
      </Typography>
      <Grid container justify="center">
        {streams.map(stream => (
          <Grid item lg={3} md={3} sm={3} xs={12} xl={12} key={stream.name}>
            <Stream name={stream.name} n_colleges={stream.n_colleges} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
