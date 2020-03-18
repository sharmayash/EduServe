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

  return axios.post("/graphql", requestBody)
    .then(({ data }) => {
      return new Promise((resolve, reject) => {
        try {
          commit("MUTATE_LOGIN", data.data.loginUser)
          localStorage.setItem("token", data.data.loginUser.token)
          resolve(data.data.loginUser)
          // return data.data.loginUser

        } catch (error) {
          reject(data.errors[0].message)
          // return new Error(error)
        }
      })
    })
}

export const LOGOUT = ({ commit }) => {
  localStorage.removeItem("token")
  commit("MUTATE_LOGOUT")
}

export const LOAD_USER = ({ commit }) => {
  const token = localStorage.getItem('token')
  if (!token) return false;
  else {
    const requestBody = {
      query:
        `query isUserLoggedIn {
           isUserLoggedIn
         }`
    }

    return axios.post('/graphql', requestBody)
      .then(({ data }) => {
        return data.data.isUserLoggedIn
      })
      .catch(e => {
        console.log(e);
        return false
      })
  }
}