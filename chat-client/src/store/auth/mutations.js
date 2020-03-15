export const MUTATE_LOGIN = (state, payload) => {
  state.auth = {
    ...state.auth,
    ...payload
  }
}