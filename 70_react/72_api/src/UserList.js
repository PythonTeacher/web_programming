import React, { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import User from './User';

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

function UserList() {
  const [userId, setUserId] = useState(null);
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      // GET: 조회, POST: 등록, PUT: 수정, DELETE: 삭제
      const response = await axios.get(
        'http://jsonplaceholder.typicode.com/users',
      );
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

  const { loading, data: users, error } = state;

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;
  //if (!users) return <button onClick={fetchData}>불러오기</button>;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{ cursor: 'pointer' }}
          >
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchData}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default UserList;
