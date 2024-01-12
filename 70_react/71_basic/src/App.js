import React from 'react'; // JSX를 사용하려면 import해줘야 함
import './App.css'; //webpack에서 프로젝트에서 사용한 파일들을 한 파일에 모두 결합해 줌
import Hello from './Hello';
import Hello2 from './Hello2';
import MusicReducerApp from './MusicReducerApp';
import MusicStateApp from './MusicStateApp';

function App() {
  const name = '홍길동';
  return (
    <>
      <Hello name={name} color="blue" isLogIn />
      <Hello isLogIn={false} />
    </>
  );
}
// JSX(Javascript XML)를 리턴해 주어야 함 : HTML 문법과 비슷하게 작성하는 Javascript 확장 코드
function App2() {
  const name = 'React';
  return (
    // JSX 규칙
    // 1. 여는 태그와 닫는 태그가 꼭 있어야 함 (XML 형식)
    // 2. 하나의 Element에 감싸져 있어야 함
    // 3. JSX 내부에서 Javascript 값을 사용할 때는 {} 사용
    // 4. class대신 className 사용
    //<div className="App">Hello, {name}!!</div>
    // 5. camelCase 사용 : onclick -> onClick
    <>
      <Hello name={name} color="blue" isLoggedIn={false} isSpecial />
      <Hello2 messages={['message1', 'message2', 'message3']} />
      {/* 주석 작성 */}
      <div className="App">Hello, {name}!!</div>
    </>
  );
}

export default App;
