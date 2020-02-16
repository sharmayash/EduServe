import axios from 'axios'

export const isBrowser = () => typeof window !== "undefined"

export const login = async (email, password) => {
    const query = `
        query {
            loginUser(email: ${email}, password: ${password}){
                token
            }
        }
    `

    axios.post('http://localhost:4000/graphql', { query })
    .then(({data}) => {
        console.log(data.data)
    })
}