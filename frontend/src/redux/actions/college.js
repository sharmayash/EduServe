import axios from "axios"

import { GET_COLLEGES } from "../actionTypes"

export const getColleges = () => dispatch => {
  const requestBody = {
    query: `
      query{
        colleges{
          _id
          collegename
          coursesOffered {
            category
          }
        }
      }
      `,
  }

  axios
    .post("http://localhost:4000/graphql", requestBody)
    .then(res =>
      dispatch({
        type: GET_COLLEGES,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COLLEGES,
        payload: err,
      })
    )
}
