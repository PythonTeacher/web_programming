import React, { useState, useRef } from 'react';

// input이 여러개인 경우
// input에 name을 설정하여 이벤트가 발생했을 때 name으로 값을 설정할 수 있게 함
// useState에 문자열이 아니라 객체 형태로 상태를 관리해 줌
function MultiInputSample() {
  const [student, setStudent] = useState({
    id: '',
    name: '',
  });
  const inputId = useRef(); // Ref 객체 생성
  const inputName = useRef();

  const { id, name } = student; // 비구조화 할당

  const onChange = (e) => {
    const { name, value } = e.target;

    /*const nextInputs = {  // 새로운 객체 생성
      ...student,
    };
    nextInputs[name] = value;*/

    //직접 객체를 변경하면 안됨
    //inputs[name] = value;
    //setInputs(inputs);

    setStudent({
      ...student, // 불변성 유지를 위해 inputs 객체 내용 그대로 복사
      [name]: value, // name키를 가진 값을 value로 설정
    });
  };

  const onReset = () => {
    setStudent({
      id: '',
      name: '',
    });
    //inputId.current.focus(); // ref객체.current가 dom을 가르침
    inputName.current.focus();
  };

  return (
    <>
      <input
        name="id"
        placeholder="학번"
        onChange={onChange}
        value={id}
        ref={inputId} // ref 값 설정
      />
      <input
        name="name"
        placeholder="이름"
        onChange={onChange}
        value={name}
        ref={inputName}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        학번 : {id} 이름 : {name}
      </div>
    </>
  );
}

export default MultiInputSample;
