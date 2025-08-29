import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PageNameSliceInitialStateType } from "../../types/types";

const initialState: PageNameSliceInitialStateType = {
  pageName: "my day",
};

const pageNameSlice = createSlice({
  name: "pageName",
  initialState,
  reducers: {
    changePageName: (state, action: PayloadAction<string>) => {
      state.pageName = action.payload;
    },
  },
});
export const { changePageName } = pageNameSlice.actions;
export default pageNameSlice.reducer;
