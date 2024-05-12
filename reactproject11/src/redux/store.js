import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice/counter.slice";
import todoReducer from "./todoSlice/todo.slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer
  },
});S