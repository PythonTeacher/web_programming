import React, { useEffect, useMemo } from 'react';
import Music2 from './Music2';

function Music({ music, onRemove, onToggle }) {
  const { id, title, singer, active } = music;
  const style = {
    color: active ? 'green' : 'black',
    cursor: 'pointer',
  };

  // 리렌더링 시마다 호출
  /*useEffect(() => {
    console.log(music);
  });*/

  // 마운트 또는 언마운트 시에만 호출 (componentDidMount, componentWillUnmount)
  /*useEffect(() => {
    console.log('컴포넌트가 화면에 나타남'); // REST API, 외부 Library, setInterval, setTimeout
    return () => {
      // clean-up(뒷정리) 함수
      console.log('컴포넌트가 화면에서 사라짐'); // clearInterval, clearTimeout, Library 인스턴스 제거
    };
  }, []); // 의존값이 들어있는 배열, []이면 컴포넌트가 화면에 나타날 때만 실행*/

  // 마운트, 언마운트되거나 music값이 바뀔때마다 호출 (componentDidUpdate)
  // useEffect에서 사용하는 state나 props가 있다면 deps에 추가하기
  // 그렇지 않으면 useEffect에 등록한 함수가 실행될 때 최신 props나 state를 가르키지 않게 됨 (동기화처리)
  useEffect(() => {
    console.log(
      '컴포넌트가 화면에 나타남 or 컴포넌트가 업데이트된 직후',
      music,
    );
    return () => {
      console.log(
        '컴포넌트가 화면에서 사라짐 or 컴포넌트가 업데이트되기 직전',
        music,
      );
    };
  }, [music]); // 의존값이 들어있는 배열

  return (
    <div>
      <b style={style} onClick={() => onToggle(id)}>
        {' '}
        {title}
      </b>{' '}
      ({singer})<button onClick={() => onRemove(id)}>삭제</button>
    </div>
  );
}

function MusicList({ musicList, onRemove, onToggle }) {
  /*const musics = [
    { id: 1, title: '아무노래', singer: '지코' },
    { id: 2, title: '비', singer: '폴킴' },
    { id: 3, title: '별보러가자', singer: '적재' },
  ];*/

  /*return (
    <>
      <div>
        <b>{musics[0].title}</b> ({musics[0].singer})
      </div>
      <div>
        <b>{musics[1].title}</b> ({musics[1].singer})
      </div>
      <div>
        <b>{musics[2].title}</b> ({musics[2].singer})
      </div>
    </>
  );*/

  // Music 컴포넌트로 빼기
  /*
  return (
    <>
      <Music music={musics[0]} />
      <Music music={musics[1]} />
      <Music music={musics[2]} />
    </>
  );*/

  // 배열의 map 내장함수 사용
  // 콘솔 오류 확인 -> 배열을 렌더링 할 때에는 key 추가
  // 각 배열 원소에 key가 있어야 배열이 업데이트될 때 효율적으로 렌더링 될 수 있음
  // key가 없는 경우와 있는 경우 비교하기
  /*
  return (
    <>
      {musics.map((music) => (
        <Music music={music} />
      ))}
    </>
  );*/

  const countActiveMusic = () => {
    console.log('Active 갯수 세기', musicList);
    return musicList.filter((music) => music.active).length;
  };

  // 컴포넌트가 리렌더링될 때마다 함수가 호출됨
  // Active가 변경될 때에만 호출되게 하고, 변경이 안될 때는 이전 값 그대로 사용
  // 두번 실행되는 이유는 리액트에서 StrictMode사용 시 예상치 못한 부작용을 detect하기 위해 두번 호출
  //const count = countActiveMusic(musicList);
  const count = useMemo(countActiveMusic, [musicList]);

  return (
    <>
      {musicList.map((music) => (
        <Music
          music={music}
          key={music.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
      <hr />
      <div>Active된 Music 수 : {count}</div>
    </>
  );
}

export default MusicList;
