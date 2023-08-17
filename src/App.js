import React, { useState, useRef } from "react";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const lastTodoRef = useRef(0);

  const addTodo = (newContent) => {
    const id = ++lastTodoRef.current;

    const newTodo = {
      id,
      content: newContent,
      regDate: "2023-01-17- 12:12:12",
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, _index) => _index != index);
    setTodos(newTodos);
  };

  const onBtnAddTodoClick = () => {
    addTodo("안녕");
  };

  const onBtnDeleteTodoClick = () => {
    removeTodo(1);
  };

  return (
    <>
      <button onClick={onBtnAddTodoClick}>추가</button>
      <button onClick={onBtnDeleteTodoClick}>삭제</button>
      <hr />
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.id} {todo.content} {todo.regDate}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
