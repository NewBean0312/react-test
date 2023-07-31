import React, { useState } from "react";

const NumberCounter = () => {
  const [no, setNo] = useState(0);

  // 별도의 변수로 분리
  const noIsEvenDiv = (
    <>
      <hr /> {no % 2 == 0 ? <div>짝수입니다.</div> : <div>홀수입니다.</div>}
    </>
  );

  // || : or 연산자
  const noIs8MultipleDiv = no % 8 == 0 || (
    <>
      <hr />
      <div>8의 배수가 아닙니다.</div>
    </>
  );

  console.log(`noIs8MultipleDiv : ${noIs8MultipleDiv}`);

  return (
    <>
      숫자 : {no}
      <hr />
      <button onClick={() => setNo(no + 1)}>증가</button>
      {noIsEvenDiv}
      {noIs8MultipleDiv}
    </>
  );
};

export default NumberCounter;
