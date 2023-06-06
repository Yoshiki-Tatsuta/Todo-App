import React from 'react';
import TodoList from './TodoList';
import Home from './home';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/todolist/'} element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
