import { useDispatch } from "react-redux";
import { checkAsyncTodo, removeAsyncTodo } from "../../features/todo/todoSlice";

//! Represents a single todo item with actions to toggle completion and delete.
const TodoItem = ({ id, title, isCompleted }) => {
  const dispatch = useDispatch();

  return (
    <li className={`list-group-item ${isCompleted && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center gap-1">
          <input
            onChange={() => dispatch(checkAsyncTodo({ id, isCompleted: !isCompleted }))}
            type="checkbox"
            className="mr-3"
            checked={isCompleted}
          ></input>
          <span>{title}</span>
        </span>
        <button onClick={() => dispatch(removeAsyncTodo(id))} className="btn btn-danger">
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
