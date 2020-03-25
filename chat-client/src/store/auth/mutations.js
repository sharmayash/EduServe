export const MUTATE_LOGIN = (state, payload) => {
  state.auth = {
    ...state.auth,
    ...payload
  }
}

export const MUTATE_LOGOUT = (state, payload) => {
  state.auth = {
    token: null,
    userId: null,
    username: null
  }
}

export const MUTATE_LOAD_USER = (state, payload) => {
  state.auth = {
    ...payload
  }
}
