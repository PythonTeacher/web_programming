import React, { useState } from 'react';

// 컴포넌트 내의 동적인 값을 state라고 함
// 예전에는 state를 추가하고 싶으면 클래스 컴포넌트를 만들어야 했음
// 이제는 함수 컴포넌트 안에서 useState라는 Hook를 통해 state를 사용할 수 있음
// onClick={함수()}로 하면 랜더링되는 시점에 함수가 호출되어 실행됨
// onClick={함수}로 해야 함
function StateSample() {
  // [현재 state값, 업데이트하는 함수] = useState(초기 state값)
  // count값이 변하면 const로 받아도 되는건가? state값이 변하면 리렌더링되므로 새로운 count변수를 만듬
  const [count, setCount] = useState(0); // useState는 함수
  const [number, setNumber] = useState(0);

  const counter = () => {
    setCount(count + 1);
  };

  const onIncrease = () => {
    //setNumber(number + 1);  // setter를 이용하여 값을 직접 업데이트 하는 방법 (값 직접 업데이트)
    //number = number + 1; // 값을 직접 수정하면 안됨 (리렌더링이 되지 않음)
    setNumber(prev => prev + 1); // 값을 업데이트하는 함수를 넣는 방법 (함수형 업데이트, 최적화와 관련)
  };

  const onDecrease = () => {
    //setNumber(number - 1);
    setNumber(prev => prev - 1);
  };

  return (
    <>
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
      <div>
        <h1>{number}</h1>
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
    </>
  );
}

export default StateSample;
