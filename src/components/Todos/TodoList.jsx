import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { getAsyncTodos } from "../../features/todo/todoSlice";

//! Displays the list of todos and handles their loading state.
const TodoList = () => {
  const { todos, loading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAsyncTodos());
  }, [dispatch]);

  if (loading) return <p className="text-center fw-bold">Loading...</p>;

  if (error) return <p className="text-center fw-bold">{error}</p>;

  if (!todos.length)
    return <p className="text-center fw-bold">No todos found. Start by adding a new one!</p>;

  return (
    <div>
      <h2 className="h2">Your Todo List</h2>
      <ul className="list-group">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
