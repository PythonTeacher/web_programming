// Lifecycle 메소드
// 1. 마운트  : DOM이 생성되고 웹 브라우저상에 나타나는 것을 마운트라고 함
// (constructor -> getDerivedStateFromProps -> render -> componentDidMount)
// 2. 업데이트 : props가 바뀔때, state가 바뀔때, 부모컴포넌트가 리렌더링될때, thid.forceUpdate로 강제 랜더링을 트리거할 때
// (getDerevedStateFromProps -> shouldComponentUpdate(true) -> render -> getSnapshotBeforeUpdate -> componentDidUpdate)
// 3. 언마운트 : 컴포넌트를 DOM에서 제거하는 것을 언마운트라고 함
// (componentWillUnmount)

// componentWillMount, render, componentDidMount, componentWillUnmount 중에
// setState를 하면 안되는 메소드는? render, componentWillUnmount
import React, { Component } from "react";

class LifeCycle extends Component {
  state = {
    number: 0,
    color: null,
  };

  myRef = null;

  constructor(props) {
    super(props);
    console.log("constructor");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps", nextProps, prevState);
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
    return null;
  }

  componentWillMount() {
    console.log("componentWillMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    return nextState.number % 10 !== 4; // 맨 마지막 수가 4면 리랜더링하지 않음
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate");
    if (snapshot) {
      console.log("업데이트되기 직전 색상:", snapshot);
    }
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };

  render() {
    console.log("render");
    const style = {
      color: this.props.color,
    };

    return (
      <div>
        <h1 style={style} ref={(ref) => (this.myRef = ref)}>
          {this.state.number}
        </h1>
        <p>color : {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
}

export default LifeCycle;
