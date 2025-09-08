import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SettingSliceInitialStateType } from "../../types/types";

const initialState: SettingSliceInitialStateType = {
  setting: {
    theme: "dark", // light or dark mode
  },
};

const settingSlice = createSlice({
  name: "setting",
  initialState,

  reducers: {
    setSetting: (state, action: PayloadAction<typeof state.setting>) => {
      state.setting = action.payload;
    },
    setPartOfSetting: (
      state,
      action: PayloadAction<{
        settingItem: keyof typeof state.setting;
        newSettingValue: string;
      }>
    ) => {
      state.setting[action.payload.settingItem] =
        action.payload.newSettingValue;
    },
  },
});

export const { setSetting, setPartOfSetting } = settingSlice.actions;
export default settingSlice.reducer;
