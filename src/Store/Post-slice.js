import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState: {
      likeStatus: {},
      commentStatus:{}, // Store the like status for each post
    },
    reducers: {
      toggleLike: (state, action) => {
        const {currentUserID,postId}  = action.payload;
        if (!state.likeStatus[currentUserID]) {
          state.likeStatus[currentUserID] = {};
        }
        state.likeStatus[currentUserID][postId] = !state.likeStatus[currentUserID][postId];
      },
    },
  });
  
  export const { toggleLike } = postSlice.actions;
  
  export default postSlice;