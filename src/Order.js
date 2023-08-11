import React, { useState } from "react";

function Order() {
  const options = [
    "콜라 1.5",
    "머스타드 소스",
    "홀스래디쉬 소스",
    "스윗어니언 소스",
    "마라 소스",
  ];

  const [optionCheckeds, setOptionCheckeds] = useState([
    false,
    false,
    true,
    true,
    true,
  ]);

  const toggleOptionCheck = (index) => {
    const newOptionCheckeds = optionCheckeds.map((el, _index) =>
      _index === index ? !el : el
    );
    setOptionCheckeds(newOptionCheckeds);
  };

  return (
    <>
      <h1>음식 주문</h1>
      <ul>
        {options.map((option, index) => (
          <li
            key={option}
            style={{ userSelect: "none", cursor: "pointer" }}
            onClick={() => toggleOptionCheck(index)}
          >
            {optionCheckeds[index] ? "[v] " : "[] "}
            {option}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Order;
