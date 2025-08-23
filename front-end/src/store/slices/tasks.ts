import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TasksSliceInitialStateType, TasksType } from "../../types/types";

const initialState: TasksSliceInitialStateType = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {
    add: (state, action: PayloadAction<TasksType>) => {
      state.tasks.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { add } = tasksSlice.actions;
export default tasksSlice.reducer;
