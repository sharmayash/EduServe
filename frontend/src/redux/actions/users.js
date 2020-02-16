import axios from "axios"

import { GET_USERS } from "../actionTypes"

export const getUsers = () => dispatch => {
  const requestBody = {
    query: `
      query{
        users {
          name
          email
        }
      }
      `,
  }

  axios
    .post("http://localhost:4000/graphql", requestBody)
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: err,
      })
    )
}
