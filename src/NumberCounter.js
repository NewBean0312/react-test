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

  return (
    <>
      숫자 : {no}
      <hr />
      <button onClick={() => setNo(no + 1)}>증가</button>
      {noIsEvenDiv}
    </>
  );
};

export default NumberCounter;
