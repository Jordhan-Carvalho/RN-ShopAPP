import { ADD_CART } from "./types";

export const addCart = product => {
  return { type: ADD_CART, payload: product };
};
