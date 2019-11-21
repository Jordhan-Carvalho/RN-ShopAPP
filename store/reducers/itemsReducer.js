import items from "../../data/items";
import { DELETE_ITEM, CREATE_ITEM, UPDATE_ITEM } from "../actions/types";
import { Product } from "../../data/model";

const initialState = {
  items,
  userProducts: items.filter(prod => prod.ownerId === "u1"),
  loading: true,
  error: {}
};

const itemsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ITEM:
      const newProd = new Product(
        new Date().toString(),
        "u1",
        payload.title,
        payload.imageUrl,
        payload.description,
        payload.price
      );
      return {
        ...state,
        items: [...state.items, newProd],
        userProducts: [...state.userProducts, newProd]
      };
    case UPDATE_ITEM:
      const prodIndex = state.userProducts.findIndex(
        prod => prod.id === payload.id
      );
      const updatedProd = new Product(
        payload.id,
        state.userProducts[prodIndex].ownerId,
        payload.product.title,
        payload.product.imageUrl,
        payload.product.description,
        state.userProducts[prodIndex].price
      );

      // Another correct way to update the array
      // const updatedUserProd = [...state.userProducts]
      // updatedUserProd[prodIndex] = updatedProd
      // const itemsProdIndex = state.items.findIndex(prod => prod.id === payload.id)
      // const updatedItemsProd = [...state.items]
      // updatedItemsProd[itemsProdIndex] = updatedProd
      const newUserProd = state.userProducts.map(prod =>
        prod.id === payload.id ? updatedProd : prod
      );
      const newItemsProd = state.items.map(prod =>
        prod.id === payload.id ? updatedProd : prod
      );

      return {
        ...state,
        items: newItemsProd,
        userProducts: newUserProd
      };
    case DELETE_ITEM:
      return {
        ...state,
        userProducts: state.userProducts.filter(prod => prod.id !== payload),
        items: state.items.filter(prod => prod.id !== payload),
        loading: false
      };
    default:
      return state;
  }
};

export default itemsReducer;
