import React, { useState } from 'react';

// input이 한개일 경우
function InputSample() {
  const [text, setText] = useState('');

  // e.target : 이벤트가 발생한 DOM
  const onChange = (e) => {
    // 직접 값을 변경하면 안됨
    console.log(e.target);
    //text = e.target.value;    // 값을 직접 변경하면 안됨
    setText(e.target.value);
  };

  const onReset = () => {
    setText('');
  };

  return (
    <div>
      <input onChange={onChange} value={text} />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값 : {text}</b>
      </div>
    </div>
  );
}

export default InputSample;
