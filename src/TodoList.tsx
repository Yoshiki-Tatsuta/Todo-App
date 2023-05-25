import React, { useEffect, useState } from "react";
import axios from "axios";

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState([]);


    useEffect(() => {
        // バックエンドからTodoリストを取得するAPIを呼び出す
        axios.get('http://localhost:8000/api/todos/')
          .then((response) => {
            setTodos(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
    }, []);

    return (
        <div>
            <h1>Todo List</h1>
            <ul>
                {todos.map((todo: any) => (
                    <li key={todo.id}>{todo.title} - {todo.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
