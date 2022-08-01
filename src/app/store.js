import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { recipesApi } from "../services/recipesApi";

export const store = configureStore({
    reducer: {
        [recipesApi.reducerPath]: recipesApi.reducer,
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(recipesApi.middleware);
    },
});

setupListeners(store.dispatch);