import React from 'react';
import PropTypes from 'prop-types';

// Student라는 컴포넌트를 만들고, App.js에서 id, name, nickname, color을 넘겨 출력하기
// id, name, color은 속성으로, nickname은 태그 안에 값으로 전달하기
// default -> id:0, name:이름없음
// propTypes -> id, name은 필수
function Hello({ name = '이름없음', color = 'black', isLogIn }) {
  return (
    <div>
      <div style={{ color }}>
        {name}님 {isLogIn && ' 로그인됨'}
      </div>
    </div>
  );
}

function Hello2({
  name = '이름없음',
  color = 'black',
  isLoggedIn,
  isSpecial,
  children,
}) {
  return (
    <div>
      <div style={{ color }}>
        {isSpecial && <b>*</b>}
        안녕하세요, {name}님{' '}
        <b>{isLoggedIn ? '로그인되었습니다' : '로그인되지 않았습니다.'}</b>
      </div>
      <div style={{ color }}>{children}</div>
    </div>
  );
}

Hello.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Hello;
