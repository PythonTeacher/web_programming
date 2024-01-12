import React, { createContext, useContext } from 'react';

const MyContext = createContext(null);

function Child() {
  const name = useContext(MyContext);
  return <div>안녕하세요, {name}님</div>;
}

function Parent() {
  return <Child />;
}

function Sample() {
  return (
    <MyContext.Provider value={'홍길동'}>
      <Parent />
    </MyContext.Provider>
  );
}

export default Sample;
