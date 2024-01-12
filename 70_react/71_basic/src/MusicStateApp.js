import React, { useRef, useState } from 'react'; // JSX를 사용하려면 import해줘야 함
import './App.css'; //webpack에서 프로젝트에서 사용한 파일들을 한 파일에 모두 결합해 줌
import MusicList from './MusicList';
import CreateMusic from './CreateMusic';

function MusicStateApp() {
  const [music, setMusic] = useState({
    title: '',
    singer: '',
    active: false,
  });

  const { title, singer } = music;

  const [musicList, setMusicList] = useState([
    { id: 1, title: '아무노래', singer: '지코', active: true },
    { id: 2, title: '비', singer: '폴킴', active: false },
    { id: 3, title: '별보러가자', singer: '적재', active: false },
  ]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setMusic({
      ...music,
      [name]: value,
    });
  };

  // 배열에 추가할 항목의 id값 관리
  const nextId = useRef(4); // .current의 기본값 설정
  const onCreate = () => {
    // 배열에 추가
    // 1. spread 연산자
    /*setMusicList([
        ...musicList,
        {
          id: nextId.current,
          title, // ...music 해도 됨
          singer,
        },
      ]);*/

    // 2. concat 함수
    setMusicList(
      musicList.concat({
        id: nextId.current,
        ...music,
      }),
    );

    setMusic({
      title: '',
      singer: '',
      active: false,
    });
    nextId.current += 1;
  };

  const onRemove = (id) => {
    setMusicList(musicList.filter((music) => music.id !== id));
  };

  const onToggle = (id) => {
    setMusicList(
      musicList.map((music) =>
        music.id === id ? { ...music, active: !music.active } : music,
      ),
    );
  };

  return (
    <>
      <CreateMusic
        title={title}
        singer={singer}
        onChange={onChange}
        onCreate={onCreate}
      />
      <MusicList
        musicList={musicList}
        onRemove={onRemove}
        onToggle={onToggle}
      />
    </>
  );
}

export default MusicStateApp;
