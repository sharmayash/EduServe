import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

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

import { CareersStyles, CareerStyles } from "./styles"

const Styles = makeStyles(CareersStyles)
const Styles2 = makeStyles(CareerStyles)

const links = [
  {
    name: "Colleges",
    link: "/"
  },
  {
    name: "Reviews",
    link: "/"
  },
  {
    name: "Something Else",
    link: "/"
  }
]

function ExploreLinks(props) {
  const classes = Styles2()
  const { name, link } = props

  return (
    <Link to={`/${link}`} style={{ textDecoration: "none" }}>
      <Card className={classes.root} elevation={0}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h5">{name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}

function Explore(props) {
  const classes = Styles()

  return (
    <Container className={classes.space}>
      <Typography variant="h4" className={classes.sectionHeading}>
        Explore
      </Typography>
      <Grid container justify="center">
        {links.map(({name, link}) => (
          <Grid item lg={3} md={6} sm={6} xs={12} xl={12} key={name}>
            <ExploreLinks name={name} to={link} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(Explore)
