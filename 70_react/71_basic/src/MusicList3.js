import React, { useMemo } from 'react';

function MusicList3() {
  const musicList = [
    { id: 1, title: 'IDOL', singer: 'BTS', active: true },
    { id: 2, title: 'ON', singer: 'BTS', active: true },
    { id: 3, title: 'UGH', singer: 'BTS', active: false },
  ];

  const countActiveMusic = () => {
    return musicList.filter((music) => music.active).length;
  };

  const count = useMemo(countActiveMusic, [musicList]);

  return (
    <>
      {musicList.map((music) => (
        <Music music={music} key={music.title} />
      ))}
      <div>Active된 Music 수 : {count}</div>
    </>
  );
}

function Music({ music }) {
  const { title, singer } = music;

  return (
    <div>
      {title} ({singer})
    </div>
  );
}

export default MusicList3;
