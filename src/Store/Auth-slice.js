import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn:false,
    user:{
      email:null,
      password:null
    },
    error:null,
    loading:false
};


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
          setLoading: (state, action) => {
            state.loading = action.payload;
            
          },
          setUser: (state, action) => {       
            state.user = action.payload;
            state.isLoggedIn=true;
          },
          setError: (state, action) => {
            state.error = action.payload;
          },
          clearError: (state) => {
            state.error = null;
          },
          logoutSuccess: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
            state.isLoggedIn = false;
          },
    }
})

export const { setLoading, setUser, setError, clearError , logoutSuccess} = authSlice.actions;
export default authSlice;