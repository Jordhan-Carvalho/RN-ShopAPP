import { ADD_CART } from "../actions/types";
import { REMOVE_CART } from "../actions/types";

const initialState = {
  cart: [],
  totalAmount: 0,
  loading: true,
  error: {}
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CART:
      // If item already on cart increase the quantity and sum the price
      let newPayload;
      if (state.cart.some(product => product.id === payload.id)) {
        newPayload = state.cart.filter(prod => prod.id === payload.id);
        newPayload[0].quantity++;
        newPayload[0].sum = newPayload[0].quantity * newPayload[0].price;
        return {
          ...state,
          totalAmount: state.totalAmount + 1,
          loading: false
        };
      } else {
        newPayload = { ...payload, quantity: 1, sum: payload.price };
        return {
          ...state,
          cart: [...state.cart, newPayload],
          totalAmount: state.totalAmount + 1,
          loading: false
        };
      }
    case REMOVE_CART:
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== payload),
        loading: false
      };
    default:
      return state;
  }
};

export default cartReducer;
