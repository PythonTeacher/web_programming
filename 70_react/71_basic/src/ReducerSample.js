import React, { useReducer } from 'react';

function reducer1(state, action) {
  console.log(action);
  switch (action.type) {
    case 'INC':
      return state + 1;
    default:
      //return state;
      throw new Error('Unhandled action');
  }
}

function reducer2(state, action) {
  switch (action.type) {
    case 'INC':
      return state + 1;
    case 'DEC':
      return state - 1;
    default:
      throw new Error('Unhandled action');
  }
}

function ReducerSample() {
  const [count, dispatch] = useReducer(reducer1, 0);
  const [number, dispatch2] = useReducer(reducer2, 0);

  const counter = () => {
    dispatch({
      type: 'INC',
      value: 'test',
    });
  };

  const onIncrease = () => {
    dispatch2({
      type: 'INC',
    });
  };

  const onDecrease = () => {
    dispatch2({
      type: 'DEC',
    });
  };

  return (
    <>
      <div>
        <p>You clicked {count} times</p>
        <button onClick={counter}>Click me</button>
      </div>
      <div>
        <h1>{number}</h1>
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
    </>
  );
}

export default ReducerSample;
