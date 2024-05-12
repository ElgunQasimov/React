import { useDispatch, useSelector } from "react-redux";
import { add, deleteOne, mark } from "../redux/todoSlice/todo.slice";
import { useState } from "react";

const Todo = () => {
  const state = useSelector((state) => state.todos);
  const [title, setTitle] = useState("");
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const filteredTodos = state.todos.filter((x) => x.title.toLowerCase().trim().includes(query.trim().toLowerCase()));
  return (
    <>
      <h2>Todo App w/redux-toolkit</h2>
      <hr />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(add(title));
          setTitle("");
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="add new todo"
        />
        <button type="submit">add</button>
      </form>
      <hr />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="search todo"
      />
      <hr />
      <ul>
        {filteredTodos &&
          filteredTodos.map((todo, idx) => {
            return (
              <li
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
                key={idx}
              >
                <span>{todo.title}</span>
                <button onClick={() => dispatch(mark(todo.id))}>mark</button>
                <button onClick={() => dispatch(deleteOne(todo.id))}>
                  delete
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Todo;