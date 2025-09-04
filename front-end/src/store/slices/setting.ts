import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  SettingSliceInitialStateType,
  SettingType,
} from "../../types/types";

const initialState: SettingSliceInitialStateType = {
  setting: {
    mode: "dark", // light or dark mode
  },
};

const settingSlice = createSlice({
  name: "setting",
  initialState,

  reducers: {
    setSetting: (state, action: PayloadAction<SettingType>) => {
      state.setting = action.payload;
    },
  },
});

export const { setSetting } = settingSlice.actions;
export default settingSlice.reducer;
