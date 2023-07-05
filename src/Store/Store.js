import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth-slice";
import postSlice from "./Post-slice";

const store = configureStore({
    reducer:{
        auth : authSlice.reducer,
        post: postSlice.reducer,
    }
})

export default store;