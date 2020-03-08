import Api from "../../utils/api"
import { LOGIN_USER, AUTH_ERROR } from "../actionTypes"

export const loginUser = (email, password) => dispatch => {
  const requestBody = {
    query: `
        query{
          loginUser(email: "${email}", password: "${password}"){
            token
            userEmail
          }
        }
        `,
  }
  return Api.post("/graphql", requestBody)
    .then(({ data }) => {
      dispatch({
        type: LOGIN_USER,
        payload: data.data.loginUser
      })
      return data.data.loginUser;
    })
    .catch(e => {
      dispatch({
        type: AUTH_ERROR
      })
    })
}