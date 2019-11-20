import { createStore, combineReducers } from "redux";
import itemsReducer from "./reducers/itemsReducer";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

const rootReducer = combineReducers({
  itemsReducer,
  cartReducer,
  orderReducer
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
