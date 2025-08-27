import { configureStore } from "@reduxjs/toolkit";
import confirmModalSlice from "./slices/confirmModal";
import tasksSlice from "./slices/tasks";

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    confirmModal: confirmModalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export default store;
