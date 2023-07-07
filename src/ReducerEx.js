import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    default:
      return state;
  }
}

const ReducerEx = () => {
  // 첫 번째 파라미터 (reducer): 위의 reducer 함수를 의미
  // 두 번째 파라미터 ({value : 0}) : 위 함수의 상태 값을 의미
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <>
      <h1>현재 값은 {state.value} 입니다.</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
    </>
  );
};

export default ReducerEx;
