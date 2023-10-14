import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import authenticationReducer from "./authSlice";
import alertReducer from "./alertSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authenticationReducer,
    alert: alertReducer,
  },
});

const rootReducer = combineReducers({
  products: productsReducer,
	auth: authenticationReducer,
	alert: alertReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
