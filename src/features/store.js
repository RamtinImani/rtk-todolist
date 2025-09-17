import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todo/todoSlice";

//! Configures the Redux store with the todos reducer.
const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;
