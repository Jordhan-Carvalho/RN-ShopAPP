import { TOGGLE_CART } from "./types";

export const toggleCart = id => {
  return { type: TOGGLE_CART, payload: id };
};
