import { createSlice } from "@reduxjs/toolkit";
import TodoItem from "../../classes/TodoItem";

if (!JSON.parse(localStorage.getItem("todos"))) {
    localStorage.setItem('todos',JSON.stringify([]));
}
const localTodos = JSON.parse(localStorage.getItem('todos'));

const todoInitialState = { todos: localTodos };

const todoSlice = createSlice({
  name: "todos",
  initialState: todoInitialState,S
  reducers: {
    add: (state, action) => {
      console.log("action: ", action);
      const newTodo = new TodoItem(action.payload);
      state.todos.push(newTodo);
      localStorage.setItem('todos',JSON.stringify(state.todos));
    },
    deleteOne: (state, action) => {
      console.log("delete action: ", action);
      const idx = state.todos.findIndex((x) => x.id == action.payload);
      state.todos.splice(idx, 1);
      localStorage.setItem('todos',JSON.stringify(state.todos));
    },
    mark: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id == action.payload) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      });
      localStorage.setItem('todos',JSON.stringify(state.todos));
    },
  },
});

export default todoSlice.reducer;
export const { add, deleteOne, mark } = todoSlice.actions;S