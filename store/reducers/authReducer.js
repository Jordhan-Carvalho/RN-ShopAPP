import { SIGNIN, SIGNUP } from "../actions/types";

const initialState = {
  token: null,
  userId: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SIGNIN:
    case SIGNUP:
      return {
        ...state,
        token: payload.token,
        userId: payload.userId
      };

    default:
      return state;
  }
}
