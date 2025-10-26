import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slices/boardSlice";
import taskReducer from "./slices/taskSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
