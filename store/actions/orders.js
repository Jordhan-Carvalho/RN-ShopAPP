import { ADD_ORDER, GET_ORDERS } from "./types";

export const addOrder = (cartItems, totalAmount) => async (
  dispatch,
  getState
) => {
  const token = getState().authReducer.token;
  const userId = getState().authReducer.userId;
  const date = new Date();
  const url = `https://rn-complete-guide-e2b2d.firebaseio.com/orders/${userId}.json?auth=${token}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      items: cartItems,
      amount: totalAmount,
      date: date.toISOString()
    })
  };

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Something went wrong !");
  }

  const data = await res.json();

  dispatch({
    type: ADD_ORDER,
    payload: { id: data.name, items: cartItems, amount: totalAmount, date }
  });
};

export const getOrders = () => async (dispatch, getState) => {
  try {
    const userId = getState().authReducer.userId;
    const url = `https://rn-complete-guide-e2b2d.firebaseio.com/orders/${userId}.json`;
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    let ordersArray = [];
    for (const key in data) {
      ordersArray.push({
        id: key,
        items: data[key].items,
        totalAmount: data[key].amount,
        date: new Date(data[key].date)
      });
    }

    dispatch({ type: GET_ORDERS, payload: ordersArray });
  } catch (error) {
    throw err;
  }
};
