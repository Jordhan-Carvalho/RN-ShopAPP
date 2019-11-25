import { SIGNUP, SIGNIN } from "./types";

export const signup = (email, password) => async dispatch => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
  AIzaSyB3zHuDRotQ92Ah599dy5Zj_5sg269neMw`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password, returnSecureToken: true })
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    const data = await res.json();
    const errorId = data.error.message;
    let message;

    switch (errorId) {
      case "EMAIL_EXISTS":
        message = "The email address is already in use by another account.";
        break;
      case "OPERATION_NOT_ALLOWED":
        message = "Password sign-in is disabled for this project.";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        message =
          "We have blocked all requests from this device due to unusual activity. Try again later.";
        break;
      default:
        message = "Something went wrong!";
        break;
    }

    throw new Error(message);
  }

  const data = await res.json();

  dispatch({
    type: SIGNUP,
    payload: { token: data.idToken, userId: data.localId }
  });
};

export const signIn = (email, password) => async dispatch => {
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB3zHuDRotQ92Ah599dy5Zj_5sg269neMw";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password, returnSecureToken: true })
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    const data = await res.json();
    const errorId = data.error.message;
    let message;

    switch (errorId) {
      case "EMAIL_NOT_FOUND":
        message = "This email DO NOT EXIST DUMBASS";
        break;
      case "INVALID_PASSWORD":
        message = "PASSWORD IS WRONG DUMFUCK";
        break;
      case "INVALID_EMAIL":
        message = "WTF THIS EMAIL IS NOT EVEN VALID";
        break;
      default:
        message = "Something went wrong!";
        break;
    }

    throw new Error(message);
  }

  const data = await res.json();

  dispatch({
    type: SIGNIN,
    payload: { token: data.idToken, userId: data.localId }
  });
};
