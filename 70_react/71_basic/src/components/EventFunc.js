import React, { useState } from "react";

const EventFunc = () => {
  const [message, setMessage] = useState("");
  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleChangeId = (e) => {
    setId(e.target.value);
  };

  const handleChangePwd = (e) => {
    setPwd(e.target.value);
  };

  const handleClick = () => {
    setMessage("");
  };

  const handleClick2 = () => {
    setId("");
    setPwd("");
  };

  const toggleButton = () => {
    setToggle(!toggle);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick2();
    }
  };

  return (
    <div>
      <div>이벤트 연습</div>
      <input
        type="text"
        name="message"
        value={message}
        /*onChange={(e) => {
            this.setState({
              message: e.target.value,
            });
          }}*/
        onChange={handleChange}
      />
      <button
        /*onClick={() => {
            this.setState({ message: "" });
          }}*/
        onClick={handleClick}
      >
        Clear
      </button>
      {message}
      <div>
        <button onClick={toggleButton}>{toggle ? "ON" : "OFF"}</button>
      </div>
      <div>
        <input type="text" name="id" value={id} onChange={handleChangeId} />
        <input
          type="text"
          name="pwd"
          value={pwd}
          onChange={handleChangePwd}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleClick2}> Clear2 </button>
      </div>
    </div>
  );
};

export default EventFunc;
