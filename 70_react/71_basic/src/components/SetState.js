import React from "react";

class SetState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      front: "react",
    };
  }

  componentDidMount() {
    this.setState((prevState) => console.log(prevState));
    this.setState(
      // 비동기 함수
      {
        front: "react.js",
      },
      () => {
        // setState의 결과를 받아 처리해야 한다면 콜백으로 처리
        console.log(this.state);
      }
    );
  }

  render() {
    const { front } = this.state;
    return <div>{front}</div>;
  }
}

export default SetState;
