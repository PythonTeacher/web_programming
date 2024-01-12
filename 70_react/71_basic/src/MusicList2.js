import React, { useMemo, useContext } from 'react';
import { MusicContext } from './MusicReducerApp2';

function Music({ music }) {
  const { id, title, singer, active } = music;
  const style = {
    color: active ? 'green' : 'black',
    cursor: 'pointer',
  };

  const dispatch = useContext(MusicContext);

  const onRemove = (id) => {
    dispatch({
      type: 'REMOVE_MUSIC',
      id,
    });
  };

  const onToggle = (id) => {
    dispatch({
      type: 'TOGGLE_MUSIC',
      id,
    });
  };

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

function MusicList2({ musicList }) {
  const countActiveMusic = () => {
    console.log('Active 갯수 세기', musicList);
    return musicList.filter((music) => music.active).length;
  };

  const count = useMemo(countActiveMusic, [musicList]);

  return (
    <>
      {musicList.map((music) => (
        <Music music={music} key={music.id} />
      ))}
      <hr />
      <div>Active된 Music 수 : {count}</div>
    </>
  );
}

export default MusicList2;
