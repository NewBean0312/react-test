import React, { useState } from "react";

const ReducerEx = () => {
  const [value, setValue] = useState(0);
  return (
    <>
      <h1>현재 값은 {value} 입니다.</h1>

      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button>
    </>
  );
};

export default ReducerEx;