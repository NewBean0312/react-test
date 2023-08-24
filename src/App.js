import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  AppBar,
  Button,
  Chip,
  List,
  ListItem,
  ListItemButton,
  Modal,
  SwipeableDrawer,
  TextField,
  Toolbar,
} from "@mui/material";
import classNames from "classnames";

function useTodosState() {
  const [todos, setTodos] = useState([]);
  const lastTodoIdRef = useRef(0);

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;

    const newTodo = {
      id,
      content: newContent,
      regDate: dateToStr(new Date()),
    };

    setTodos((todos) => [newTodo, ...todos]);
  };

  const modifyTodo = (index, newContent) => {
    const newTodos = todos.map((todo, _index) =>
      _index != index ? todo : { ...todo, content: newContent }
    );
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, _index) => _index != index);
    setTodos(newTodos);
  };

  const removeTodoById = (id) => {
    const index = todos.findIndex((todo) => todo.id == id);
    return removeTodo(index);
  };

  return {
    todos,
    addTodo,
    modifyTodo,
    removeTodo,
    removeTodoById,
  };
}

const muiThemePaletteKeys = [
  "background",
  "common",
  "error",
  "grey",
  "info",
  "primary",
  "secondary",
  "success",
  "text",
  "warning",
];

function NewTodoForm({ todosState }) {
  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert("할일을 입력해주세요.");
      form.content.focus();

      return;
    }

    todosState.addTodo(form.content.value);
    form.content.value = "";
    form.content.focus();
  };

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col mt-4 px-4 gap-2">
        <TextField
          minRows={3}
          maxRows={10}
          multiline
          autoComplete="off"
          name="content"
          label="할일을 입력해주세요."
          variant="outlined"
        />
        <Button type="submit" variant="contained">
          추가
        </Button>
      </form>
    </>
  );
}

function TodoListItem({ todo, index, openDrawer }) {
  return (
    <>
      <li key={todo.id} className="mt-10">
        <div className="flex gap-2">
          <Chip
            label={`번호 : ${todo.id}`}
            variant="outlined"
            className="!pt-1"
          />
          <Chip
            label={todo.regDate}
            variant="outlined"
            color="primary"
            className="!pt-1"
          />
        </div>
        <div className="flex shadow mt-4 rounded-[20px]">
          <Button className="w-[130px] flex-shrink-0 !items-start !rounded-[20px_0_0_20px]">
            <span
              className={classNames(
                "text-3xl",
                "flex items-center",
                "h-[50px]",
                {
                  "text-[color:var(--mui-color-primary-main)]": index % 2 == 0,
                },
                {
                  "text-[color:#b0b0b0]": index % 2 != 0,
                }
              )}
            >
              <i className="fa-solid fa-check"></i>
            </span>
          </Button>
          <div className="flex-shrink-0 w-[2px] bg-[#b0b0b0] my-5 mr-6"></div>
          <div
            className="whitespace-pre-wrap leading-relaxed
                  hover:text-[color:var(--mui-color-primary-main)] 
                  flex-grow my-5 flex items-center"
          >
            {todo.content}
          </div>
          <Button
            onClick={() => openDrawer(todo.id)}
            className="w-[130px] flex-shrink-0 !items-start !rounded-[0__20px_20px_0]"
            color="inherit"
          >
            <span className="text-xl text-[#b0b0b0] flex items-center h-[50px]">
              <i className="fa-solid fa-ellipsis"></i>
            </span>
          </Button>
        </div>
      </li>
    </>
  );
}

function useTodoOptionDrawerState() {
  const [todoId, setTodoId] = useState(null);
  const opened = useMemo(() => todoId !== null, [todoId]);
  const close = () => setTodoId(null);
  const open = (id) => setTodoId(id);

  return {
    todoId,
    opened,
    close,
    open,
  };
}

function TodoOptionDrawer({ state, todosState }) {
  const removeTodo = () => {
    todosState.removeTodoById(state.todoId);
    state.close();
  };

  return (
    <>
      <SwipeableDrawer
        anchor={"bottom"}
        onOpen={() => {}}
        open={state.opened}
        onClose={state.close}
      >
        <List className="!py-0">
          <ListItem className="!pt-5 !p-5">
            <span className="text-red-500 !pr-2">{state.todoId}번</span> 옵션
            드로어
          </ListItem>
          <ListItemButton className="!pt-5 !p-5 !items-baseline">
            <i className="fa-solid fa-pen-to-square"></i>
            &nbsp;
            <span>수정</span>
          </ListItemButton>
          <ListItemButton
            className="!pt-5 !p-5 !items-baseline"
            onClick={removeTodo}
          >
            <i className="fa-solid fa-trash"></i>
            &nbsp;
            <span>삭제</span>
          </ListItemButton>
        </List>
      </SwipeableDrawer>
      <Modal
        open={true}
        onClose={() => {}}
        className="flex justify-center items-center"
      >
        <div className="bg-white p-10 !rounded-[10px]">안녕하세요</div>
      </Modal>
    </>
  );
}

function TodoList({ todosState }) {
  const todoOptionDrawerState = useTodoOptionDrawerState();

  return (
    <>
      <TodoOptionDrawer state={todoOptionDrawerState} todosState={todosState} />
      <div className="mt-4 px-4">
        <ul>
          {todosState.todos.map((todo, index) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              index={index}
              todosState={todosState}
              openDrawer={todoOptionDrawerState.open}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

function App({ theme }) {
  const todosState = useTodosState();

  useEffect(() => {
    todosState.addTodo("운동\n스트레칭\n유산소\n런지\n스쿼트");
    todosState.addTodo("요리");
    todosState.addTodo("공부");
  }, []);

  useEffect(() => {
    const r = document.querySelector(":root");

    muiThemePaletteKeys.forEach((paletteKey) => {
      const themeColorObj = theme.palette[paletteKey];

      for (const key in themeColorObj) {
        if (Object.hasOwnProperty.call(themeColorObj, key)) {
          const colorVal = themeColorObj[key];
          r.style.setProperty(`--mui-color-${paletteKey}-${key}`, colorVal);
        }
      }
    });
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div className="flex-1"></div>
          <div className="font-bold">HAPPY NOTE</div>
          <div className="flex-1"></div>
        </Toolbar>
      </AppBar>
      <NewTodoForm todosState={todosState} />
      <TodoList todosState={todosState} />
    </>
  );
}

// 유틸리티

// 날짜 객체 입력받아서 문장(yyyy-mm-dd hh:mm:ss)으로 반환한다.
function dateToStr(d) {
  const pad = (n) => {
    return n < 10 ? "0" + n : n;
  };

  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds())
  );
}

export default App;
