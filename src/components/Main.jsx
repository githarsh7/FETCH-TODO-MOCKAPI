import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Card from "./Card";
import Message from "./Message";

const API_URL =
  "https://6a12b0af78d0434e0d5d5c08.mockapi.io/todos";

const Main = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(true);

  // FETCH TODOS
  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);

      setTodos(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // PAGE LOAD
  useEffect(() => {
    fetchTodos();
  }, []);

  // ADD TODO
  const addTodo = async () => {
    if (task.trim() === "") return;

    try {
      const newTodo = {
        title: task,
        completed: false,
      };

      const response = await axios.post(
        API_URL,
        newTodo
      );

      setTodos((prev) => [...prev, response.data]);

      setTask("");
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE TODO
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      setTodos((prev) =>
        prev.filter((todo) => todo.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // TOGGLE COMPLETE
  const toggleComplete = async (todo) => {
    try {
      const updatedTodo = {
        ...todo,
        completed: !todo.completed,
      };

      await axios.put(
        `${API_URL}/${todo.id}`,
        updatedTodo
      );

      setTodos((prev) =>
        prev.map((item) =>
          item.id === todo.id
            ? updatedTodo
            : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT TODO
  const editTodo = async (todo) => {
    const updatedTitle = prompt(
      "Edit Task",
      todo.title
    );

    if (!updatedTitle) return;

    try {
      const updatedTodo = {
        ...todo,
        title: updatedTitle,
      };

      await axios.put(
        `${API_URL}/${todo.id}`,
        updatedTodo
      );

      setTodos((prev) =>
        prev.map((item) =>
          item.id === todo.id
            ? updatedTodo
            : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-container">
      <Header />

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTodo}>
          Add
        </button>
      </div>

      {loading ? (
        <h3 style={{ color: "white" }}>Loading!!</h3>
      ) : todos.length === 0 ? (
        <Message />
      ) : (
        todos.map((todo) => (
          <Card
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
            editTodo={editTodo}
          />
        ))
      )}
    </div>
  );
};

export default Main;