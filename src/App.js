import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  AppBar,
  Button,
  Chip,
  List,
  ListItem,
  ListItemButton,
  Modal,
  Snackbar,
  Alert as MuiAlert,
  SwipeableDrawer,
  TextField,
  Toolbar,
} from "@mui/material";
import classNames from "classnames";
import { atom, useRecoilState } from "recoil";
import RecoilEx from "./RecoilEx";

import { recoilPersist } from "recoil-persist";
const { persistAtom: persistAtomTodos } = recoilPersist({
  key: "persistAtomTodos",
});
const { persistAtom: persistAtomLastTodoId } = recoilPersist({
  key: "persistAtomLastTodoId",
});

const todosAtom = atom({
  key: "app/todosAtom",
  default: [
    {
      id: 3,
      regDate: "2023-02-02 12:12:12",
      content: "공부",
    },
    {
      id: 2,
      regDate: "2023-02-02 12:12:12",
      content: "요리",
    },
    {
      id: 1,
      regDate: "2023-02-02 12:12:12",
      content: "운동",
    },
  ],
  effects_UNSTABLE: [persistAtomTodos],
});

const lastTodoIdAtom = atom({
  key: "app/lastTodoIdAtom",
  default: 3,
  effects_UNSTABLE: [persistAtomLastTodoId],
});

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert {...props} ref={ref} variant="filled" />;
});

function useTodosStatus() {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const [lastTodoId, setLastTodoId] = useRecoilState(lastTodoIdAtom);
  const lastTodoIdRef = useRef(lastTodoId);

  lastTodoIdRef.current = lastTodoId;

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;
    setLastTodoId(id);

    const newTodo = {
      id,
      content: newContent,
      regDate: dateToStr(new Date()),
    };

    setTodos((todos) => [newTodo, ...todos]);

    return id;
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

  const modifyTodoById = (id, newContent) => {
    const index = findTodoIndexById(id);

    if (index == -1) {
      return;
    }

    modifyTodo(index, newContent);
  };

  const removeTodoById = (id) => {
    const index = findTodoIndexById(id);
    return removeTodo(index);
  };

  const findTodoIndexById = (id) => {
    return todos.findIndex((todo) => todo.id == id);
  };

  const findTodoById = (id) => {
    const index = findTodoIndexById(id);

    if (index == -1) {
      return null;
    }

    return todos[index];
  };

  return {
    todos,
    addTodo,
    modifyTodo,
    removeTodo,
    removeTodoById,
    findTodoById,
    modifyTodoById,
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

function NewTodoForm({ noticeSnackbarStatus }) {
  const todosStatus = useTodosStatus();

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert("할  일을 입력해주세요.");
      form.content.focus();

      return;
    }

    const newTodoId = todosStatus.addTodo(form.content.value);
    form.content.value = "";
    form.content.focus();
    noticeSnackbarStatus.open(`${newTodoId}번 할 일이 추가되었습니다.`);
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
          label="할 일을 입력해주세요."
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

function useTodoOptionDrawerStatus() {
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

function EditTodoModal({ status, todo, closeDrawer, noticeSnackbarStatus }) {
  const todosStatus = useTodosStatus();

  const close = () => {
    status.close();
    closeDrawer();
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert("할 일을 입력해주세요.");
      form.content.focus();
      return;
    }

    todosStatus.modifyTodoById(todo.id, form.content.value);
    close();
    noticeSnackbarStatus.open(`${todo.id}번 할 일이 수정되었습니다.`, "info");
  };

  return (
    <>
      <Modal
        open={status.opened}
        onClose={close}
        className="flex justify-center items-center"
      >
        <div className="bg-white p-10 !rounded-[10px]">
          <form onSubmit={onSubmit} className="flex flex-col mt-4 px-4 gap-2">
            <TextField
              minRows={3}
              maxRows={10}
              multiline
              autoComplete="off"
              name="content"
              label="할 일을 입력해주세요."
              variant="outlined"
              defaultValue={todo?.content}
            />
            <Button type="submit" variant="contained">
              수정
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
}

function useEditTodoModalStatus() {
  const [opened, setOpened] = useState(false);

  const open = () => {
    setOpened(true);
  };

  const close = () => {
    setOpened(false);
  };

  return {
    opened,
    open,
    close,
  };
}

function TodoOptionDrawer({ status, noticeSnackbarStatus }) {
  const todosStatus = useTodosStatus();
  const editTodoModalStatus = useEditTodoModalStatus();

  const removeTodo = () => {
    if (window.confirm(`${status.todoId}번 할 일을 삭제하겠습니까?`) == false) {
      status.close();
      return;
    }

    todosStatus.removeTodoById(status.todoId);
    status.close();
    noticeSnackbarStatus.open(`${todo.id}번 할 일이 삭제되었습니다.`, "info");
  };

  const todo = todosStatus.findTodoById(status.todoId);

  return (
    <>
      <EditTodoModal
        noticeSnackbarStatus={noticeSnackbarStatus}
        status={editTodoModalStatus}
        todo={todo}
        closeDrawer={status.close}
      />
      <SwipeableDrawer
        anchor={"bottom"}
        onOpen={() => {}}
        open={status.opened}
        onClose={status.close}
      >
        <List className="!py-0">
          <ListItem className="!pt-5 !p-5">
            <span className="text-red-500 !pr-2">{status.todoId}번</span> 옵션
            드로어
          </ListItem>
          <ListItemButton
            className="!pt-5 !p-5 !items-baseline"
            onClick={editTodoModalStatus.open}
          >
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
    </>
  );
}

function TodoList({ noticeSnackbarStatus }) {
  const todosStatus = useTodosStatus();
  const todoOptionDrawerStatus = useTodoOptionDrawerStatus();

  return (
    <>
      <TodoOptionDrawer
        status={todoOptionDrawerStatus}
        noticeSnackbarStatus={noticeSnackbarStatus}
      />
      <div className="mt-4 px-4">
        <ul>
          {todosStatus.todos.map((todo, index) => (
            <TodoListItem
              noticeSnackbarStatus={noticeSnackbarStatus}
              key={todo.id}
              todo={todo}
              index={index}
              openDrawer={todoOptionDrawerStatus.open}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

const noticeSnackbarInfoAtom = atom({
  key: "app/noticeSnackbarInfoAtom",
  default: {
    opened: false,
    autoHideDuration: 0,
    severity: "",
    msg: "",
  },
});

function useNoticeSnackbarStatus() {
  const [noticeSnackbarInfo, setNoticeSnackbarInfo] = useRecoilState(
    noticeSnackbarInfoAtom
  );

  const opened = noticeSnackbarInfo.opened;
  const autoHideDuration = noticeSnackbarInfo.autoHideDuration;
  const severity = noticeSnackbarInfo.severity;
  const msg = noticeSnackbarInfo.msg;

  const open = (msg, severity = "success", autoHideDuration = 6000) => {
    setNoticeSnackbarInfo({
      opened: true,
      autoHideDuration,
      severity,
      msg,
    });
  };

  const close = () => {
    setNoticeSnackbarInfo({
      ...noticeSnackbarInfo,
      opened: false,
    });
  };

  return {
    opened,
    autoHideDuration,
    severity,
    msg,
    open,
    close,
  };
}

function NoticeSnackbar({ status }) {
  return (
    <>
      <Snackbar
        open={status.opened}
        autoHideDuration={status.autoHideDuration}
        onClose={status.close}
      >
        <Alert severity={status.severity}>{status.msg}</Alert>
      </Snackbar>
    </>
  );
}

function App({ theme }) {
  const todosStatus = useTodosStatus();
  const noticeSnackbarStatus = useNoticeSnackbarStatus();

  useEffect(() => {}, []);

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
      <NoticeSnackbar status={noticeSnackbarStatus} />
      <NewTodoForm noticeSnackbarStatus={noticeSnackbarStatus} />
      <TodoList noticeSnackbarStatus={noticeSnackbarStatus} />
      {/* <RecoilEx /> */}
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
