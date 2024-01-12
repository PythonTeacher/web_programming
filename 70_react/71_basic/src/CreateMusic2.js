import React, { useRef, useContext } from 'react';
import { MusicContext } from './MusicReducerApp2';

function CreateMusic2({ title, singer }) {
  const dispatch = useContext(MusicContext);

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value,
    });
  };

  const nextId = useRef(4);
  const onCreate = () => {
    dispatch({
      type: 'CREATE_MUSIC',
      music: {
        id: nextId.current,
        title,
        singer,
      },
    });
    nextId.current += 1;
  };

  return (
    <div>
      <input
        name="title"
        placeholder="노래"
        onChange={onChange}
        value={title}
      />
      <input
        name="singer"
        placeholder="가수"
        onChange={onChange}
        value={singer}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

export default CreateMusic2;
