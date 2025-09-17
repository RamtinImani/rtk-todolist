import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

//! Async thunk to fetch todos from the server
export const getAsyncTodos = createAsyncThunk(
  "todos/getAsyncTodos",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/todos");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//! Async thunk to add a new todo to the server
export const addAsyncTodo = createAsyncThunk(
  "todos/addAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/todos", payload);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//! Async thunk to remove a todo from the server
export const removeAsyncTodo = createAsyncThunk(
  "todos/removeAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      await API.delete(`/todos/${payload}`);
      return payload;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//! Async thunk to toggle the completion status of a todo on the server
export const checkAsyncTodo = createAsyncThunk(
  "todos/checkAsyncTodo",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await API.patch(`/todos/${payload.id}`, {
        isCompleted: payload.isCompleted,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//! Initial state for the todos slice
const initialState = {
  loading: false,
  todos: [],
  error: null,
};

//! Slice to manage todos, including reducers and extra reducers
const todoSlice = createSlice({
  name: "todos",
  initialState,
  // reducers: {
  //   // Add a new todo
  //   addTodo: (state, action) => {
  //     state.todos.push(action.payload);
  //   },
  //   // Remove a todo
  //   removeTodo: (state, action) => {
  //     state.todos = state.todos.filter((todo) => todo.id !== action.payload);
  //   },
  //   // check a todo
  //   checkTodo: (state, action) => {
  //     //! map method
  //     // state.todos = state.todos.map((todo) => {
  //     //   return todo.id === Number(action.payload)
  //     //     ? { ...todo, isCompleted: !todo.isCompleted }
  //     //     : todo;
  //     // });
  //     //! find method
  //     const checkedTodo = state.todos.find((todo) => todo.id === Number(action.payload));
  //     checkedTodo.isCompleted = !checkedTodo.isCompleted;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAsyncTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(getAsyncTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.todos = [];
      })
      .addCase(addAsyncTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAsyncTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(removeAsyncTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.id !== Number(action.payload));
      })
      .addCase(checkAsyncTodo.fulfilled, (state, action) => {
        state.loading = false;
        const checkedTodo = state.todos.find((todo) => todo.id === Number(action.payload.id));
        checkedTodo.isCompleted = action.payload.isCompleted;
      });
  },
});

export const { addTodo, removeTodo, checkTodo } = todoSlice.actions;

export default todoSlice.reducer;
