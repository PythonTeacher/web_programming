import React, { useReducer, useRef } from 'react';

const initialState = {
  id: '',
  name: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'RESET':
      return initialState;
    default:
      throw new Error('Unhandled action');
  }
}

function ReducerSample2() {
  const [student, dispatch] = useReducer(reducer, initialState);

  const inputId = useRef(); // Ref 객체 생성
  const inputName = useRef();

  const { id, name } = student; // 비구조화 할당

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value,
    });
  };

  const onReset = () => {
    dispatch({
      type: 'RESET',
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

export default ReducerSample2;
