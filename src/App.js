// import StopWatch from "./StopWatch";
// import NumberCounter from "./NumberCounter";
// import Popup from "./Popup";
// import ProdList from "./ProdList";
import NoRecord from "./NoRecord";

import "./App.css";

const App = () => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const arr = nums.map((el, index) => <li key={index}>내용 {el}</li>);

  // const arr = [<li>내용1</li>, <li>내용2</li>, <li>내용3</li>];

  return (
    <>
      <ul>{arr}</ul>
      <hr />
      <ul>
        <li>내용1</li>
        <li>내용2</li>
        <li>내용3</li>
      </ul>

      {/* <StopWatch /> */}
      {/* <NumberCounter /> */}
      {/* <Popup /> */}
      {/* <ProdList className="container mx-auto" /> */}
      {/* <NoRecord /> */}
    </>
  );
};

export default App;