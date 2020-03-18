export const GET_userId = ({ auth }) => auth.userId

export const GET_username = ({ auth }) => auth.username

export const GET_isAuthenticated = ({ auth }) => {
  const token = auth.token || localStorage.getItem("token")
  if (!token) return false
  else return true
}