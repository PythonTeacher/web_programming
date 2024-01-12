import axios from 'axios';

/*export async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
  );
  return response.data;
}

export async function getUser({ id }) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );
  return response.data;
}*/

async function getMusicList() {
  const response = await axios.get('http://localhost:5000/musicList');
  return response.data;
}

export async function getMusic({ id }) {
  const response = await axios.get(`http://localhost:5000/musicList/${id}`);
  return response.data;
}

export default getMusicList;
