import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './index.css';
import { Link } from "react-router-dom";

interface Todo {
  id: number;
  title: string;
  description: string;
  date: string | null;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<Todo>({
    id: 0,
    title: "",
    description: "",
    date: null,
  });

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

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const updatedTitle = e.target.value;
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: updatedTitle } : todo
      )
    );
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
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
        setNewTask({ id: 0, title: "", description: "", date: null });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleNewTaskTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const title = e.target.value;
    setNewTask((prevTask) => ({ ...prevTask, title }));
  };

  const handleNewTaskDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const description = e.target.value;
    setNewTask((prevTask) => ({ ...prevTask, description }));
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:8000/api/todos/${id}/`)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        console.log("Todo deleted:", id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDateChange = (date: Date | null) => {
    const formattedDate = date ? date.toISOString().slice(0, 10) : null;
    setNewTask((prevTask) => ({ ...prevTask, date: formattedDate }));
  };

  const handleDateUpdate = (todo: Todo, date: Date | null) => {
    const updatedTodo = { ...todo, date: date ? date.toISOString().slice(0, 10) : null };
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === todo.id ? updatedTodo : t))
    );
  };

  return (
    <div>
      <h1 className="flex justify-center text-5xl font-bold mb-4 text-blue-400">Todo List</h1>
      <p className="text-lg">●<span className="underline decoration-double decoration-blue-500"><Link to={'/'}>HOME</Link></span>に戻る</p>
      <br></br>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="mb-4">
            <input
              type="text"
              // value={todo.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleTitleChange(e, todo.id)
              }
              placeholder="タスク名"
              className="border border-gray-300 rounded py-2 px-3 mb-1 text-sm"
            />
            <input
              type="text"
              // value={todo.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleDescriptionChange(e, todo.id)
              }
              placeholder="タスクの説明"
              className="border border-gray-300 rounded py-2 px-3 mb-1 text-sm"
            />
            <DatePicker
              selected={todo.date ? new Date(todo.date) : null}
              onChange={(date: Date | null) => handleDateUpdate(todo, date)}
              placeholderText="期限を選択"
              dateFormat="yyyy-MM-dd"
              className="border border-gray-300 rounded py-2 px-3 mb-1"
            />
            <ul className="">
              <li>・タスク名：{todo.title}</li>
              <li>・説明：{todo.description}</li>
              <li>・予定日：{todo.date}</li>
            </ul>
            <button
              onClick={() => handleUpdate(todo)}
              className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              更新
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
              className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          value={newTask.title}
          onChange={handleNewTaskTitleChange}
          placeholder="タスク名"
          className="border border-gray-300 rounded py-2 px-3 mb-1"
        />
        <input
          type="text"
          value={newTask.description}
          onChange={handleNewTaskDescriptionChange}
          placeholder="タスクの説明"
          className="border border-gray-300 rounded py-2 px-3 mb-1"
        />
        <DatePicker
          selected={newTask.date ? new Date(newTask.date) : null}
          onChange={(date: Date | null) => handleDateChange(date)}
          placeholderText="期限を選択"
          dateFormat="yyyy-MM-dd"
          className="border border-gray-300 rounded py-2 px-3 mb-1"
        />
        <button
          onClick={handleAddTask}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          追加
        </button>
      </div>
    </div>
  );
};

export default TodoList;
