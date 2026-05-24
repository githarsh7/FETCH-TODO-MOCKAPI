import React from "react";

const Card = ({
  todo,
  deleteTodo,
  toggleComplete,
  editTodo,
}) => {
  return (
    <div className="card">
      <div className="task-content">
        <h3
          className={todo.completed ? "completed" : ""}
        >
          {todo.title}
        </h3>

        <p>
          Status :
          {todo.completed
            ? " Completed"
            : " Not Completed"}
        </p>
      </div>

      <div className="btn-group">
        <button
          className="complete-btn"
          onClick={() => toggleComplete(todo)}
        >
          {todo.completed ? "Undo" : "Complete"}
        </button>

        <button
          className="edit-btn"
          onClick={() => editTodo(todo)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;