import items from "../../data/items";

const initialState = {
  items,
  userProducts: items.filter(prod => prod.ownerId === "u1"),
  loading: true,
  error: {}
};

const itemsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

export default itemsReducer;
