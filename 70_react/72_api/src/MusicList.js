import React, { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import Music from './Music';

// LOADING, SUCCESS, ERROR
function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type : ${action.type}`);
  }
}

function MusicList() {
  const [id, setId] = useState(null);
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      // GET: 조회, POST: 등록, PUT: 수정, DELETE: 삭제
      const response = await axios.get('http://localhost:5000/musicList');
      dispatch({ type: 'SUCCESS', data: response.data });
    } catch (e) {
      // 200: OK, 400: Bad Request, 404: Not Found, 500: Internal Server Error
      console.log(e.response.status);
      dispatch({ type: 'ERROR', error: e });
    }
  };

  // 화면에 처음 나타날때만 실행 (마운트 시)
  useEffect(() => {
    fetchData();
  }, []);

  const { loading, data: musicList, error } = state;

  if (loading) return <div>로딩중..</div>;
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
      <button onClick={fetchData}>다시 불러오기</button>
      {id && <Music id={id} />}
    </>
  );
}

export default MusicList;
