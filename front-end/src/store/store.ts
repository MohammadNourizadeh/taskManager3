import { configureStore } from "@reduxjs/toolkit";
import confirmModalSlice from "./slices/confirmModal";
import pageNameSlice from "./slices/pageName";
import settingSlice from "./slices/setting";
import tasksSlice from "./slices/tasks";
import userInfoSlice from "./slices/userInfo";

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    confirmModal: confirmModalSlice,
    pageName: pageNameSlice,
    setting: settingSlice,
    userInfo: userInfoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export default store;
