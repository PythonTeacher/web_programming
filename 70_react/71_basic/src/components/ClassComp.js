// 클래스형 컴포넌트
import React, { Component } from "react";
import PropTypes from "prop-types";

class ClassComp extends Component {
  // React.Component라고 써도 됨
  // props 기본값 설정
  static defaultProps = {
    name: "펭수",
  };

  render() {
    return (
      <div>
        안녕하세요, 저는 <b>{this.props.name}</b>입니다.
      </div>
    );
  }
}

ClassComp.propTypes = {
  name: PropTypes.string,
};

export default ClassComp;
