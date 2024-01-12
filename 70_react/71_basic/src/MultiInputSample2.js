import React, { useState } from 'react';

function MultiInputSample2() {
  const [student, setStudent] = useState({
    id: '',
    name: '',
  });

  const { id, name } = student; // 비구조화 할당

  const onChangeId = (e) => {
    setStudent({
      ...student, // 불변성 유지를 위해 inputs 객체 내용 그대로 복사
      id: e.target.value,
    });
  };

  const onChangeName = (e) => {
    setStudent({
      ...student, // 불변성 유지를 위해 inputs 객체 내용 그대로 복사
      name: e.target.value,
    });
  };

  const onReset = () => {
    setStudent({
      id: '',
      name: '',
    });
  };

  return (
    <>
      <input name="id" placeholder="학번" onChange={onChangeId} value={id} />
      <input
        name="name"
        placeholder="이름"
        onChange={onChangeName}
        value={name}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        학번: {id} 이름: {name}
      </div>
    </>
  );
}

export default MultiInputSample2;
