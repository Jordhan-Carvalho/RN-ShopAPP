import {
  DELETE_ITEM,
  CREATE_ITEM,
  UPDATE_ITEM,
  GET_ITEMS,
  ITEMS_ERROR
} from "./types";
import { Alert } from "react-native";

export const getItems = () => async dispatch => {
  try {
    const url = "https://rn-complete-guide-e2b2d.firebaseio.com/products.json";
    const res = await fetch(url);
    const data = await res.json();

    let prodArray = [];
    for (const key in data) {
      let prod = {
        id: key,
        ownerId: "u1",
        title: data[key].title,
        imageUrl: data[key].imageUrl,
        price: data[key].price,
        description: data[key].description
      };
      prodArray.push(prod);
    }

    dispatch({ type: GET_ITEMS, payload: prodArray });
  } catch (error) {
    // real life, send to custom analytics server
    dispatch({ type: ITEMS_ERROR, payload: error });
  }
};

export const deleteItem = id => async dispatch => {
  try {
    const url = `https://rn-complete-guide-e2b2d.firebaseio.com/products/${id}.json`;
    const options = {
      method: "DELETE"
    };
    // by adding  /products firebase automatic creates the products level on DB
    await fetch(url, options);

    dispatch({ type: DELETE_ITEM, payload: id });
  } catch (error) {
    // real life, send to custom analytics server
    dispatch({ type: ITEMS_ERROR, payload: error });
  }
};

export const createItem = product => async dispatch => {
  try {
    const url = "https://rn-complete-guide-e2b2d.firebaseio.com/products.json";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    };
    // by adding  /products firebase automatic creates the products level on DB
    const res = await fetch(url, options);
    const data = await res.json();

    dispatch({ type: CREATE_ITEM, payload: { ...product, id: data.name } });
  } catch (error) {
    // real life, send to custom analytics server
    dispatch({ type: ITEMS_ERROR, payload: error });
  }
};

export const updateItem = (product, id) => async dispatch => {
  try {
    const url = `https://rn-complete-guide-e2b2d.firebaseio.com/products/${id}.jon`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    };
    // by adding  /products firebase automatic creates the products level on DB
    const res = await fetch(url, options);
    console.log(res);

    dispatch({ type: UPDATE_ITEM, payload: { product, id } });
  } catch (error) {
    Alert.alert("asd", "asdsd");
    // real life, send to custom analytics server
    dispatch({ type: ITEMS_ERROR, payload: error });
  }
};
