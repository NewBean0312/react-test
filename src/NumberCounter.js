import React, { useState } from "react";

const NumberCounter = () => {
  const [no, setNo] = useState(0);

  // 별도의 변수로 분리
  const noIsEvenDiv =
    no % 2 == 0 ? (
      <>
        <hr />
        <span>짝수입니다.</span>
      </>
    ) : (
      <></>
    );

  const noIs8MultipleDiv = no % 8 == 0 && (
    <>
      <hr />
      <span>8의 배수입니다.</span>
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
