import { ADD_CART, REMOVE_CART } from "./types";

export const addCart = product => {
  return { type: ADD_CART, payload: product };
};

export const removeCart = id => {
  return { type: REMOVE_CART, payload: id };
};
