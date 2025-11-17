import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  TasksSliceAddPayloadType,
  TasksSliceInitialStateType,
  TasksType,
} from "../../types/types";

const initialState: TasksSliceInitialStateType = {
  tasks: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {
    setAll: (state, action: PayloadAction<TasksType[] | null>) => {
      state.tasks = action.payload;
    },
    add: (state, action: PayloadAction<TasksSliceAddPayloadType>) => {
      if (state.tasks === null) {
        state.tasks = [];
      }
      state.tasks.push({
        id: action.payload.id,
        name: action.payload.taskName,
        date: action.payload.taskDate,
        isImportant: action.payload.isImportant,
        isDone: false,
      });
    },
    remove: (state, action: PayloadAction<number>) => {
      if (state.tasks !== null)
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    handleImportant: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (state.tasks !== null)
        state.tasks[index].isImportant = !state.tasks[index].isImportant;
    },
    handleDone: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (state.tasks !== null)
        state.tasks[index].isDone = !state.tasks[index].isDone;
    },
    handleEdit: (
      state,
      action: PayloadAction<{ id: number; name: string; date: string }>
    ) => {
      if (state.tasks !== null) {
        const chosenTaskForEdit =
          state.tasks[
            state.tasks?.findIndex((task) => task.id === action.payload.id)
          ];

        chosenTaskForEdit.name = action.payload.name;
        chosenTaskForEdit.date = action.payload.date;

        state.tasks[
          state.tasks?.findIndex((task) => task.id === action.payload.id)
        ] = chosenTaskForEdit;
      }
    },
  },
});

export const { setAll, add, remove, handleDone, handleImportant } =
  tasksSlice.actions;
export default tasksSlice.reducer;
