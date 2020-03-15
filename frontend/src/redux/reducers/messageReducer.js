import { SET_MESSAGE, RESET_MESSAGE } from "../actionTypes";

const initialState = {
  message: "",
  message_type: "success"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        message_type: action.payload.message_type
      };

    case RESET_MESSAGE:
      return {
        ...state,
        message: "",
        message_type: "success"
      };

    default:
      return state;
  }
}
