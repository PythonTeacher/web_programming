// useReducer
import React, { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "INC":
      return { number: state.number + 1 };
    case "DEC":
      return { number: state.number - 1 };
    default:
      return state;
  }
};

const Counter2 = () => {
  const [state, dispatch] = useReducer(reducer, { number: 0 });
  return (
    <div>
      <div>값 : {state.number}</div>
      <button onClick={() => dispatch({ type: "INC" })}>더하기</button>
      <button onClick={() => dispatch({ type: "DEC" })}>빼기</button>
    </div>
  );
};

export default Counter2;
