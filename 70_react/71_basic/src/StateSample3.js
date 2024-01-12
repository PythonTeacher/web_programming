import React, { useState } from 'react';

// input이 한개일 경우
function StateSample3() {
  const [color, setColor] = useState('black');

  return (
    <div>
      <p style={{ color }}>색상 바꾸기</p>
      <button onClick={() => setColor('red')}>빨간색</button>
      <button onClick={() => setColor('blue')}>파란색</button>
      <button onClick={() => setColor('green')}>초록색</button>
    </div>
  );
}

export default StateSample3;
