import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import { getUser } from './api';

/*
async function getUser({ id }) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );
  return response.data;
}*/

function User2({ id }) {
  const { data: user, error, isLoading } = useAsync({
    promiseFn: getUser,
    id,
    watch: id, // id가 바꾸면 다시 호출
  });

  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;

  return (
    <div>
      <p>
        <b>{user.username}</b>
      </p>
      <p>{user.email}</p>
    </div>
  );
}

export default User2;
