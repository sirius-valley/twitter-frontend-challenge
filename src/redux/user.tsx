import {createSlice} from "@reduxjs/toolkit";
import {LIMIT} from "../util/Constants";
import {ChatDTO, Post} from "../service";

type InitalStateType = {
  feed: Post[];
  query: string;
  length: number;
  currentChat?: ChatDTO;
};

const initialState: InitalStateType = {
  feed: [],
  length: LIMIT,
  query: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateFeed: (state, action) => {
      state.feed = action.payload;
    },
    setLength: (state, action) => {
      state.length = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const {updateFeed, setLength, setQuery} =
    userSlice.actions;

export default userSlice.reducer;
