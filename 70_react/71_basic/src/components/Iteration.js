import React, { useState } from "react";

const Iteration2 = () => {
  const names = ["폴킴", "장범준", "아이유"];
  // key가 없는 경우 warning 발생
  // key값을 통해 배열 랜더링 시 어떤 요소에 변동이 있었는지 빨리 알아 낼 수 있음
  // 고유 id값을 넣자 -> 없을 경우에만 index를 사용 (비효율적)
  const nameList = names.map((name, index) => <li key={index}>{name}</li>);
  console.log(nameList);
  return <ul>{nameList}</ul>;
};

const Iteration = () => {
  const [names, setNames] = useState([
    { id: 1, text: "폴킴" },
    { id: 2, text: "장범준" },
    { id: 3, text: "아이유" },
  ]);

  const [inputText, setInputText] = useState("");
  const [nextId, setNextId] = useState(4); // 새 항목 추가시 사용할 id
  const onChange = (e) => setInputText(e.target.value);
  const onClick = () => {
    const nextNames = names.concat({
      id: nextId,
      text: inputText,
    });
    setNextId(nextId + 1);
    setNames(nextNames);
    setInputText("");
  };

  const onDoubleClick = (id) => {
    const nextNames = names.filter((name) => name.id !== id);
    setNames(nextNames);
  };

  const namesList = names.map((name) => (
    <li key={name.id} onDoubleClick={() => onDoubleClick(name.id)}>
      {name.text}
    </li>
  ));
  return (
    <>
      <input value={inputText} onChange={onChange} />
      <button onClick={onClick}>추가</button>
      <ul>{namesList}</ul>
    </>
  );
};

export default Iteration;
