import axios from 'axios'

export const LOGIN = ({ commit }, { email, password }) => {
  const requestBody = {
    query: `
        query{
          loginUser(email: "${email}", password: "${password}"){
            token
            userEmail
            userId
          }
        }
        `,
  }

  return axios.post("http://localhost:4000/graphql", requestBody)
    .then(({ data }) => {
      commit("MUTATE_LOGIN", data.data.loginUser)
      return data.data.loginUser;
    })
    .catch(e => {
      console.log(e);
    })
}