import React, { useState } from "react";

import "./App.css";

function App() {
  const ageBands = [
    "영유아/아동",
    "10대",
    "20대",
    "30대",
    "40대",
    "50대",
    "60대",
    "그외",
  ];

  const [selectedAgeBand, setSelectedAgeBand] = useState(ageBands[3]);

  return (
    <>
      <select onChange={(e) => setSelectedAgeBand(e.target.value)}>
        <option selected disabled>
          - 나이대역 -
        </option>
        {ageBands.map((ageBand) => (
          <option selected={ageBands == selectedAgeBand} value={ageBand}>
            {ageBand}
          </option>
        ))}
      </select>
      <div>현재 값 : {selectedAgeBand}</div>
    </>
  );
}

export default App;
