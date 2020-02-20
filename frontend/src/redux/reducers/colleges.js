import { GET_COLLEGES } from "../actionTypes"

const initialState = {
  colleges: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COLLEGES:
      return {
        ...state,
        colleges: action.payload,
      }
    default:
      return state
  }
}
