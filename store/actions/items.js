import {
  DELETE_ITEM,
  CREATE_ITEM,
  UPDATE_ITEM,
  GET_ITEMS,
  ITEMS_ERROR
} from "./types";

export const getItems = () => async (dispatch, getState) => {
  try {
    const userId = getState().authReducer.userId;
    const url = "https://rn-complete-guide-e2b2d.firebaseio.com/products.json";
    const res = await fetch(url);
    const data = await res.json();

    let prodArray = [];
    for (const key in data) {
      let prod = {
        id: key,
        ownerId: data[key].ownerId,
        title: data[key].title,
        imageUrl: data[key].imageUrl,
        price: data[key].price,
        description: data[key].description
      };
      prodArray.push(prod);
    }

    dispatch({
      type: GET_ITEMS,
      payload: {
        prodArray,
        userProducts: prodArray.filter(prod => prod.ownerId === userId)
      }
    });
  } catch (error) {
    // real life, send to custom analytics server
    dispatch({ type: ITEMS_ERROR, payload: error });
  }
};

export const deleteItem = id => async (dispatch, getState) => {
  const token = getState().authReducer.token;
  const url = `https://rn-complete-guide-e2b2d.firebaseio.com/products/${id}.json?auth=${token}`;
  const options = {
    method: "DELETE"
  };
  // by adding  /products firebase automatic creates the products level on DB
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  dispatch({ type: DELETE_ITEM, payload: id });
};

export const createItem = product => async (dispatch, getState) => {
  try {
    const userId = getState().authReducer.userId;
    const token = getState().authReducer.token;
    const url = `https://rn-complete-guide-e2b2d.firebaseio.com/products.json?auth=${token}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...product, ownerId: userId })
    };
    // by adding  /products firebase automatic creates the products level on DB
    const res = await fetch(url, options);
    const data = await res.json();

    dispatch({
      type: CREATE_ITEM,
      payload: { ...product, id: data.name, ownerId: userId }
    });
  } catch (error) {
    // real life, send to custom analytics server
    dispatch({ type: ITEMS_ERROR, payload: error });
  }
};

//Redux thunk give access to redux state on the fucntion as argument
export const updateItem = (product, id) => async (dispatch, getState) => {
  const token = getState().authReducer.token;
  const url = `https://rn-complete-guide-e2b2d.firebaseio.com/products/${id}.json?auth=${token}`;
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  };
  // by adding  /products firebase automatic creates the products level on DB
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  dispatch({ type: UPDATE_ITEM, payload: { product, id } });
};
