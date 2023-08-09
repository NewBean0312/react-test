import React, { useState, useRef } from "react";

let RefCallCount = 0;

function RefEx() {
  const noInputRef = useRef(null);
  const [no, setNo] = useState("");

  const [recordedNos, setRecordedNos] = useState([5, 10, 15, 5, 20, 25, 5, 30]);

  const saveNo = () => {
    if (no === "") {
      alert("숫자를 입력해주세요.");
      return;
    }

    setRecordedNos([...recordedNos, no]);
    setNo("");
    noInputRef.current.focus();
  };

  const removeNo5 = () => {
    const newRecordedNos = recordedNos.filter((el) => el != 5);
    setRecordedNos(newRecordedNos);
  };

  const removeFirst = () => {
    const newRecordedNos = recordedNos.filter((_, index) => index != 0);
    setRecordedNos(newRecordedNos);
  };

  const removeLast = () => {
    const newRecordedNos = recordedNos.filter(
      (_, index) => index != recordedNos.length - 1
    );
    setRecordedNos(newRecordedNos);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveNo();
        }}
      >
        <input
          type="number"
          ref={noInputRef}
          value={no}
          onChange={(e) => setNo(e.target.valueAsNumber)}
        />
        <button type="submit">기록</button>
      </form>
      <h1>기록된 숫자</h1>
      <ul>
        {recordedNos.map((el, index) => (
          <li key={index}>{el}</li>
        ))}
      </ul>
      <hr />
      <button onClick={removeNo5}>숫자 5 삭제</button>
      <button onClick={removeFirst}>처음 숫자 삭제</button>
      <button onClick={removeLast}>마지막 숫자 삭제</button>
    </>
  );
}

export default RefEx;
