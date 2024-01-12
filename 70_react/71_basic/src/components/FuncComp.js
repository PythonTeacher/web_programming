// 함수형 컴포넌트
// 함수형 컴포넌트는 state와 LifeCycle이 빠져 있음
// 단순히 props만 받아와서 보여줄 경우에 사용하면 편리함

import React, { useState } from "react";
import PropTypes from "prop-types";

/*function FuncComp({ name = "펭수" }) {
  return (
    <div>
      안녕하세요, 저는 <b>{name}</b>입니다.
    </div>
  );
}*/

const FuncComp = ({ name = "펭수", children }) => {
  // useState를 사용하여 함수형 컴포넌트에서도 state 사용하기
  const [message, setMessage] = useState(""); // state, setter함수
  return (
    <div>
      안녕하세요, 저는 <b>{name}</b>입니다.{" "}
      <p>children값은 {children} 입니다.</p>
      <button onClick={() => setMessage("Hello!!")}>입장</button>
      <button onClick={() => setMessage("Bye!!")}>퇴장</button>
      <div>{message}</div>
    </div>
  );
};

FuncComp.propTypes = {
  name: PropTypes.string,
  children: PropTypes.string.isRequired,
};

export default FuncComp;
