// State
import React, { Component } from "react";

class Counter extends Component {
  // state 설정 (클래스 필드) : 해당 컴포넌트에서만 사용
  /*state = {
    number: 0,
  };*/

  // 또는 constructor로 설정
  // 클래스 필드가 먼저 실행되고 생성자가 나중에 실행됨
  constructor(props) {
    super(props); // 부모 생성자 호출
    this.state = {
      number: 10, // state에 props를 받아도됨, 함수 정의도 가능
    };
    this.decrease = this.decrease.bind(this); // 일반함수의 경우 추가
    console.log("constructor called");
  }

  // 증가 메소드
  // 화살표 함수로 작성한 경우 this 사용 가능
  increase = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };

  increase2 = () => {
    const { number } = this.state; // 비구조화 할당
    this.setState({
      number: number + 1,
    });
  };

  // 감소 메소드
  // 일반 함수로 작성한 경우에는 클릭 이벤트가 전달되는 과정에서 this 연결이 끊겨버림
  decrease() {
    // this.setState()를 통해 변경해야 함 -> 이 함수가 호출되면 컴포넌트가 자동으로 리렌더링됨
    this.setState({
      number: this.state.number - 1,
    });
  }

  // 이벤트 이름은 CamelCase로 설정, 예) onclick -> onClick, onchange -> onChange
  // 함수호출이 아니라 함수명만 넘어줘야 함
  // 함수호출을 하게 되면 랜더링->함수호출->setState()->랜더링->함수호출->setState()->..
  render() {
    if (this.state.error) return <h1>에러발생</h1>;
    return (
      <div>
        <div>값 : {this.state.number}</div>
        <button onClick={this.increase}>더하기</button>
        <button onClick={this.decrease}>빼기</button>
        {this.state.number === 13 && <ErrorThrow />}
      </div>
    );
  }

  // Lifecycle API
  // 컴포넌트가 화면에 나타났을 때 호출되는 API
  // 1. 외부 라이브러리 연동
  // 2. axios, fetch를 통해 데이터 요청
  componentDidMount() {
    console.log("componentDidMount called");
  }

  // React는 변화가 발생하는 부분만 업데이트를 해줌
  // 그러기 위해서는 변화가 발생한 부분만을 감지하기 위해 Virtual DOM에 랜더링을 해줘야 함
  // 변화가 없으면 DOM 조작은 하지 않지만 Virtual DOM에만 랜더링을 함
  // 로드가 걸리는 작업은 아니지만, 컴포넌트가 무수히 많이 랜더링되면 쓸모없는 작업일 수 있음
  // (부모 컴포넌트가 리렌더링되면 자식 컴포넌트들도 리렌더링되므로)
  shouldComponentUpdate(nextProps, nextState) {
    //return false로 하면 Virtual DOM에도 리렌더링하지 않음
    //return this.props.checked !== nextProps.checked;
    console.log("shouldComponentUpdate called");
    // 5의 배수가 되면 리렌더링 하지 않음
    if (nextState.number % 5 === 0) return false;
    return true;
  }

  // render()를 호출하고 난 다음에 호출되는 API
  // 따라서 props와 state가 바뀌어 있음
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate called");
  }

  // 컴포넌트 제거
  // 이벤트 제거(setTimeout -> clearTimeout)
  // 외부 라이브러리를 사용했으면 여기서 dispose해줌
  componentWillUnmount() {
    console.log("componentWillUnmount called");
  }

  // 컴포넌트 에러 처리
  componentDidCatch(error, info) {
    this.setState({
      error: true,
    });
  }
}

const ErrorThrow = () => {
  throw new Error("에러 발생");
  //return <div></div>;
};

export default Counter;
