import React, { useRef, useReducer } from 'react'; // JSX를 사용하려면 import해줘야 함
import MusicList from './MusicList';
import CreateMusic from './CreateMusic';

const initialState = {
  music: {
    title: '',
    singer: '',
    active: false,
  },
  musicList: [
    { id: 1, title: '아무노래', singer: '지코', active: true },
    { id: 2, title: '비', singer: '폴킴', active: false },
    { id: 3, title: '별보러가자', singer: '적재', active: false },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        music: {
          ...state.music,
          [action.name]: action.value,
        },
      };
    case 'CREATE_MUSIC':
      return {
        musicList: state.musicList.concat(action.music),
        music: initialState.music,
      };
    case 'REMOVE_MUSIC':
      return {
        ...state,
        musicList: state.musicList.filter((music) => music.id !== action.id),
      };
    case 'TOGGLE_MUSIC':
      return {
        ...state,
        musicList: state.musicList.map((music) =>
          music.id === action.id ? { ...music, active: !music.active } : music,
        ),
      };
    default:
      throw new Error('Unhandled action');
  }
}

function MusicReducerApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { title, singer } = state.music;
  const { musicList } = state;

  const nextId = useRef(4);

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value,
    });
  };

  const onCreate = () => {
    dispatch({
      type: 'CREATE_MUSIC',
      music: {
        id: nextId.current,
        //title,
        //singer,
        ...state.music,
      },
    });
    nextId.current += 1;
  };

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

export default MusicReducerApp;
