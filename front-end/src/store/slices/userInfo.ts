import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: { username: string } = {
  username: `Guest User`,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = userInfoSlice.actions;
export default userInfoSlice.reducer;
