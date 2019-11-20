import { ADD_ORDER } from "../actions/types";
import { Order } from "../../data/model";

const initialState = {
  orders: []
};

const orderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        payload.items,
        payload.amount,
        new Date()
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
