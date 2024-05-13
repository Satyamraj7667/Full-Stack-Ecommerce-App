import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Store/cartSlice";



export const store = configureStore({
    reducer: {
        cart: cartReducer,

    },
})