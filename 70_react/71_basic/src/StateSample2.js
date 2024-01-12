import React, { useState } from 'react';

// 1. number를 state에 추가
// 2. number를 담고 있는 array를 state에 추가
// 3. button 클릭 시 array에 number를 추가하고 리렌더링하여 보여주기
function StateSample2() {
  const [number, setNumber] = useState(1);
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: number,
        value: number,
      },
    ]);
    setNumber(number + 1);
  };

  return (
    <div>
      <button onClick={addItem}>add Item</button>
      <ul>
        {items.map((item) => {
          return <li key={item.id}>{item.value}</li>;
        })}
      </ul>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.value}</li>
        ))}
      </ul>
    </div>
  );
}

export default StateSample2;
