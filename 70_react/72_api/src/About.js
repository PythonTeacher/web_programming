import React from 'react';
import qs from 'qs';

function About({ location }) {
  console.log(location);
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  console.log(query);
  const detail = query.detail === 'true'; // 문자열로 비교

  return (
    <div>
      <h1>About</h1>
      <p>소개 화면입니다.</p>
      {detail && <p>이 프로젝트에 대한 자세한 설명입니다.</p>}
    </div>
  );
}

export default About;
