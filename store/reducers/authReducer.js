import { SIGNIN, SIGNUP, AUTHENTICATE, LOGOUT } from "../actions/types";

const initialState = {
  token: null,
  userId: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AUTHENTICATE:
    case SIGNIN:
    case SIGNUP:
      return {
        ...state,
        token: payload.token,
        userId: payload.userId
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
