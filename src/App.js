// import StopWatch from "./StopWatch";
// import NumberCounter from "./NumberCounter";
// import Popup from "./Popup";
// import ProdList from "./ProdList";
import NoRecord from "./NoRecord";

import "./App.css";

const App = () => {
  const arr = [<li>내용1</li>, <li>내용2</li>, <li>내용3</li>];

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
