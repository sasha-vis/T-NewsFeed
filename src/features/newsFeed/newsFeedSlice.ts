import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type NewsFeedState, type PostsResponse } from "./types";
import axios from "axios";

const initialState: NewsFeedState = {
  posts: [],
  status: "idle",
  error: null,
  skip: 0,
  hasMore: true,
};

export const fetchPosts = createAsyncThunk(
  "newsFeed/fetchPosts",
  async (skip: number) => {
    const response = await axios.get<PostsResponse>(
      `https://dummyjson.com/posts?limit=10&skip=${skip}`
    );
    return response.data;
  }
);

const newsFeedSlice = createSlice({
  name: "newsFeed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = [...state.posts, ...action.payload.posts];
        state.skip = state.skip + 10;
        state.hasMore = state.posts.length < action.payload.total;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch posts";
      });
  },
});

export default newsFeedSlice.reducer;
