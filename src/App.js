import React, { useState } from "react";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    const newTodos = [...todos, todos.length + 1];
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, _index) => _index != index);
    setTodos(newTodos);
  };

  const modifyTodo = (index, newTodo) => {
    const newTodos = todos.map((todo, _index) =>
      _index != index ? todo : newTodo
    );
    setTodos(newTodos);
  };

  const onAddBenClick = () => {
    addTodo(todos.length + 1);
  };

  const onRemoveBtnClick = () => {
    removeTodo(1);
  };

  const onEditBtnClick = () => {
    modifyTodo(1, "안녕");
  };

  return (
    <>
      <div>{JSON.stringify(todos)}</div>
      <button onClick={onAddBenClick}>추가</button>
      <button onClick={onRemoveBtnClick}>삭제</button>
      <button onClick={onEditBtnClick}>수정</button>
    </>
  );
}

export default App;
