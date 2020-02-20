import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getColleges } from "../../../redux/actions/college"

function FilteredColleges(props) {
  useEffect(() => {
    props.getColleges()
  }, [])

  var CollegesAfter

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
    <div>
      {CollegesAfter
        ? CollegesAfter.map(college => (
            <h1 key={college._id}>{college.collegename}</h1>
          ))
        : null}
    </div>
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
