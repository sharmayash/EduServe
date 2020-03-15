import { SET_MESSAGE, RESET_MESSAGE } from '../actionTypes';

export const setMsg = (message, message_type) => dispatch => {
  dispatch({
    type: SET_MESSAGE,
    payload: { message, message_type }
  });
};

export const resetMsg = () => dispatch => {
  dispatch({
    type: RESET_MESSAGE
  });
};