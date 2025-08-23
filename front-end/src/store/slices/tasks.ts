import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  TasksSliceAddPayloadType,
  TasksSliceInitialStateType,
  TasksType,
} from "../../types/types";

const initialState: TasksSliceInitialStateType = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {
    setAll: (state, action: PayloadAction<TasksType[]>) => {
      state.tasks = action.payload;
    },
    add: (state, action: PayloadAction<TasksSliceAddPayloadType>) => {
      state.tasks.push({
        id: action.payload.id,
        name: action.payload.taskName,
        date: action.payload.taskDate,
        isImportant: action.payload.isImportant,
        isDone: false,
      });
    },
    remove: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    handleImportant: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.tasks[index].isImportant = !state.tasks[index].isImportant;
    },
    handleDone: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.tasks[index].isDone = !state.tasks[index].isDone;
    },
  },
});

export const { setAll, add, remove, handleDone, handleImportant } =
  tasksSlice.actions;
export default tasksSlice.reducer;
