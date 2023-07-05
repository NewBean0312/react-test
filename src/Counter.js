import React, { useState, useEffect } from "react";

const Counter = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  // 이름 입력 시, 업데이트
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  useEffect(() => {
    // 렌더링이 잘 되었는지 확인
    console.log("effect");
    console.log(name);
    return () => {
      console.log("cleanup");
      console.log(name);
    };
  }, [name]);

  return (
    <>
      {/* 이름 입력 */}
      <div>
        <input value={name} onChange={onChangeName}></input>
        <input value={nickname} onChange={onChangeNickname}></input>
      </div>
    </>
  );
};

export default Counter;
