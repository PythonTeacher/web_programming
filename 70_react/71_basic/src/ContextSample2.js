import React, { createContext, useContext, useState } from 'react';

// 1. Context 생성하기
const MyContext = createContext('defaultValue');

// 2. useContext hook을 사용하여 Context의 값 읽어오기
function Child() {
  const text = useContext(MyContext); // Context에 값을 읽어와서 사용할 수 있게 해주는 hook
  return <div>안녕하세요, {text}</div>;
}

function Parent() {
  return <Child />;
}

function GrandParent() {
  return <Parent />;
}

// 3. Context.Provider 컴포넌트에 value값 전달하기
function ContextSample2() {
  const [value, setValue] = useState(true);
  return (
    <MyContext.Provider value={value ? 'GOOD' : 'BAD'}>
      <GrandParent />
      <button onClick={() => setValue(!value)}>Click Me</button>
    </MyContext.Provider>
  );
}

export default ContextSample2;
