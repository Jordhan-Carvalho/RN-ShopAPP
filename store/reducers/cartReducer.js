import { ADD_CART, REMOVE_CART, ADD_ORDER } from "../actions/types";

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
          totalAmount: state.totalAmount + newPayload[0].price,
          loading: false
        };
      } else {
        newPayload = { ...payload, quantity: 1, sum: payload.price };
        return {
          ...state,
          cart: [...state.cart, newPayload],
          totalAmount: state.totalAmount + newPayload.price,
          loading: false
        };
      }
    case REMOVE_CART:
      let removePayload;
      removePayload = state.cart.filter(prod => prod.id === payload);
      if (removePayload[0].quantity === 1) {
        //remove from state
        return {
          ...state,
          cart: state.cart.filter(product => product.id !== payload),
          totalAmount: state.totalAmount - removePayload[0].price,
          loading: false
        };
      } else {
        removePayload[0].quantity--;
        removePayload[0].sum =
          removePayload[0].quantity * removePayload[0].price;
        // new array pushing the new value to the correct index
        const newCart = state.cart.map(x =>
          x.id === payload ? removePayload[0] : x
        );
        return {
          ...state,
          cart: [...newCart],
          totalAmount: state.totalAmount - removePayload[0].price,
          loading: false
        };
      }
    // clear the cart using action form orders
    case ADD_ORDER:
      return {
        ...state,
        cart: [],
        totalAmount: 0,
        loading: false
      };
    default:
      return state;
  }
};

export default cartReducer;
