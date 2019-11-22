import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

import itemsReducer from "./reducers/itemsReducer";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";

const rootReducer = combineReducers({
  itemsReducer,
  cartReducer,
  orderReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
