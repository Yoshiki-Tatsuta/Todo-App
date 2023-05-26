import React, { useEffect, useState } from "react";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  description: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/todos/')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const updatedTitle = e.target.value;
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: updatedTitle } : todo
      )
    );
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const updatedDescription = e.target.value;
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, description: updatedDescription } : todo
      )
    );
  };

  const handleUpdate = (todo: Todo) => {
    axios
      .put(`http://localhost:8000/api/todos/${todo.id}/`, todo)
      .then((response) => {
        console.log("Todo updated:", response.data);
        setTodos((prevTodos) =>
          prevTodos.map((t) => (t.id === todo.id ? response.data : t))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="text"
              value={todo.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTitleChange(e, todo.id)}
            />
            <input
              type="text"
              value={todo.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDescriptionChange(e, todo.id)}
            />
            <button onClick={() => handleUpdate(todo)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
