import { DELETE_ITEM, CREATE_ITEM, UPDATE_ITEM } from "./types";

export const deleteItem = id => {
  return { type: DELETE_ITEM, payload: id };
};

export const createItem = product => {
  return { type: CREATE_ITEM, payload: product };
};

export const updateItem = (product, id) => {
  return { type: UPDATE_ITEM, payload: { product, id } };
};
