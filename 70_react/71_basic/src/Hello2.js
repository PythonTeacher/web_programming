import React from 'react';
import PropTypes from 'prop-types';

// Student라는 컴포넌트를 만들고, App.js에서 id, name, nickname, color을 넘겨 출력하기
// id, name, color은 속성으로, nickname은 태그 안에 값으로 전달하기
// default -> id:0, name:이름없음
// propTypes -> id, name은 필수
function Hello2({ name, color, children: children2 = '내용없음', messages }) {
  return (
    <div>
      <div style={{ color }}>안녕하세요, {name}</div>
      <div>{children2}</div>
      <div>
        {messages.length > 0 && (
          <b>읽지 않은 메일 {messages.length}건이 있습니다.</b>
        )}
      </div>
    </div>
  );
}

Hello2.defaultProps = {
  name: '이름없음2',
  color: 'black',
  children: '내용없음2',
};

Hello2.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  children: PropTypes.string.isRequired,
};

export default Hello2;
