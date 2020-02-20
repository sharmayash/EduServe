import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getColleges } from "../../../redux/actions/college"
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Grid,
  Typography,
  CardActionArea,
  Container,
} from "@material-ui/core"

import demo from "../../../../static/images/demo.jpg"

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

function CollegeCard(props) {
  const classes = useStyles()
  const { name, bio } = props

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={demo}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {bio}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}
function FilteredColleges(props) {
  const classes = useStyles()
  var CollegesAfter

  useEffect(() => {
    props.getColleges()
  }, [])

  if (props.colleges.colleges.data) {
    let { colleges } = props.colleges.colleges.data
    let aas = colleges.map(cllg => {
      if (
        cllg.coursesOffered.some(
          cat => cat.category === props.match.params.stream_name
        )
      ) {
        return cllg
      }
    })

    CollegesAfter = aas.filter(clg => clg !== undefined)
  }

  return (
    <Container>
      <Typography variant="h5" className={classes.sectionHeading}>
        {props.match.params.stream_name} Colleges
      </Typography>
      <Grid container justify="center">
        {CollegesAfter
          ? CollegesAfter.map(college => (
              <Grid item lg={3} md={6} sm={6} xs={12} xl={12} key={college._id}>
                <CollegeCard name={college.collegename} bio={college.bio} />
              </Grid>
            ))
          : null}
      </Grid>
    </Container>
  )
}

FilteredColleges.propTypes = {
  getColleges: PropTypes.func.isRequired,
  colleges: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  colleges: state.colleges,
})

export default connect(mapStateToProps, { getColleges })(FilteredColleges)
