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

import { CareerStyles, CareersStyles } from "./styles"

const Styles1 = makeStyles(CareerStyles)
const Styles2 = makeStyles(CareersStyles)

const careers = ["Medical", "Engineering", "Pharma", "Aviation"]

function Career(props) {
  const classes = Styles1()
  const { name } = props

  return (
    <Link to={`/category/${name}`} style={{ textDecoration: "none" }}>
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

function Careers(props) {
  const classes = Styles2()

  return (
    <Container className={classes.space}>
      <Typography variant="h4" className={classes.sectionHeading}>
        Careers
      </Typography>
      <Grid container justify="center">
        {careers.map(career => (
          <Grid item lg={3} md={6} sm={6} xs={12} xl={12} key={career}>
            <Career name={career} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(Careers)
