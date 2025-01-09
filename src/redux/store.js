import {configureStore , combineReducers} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import transactionReducer from "./transaction/slice"
import authReducer from "./auth/slice"
import modalReducer from "./modal/slice"
import bankApiReducer from "./bankApi/slice"

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const rootReducer = combineReducers({
    transactions: transactionReducer,
    auth:persistReducer(authPersistConfig, authReducer),
    modal: modalReducer,
    bankApi: bankApiReducer
  });


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),

});
export const persistor = persistStore(store);