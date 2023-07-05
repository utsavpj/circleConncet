import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState: {
      likeStatus: {}, // Store the like status for each post
    },
    reducers: {
      toggleLike: (state, action) => {
        const {uid,postId}  = action.payload;
        if (!state.likeStatus[uid]) {
          state.likeStatus[uid] = {};
        }
        state.likeStatus[uid][postId] = !state.likeStatus[uid][postId];
      },
    },
  });
  
  export const { toggleLike } = postSlice.actions;
  
  export default postSlice;