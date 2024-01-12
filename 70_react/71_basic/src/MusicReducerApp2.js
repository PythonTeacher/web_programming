import React, { useReducer, createContext } from 'react'; // JSX를 사용하려면 import해줘야 함
import MusicList2 from './MusicList2';
import CreateMusic2 from './CreateMusic2';

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

// Context 생성해서 내보내기 (useContext에서 써야 되므로)
export const MusicContext = createContext(null);

function MusicReducerApp2() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { title, singer } = state.music;
  const { musicList } = state;

  return (
    <>
      <MusicContext.Provider value={dispatch}>
        <CreateMusic2 title={title} singer={singer} />
        <MusicList2 musicList={musicList} />
      </MusicContext.Provider>
    </>
  );
}

export default MusicReducerApp2;
