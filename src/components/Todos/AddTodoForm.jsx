import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAsyncTodo } from "../../features/todo/todoSlice";

//! Form to add new todos.
const AddTodoForm = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.todos);

  //! add new todo handler
  const handleAddTodo = (event) => {
    event.preventDefault();

    if (!value) return;

    const newTodo = {
      id: Date.now(),
      title: value,
      isCompleted: false,
    };

    dispatch(addAsyncTodo(newTodo));
    setValue("");
  };

  return (
    <form
      onSubmit={handleAddTodo}
      className={`form-inline mt-3 mb-4 ${loading ? "opacity-50" : "opacity: 100"}`}
    >
      <label htmlFor="title" className="mb-1 h5">
        New Todo
      </label>
      <input
        autoComplete="off"
        id="title"
        type="text"
        className="form-control mb-2 mr-sm-2"
        placeholder="Title"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="submit" disabled={loading} className="btn btn-primary mt-1">
        {loading ? "Submitting" : "Submit"}
      </button>
    </form>
  );
};

export default AddTodoForm;
