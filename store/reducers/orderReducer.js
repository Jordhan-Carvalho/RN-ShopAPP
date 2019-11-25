import { ADD_ORDER, GET_ORDERS } from "../actions/types";
import { Order } from "../../data/model";

const initialState = {
  orders: []
};

const orderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: payload
      };
    case ADD_ORDER:
      const newOrder = new Order(
        payload.id,
        payload.items,
        payload.amount,
        payload.date
      );
      return {
        ...state,
        orders: [...state.orders, newOrder]
      };
    default:
      return state;
  }
};

export default orderReducer;
