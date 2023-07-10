import { useMemo, useEffect, useState } from "react";

const MemoEx = () => {
  const [number, setNumber] = useState(0);
  const [isKorea, setIsKorea] = useState(true);

  // const location = { country: isKorea ? '한국' : '일본' };
  const location = useMemo(() => {
    return {
      country: isKorea ? "한국" : "일본",
    };
  }, [isKorea]);

  useEffect(() => {
    console.log("useEffect... 호출");
    // 뭔가 오래 걸리는 작업
  }, [location]);

  return (
    <>
      <header className="App-header">
        <h2>하루에 몇 끼 먹어요?</h2>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <hr />

        <h2>어느 나라에 있어요?</h2>
        <p>나라: {location.country}</p>
        <button onClick={() => setIsKorea(!isKorea)}>Update</button>
      </header>
    </>
  );
};

export default MemoEx;
