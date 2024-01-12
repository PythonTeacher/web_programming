import React, { useState, useEffect } from 'react';
import { useAsync } from 'react-async';
import getMusicList from './api';
import Music2 from './Music2';

function MusicList2() {
  const [id, setId] = useState(null);
  const { data: musicList, error, isLoading, reload } = useAsync({
    promiseFn: getMusicList,
  });

    // 화면에 처음 나타날때만 실행 (마운트 시)
    /*useEffect(() => {
      getMusicList();
    }, []);*/
  
  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!musicList) return null;
  //if (!musicList) return <button onClick={fetchData}>불러오기</button>;

  return (
    <>
      <ul>
        {musicList.map((music) => (
          <li
            key={music.id}
            onClick={() => setId(music.id)}
            style={{ cursor: 'pointer' }}
          >
            {music.title} ({music.singer})
          </li>
        ))}
      </ul>
      <button onClick={reload}>다시 불러오기</button>
      {id && <Music2 id={id} />}
    </>
  );
}

export default MusicList2;
