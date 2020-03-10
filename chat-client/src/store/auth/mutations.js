export const MUTATE_LOGIN = (state, payload) => {
  console.log(payload);
  state.auth = {
    ...state.auth,
    ...payload
  }
}