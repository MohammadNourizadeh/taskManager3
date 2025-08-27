import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TasksType } from "../../types/types";

type ConfirmModalSliceInitialStateType<T> = {
  isModalOpen: boolean;
  targetItemId: number;
  list: T[];
};

const initialState: ConfirmModalSliceInitialStateType<TasksType> = {
  isModalOpen: false,
  targetItemId: 0,
  list: [],
};

const confirmModalSlice = createSlice({
  name: "confirmModal",
  initialState,

  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },

    setTargetItemId: (state, action: PayloadAction<number>) => {
      state.targetItemId = action.payload;
    },

    setList: (state, action: PayloadAction<TasksType[]>) => {
      state.list = action.payload;
    },

    deleteItem: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
      state.isModalOpen = false;      
    },

    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { deleteItem, closeModal, openModal, setList, setTargetItemId } =
  confirmModalSlice.actions;
export default confirmModalSlice.reducer;
