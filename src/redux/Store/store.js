import { configureStore } from "@reduxjs/toolkit";
import { productReducers } from "../slices/productSlice";
import { adminReducer } from "../slices/adminSlice";
import { currentUserReducer } from "../slices/currentUserSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['currentUser'],
};

const rootReducer = combineReducers({
    products: productReducers,
    admin: adminReducer,
    currentUser: persistReducer(persistConfig, currentUserReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    "persist/PERSIST",
                    "persist/REHYDRATE",
                ],
            },
        }),
});

export const persistor = persistStore(store);
