import React, { useEffect, useState } from "react";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  description: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<Todo>({ id: 0, title: "", description: "" });

  useEffect(() => {
    axios
      .get<Todo[]>("http://localhost:8000/api/todos/")
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
      .put<Todo>(`http://localhost:8000/api/todos/${todo.id}/`, todo)
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

  const handleAddTask = () => {
    axios
      .post<Todo>("http://localhost:8000/api/todos/", newTask)
      .then((response) => {
        console.log("New task added:", response.data);
        setTodos((prevTodos) => [...prevTodos, response.data]);
        setNewTask({ id: 0, title: "", description: "" });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleNewTaskTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setNewTask((prevTask) => ({ ...prevTask, title }));
  };

  const handleNewTaskDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const description = e.target.value;
    setNewTask((prevTask) => ({ ...prevTask, description }));
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleTitleChange(e, todo.id)
              }
            />
            <input
              type="text"
              value={todo.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleDescriptionChange(e, todo.id)
              }
            />
            <button onClick={() => handleUpdate(todo)}>更新</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTask.title}
          onChange={handleNewTaskTitleChange}
          placeholder="タスク名"
        />
        <input
          type="text"
          value={newTask.description}
          onChange={handleNewTaskDescriptionChange}
          placeholder="タスクの説明"
        />
        <button onClick={handleAddTask}>追加</button>
      </div>
    </div>
  );
};

export default TodoList;
