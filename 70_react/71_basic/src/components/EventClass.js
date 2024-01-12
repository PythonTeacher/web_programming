import React, { Component } from "react";

class EventClass extends Component {
  state = {
    message: "",
    toggle: false,
    id: "",
    pwd: "",
  };

  handleChange = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  // e.target.name이 가리키는 값이 key값이 됨
  handleChange2 = (e) => {
    this.setState({
      [e.target.name]: e.target.value, // id:xxx, pwd:xxx과 동일
    });
  };

  handleClick = () => {
    this.setState({
      message: "",
    });
  };

  handleClick2 = () => {
    this.setState({
      id: "",
      pwd: "",
    });
  };

  toggleButton = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleClick2();
    }
  };

  render() {
    return (
      <div>
        <div>이벤트 연습</div>
        <input
          type="text"
          name="message"
          value={this.state.message}
          /*onChange={(e) => {
            this.setState({
              message: e.target.value,
            });
          }}*/
          onChange={this.handleChange}
        />
        <button
          /*onClick={() => {
            this.setState({ message: "" });
          }}*/
          onClick={this.handleClick}
        >
          Clear
        </button>
        {this.state.message}
        <div>
          <button onClick={this.toggleButton}>
            {this.state.toggle ? "ON" : "OFF"}
          </button>
        </div>
        <div>
          <input
            type="text"
            name="id"
            value={this.state.id}
            onChange={this.handleChange2}
          />
          <input
            type="text"
            name="pwd"
            value={this.state.pwd}
            onChange={this.handleChange2}
            onKeyPress={this.handleKeyPress}
          />
          <button onClick={this.handleClick2}> Clear2 </button>
        </div>
      </div>
    );
  }
}

export default EventClass;
