// 데이터
let movie = [
  { id: 1, title: "스타워즈", director: "조지 루카스", year: "1977" },
  { id: 2, title: "아바타", director: "제임스 카메론", year: "2009" },
  { id: 3, title: "인터스텔라", director: "크리스토퍼 놀란", year: "2014" },
];

// 목록조회
// - 성공 : limit 수만큼 User 객체를 담은 배열 리턴 (200 : OK)
// - 실패 : limit가 숫자형이 아니면 400을 응답 (400: Bad Request)
const list = (req, res) => {
  // 127.0.0.1:3000/music?limit=2
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);

  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }

  //res.status(200).json(users.slice(0, limit));
  res.json(movie.slice(0, limit));
};

// 상세조회
// - 성공 : id에 해당하는 User 객체 리턴 (200 : OK)
// - 실패 : id가 숫자가 아닐 경우 400 응답, 해당하는 id가 없는 경우 404 응답 (404 : Not Found)
const detail = (req, res) => {
  // 127.0.0.1:3000/users/1
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  //const user = users.filter((user) => user.id === id)[0];
  const result = movie.find((m) => m.id === id);

  // if(user === undefined)
  if (!result) return res.status(404).end();
  res.status(200).json(result);
};

// 삭제
// - 성공 : 삭제 후 결과 배열 리턴 (200 : OK)
// - 실패 : id가 숫자가 아닐 경우 400 응답 (400 : Bad Request)
const remove = (req, res) => {
  // 127.0.0.1:3000/users/1
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  movie = movie.filter((m) => m.id !== id);
  res.status(200).json(movie);
};

// 등록
// - 성공 : 201 응답, 생성된 User 객체 반환 (201 : Created)
// - 실패 : name 값 누락 시 400 반환 (400 : Bad Request)
const create = (req, res) => {
  const { title, director, year } = req.body;
  if (!title || !director || !year) return res.status(400).end();

  const id = Date.now(); // 1970년 1월 1일 0시 0분 0초부터 현재까지 경과된 밀리 초를 반환
  const m = { id, title, director, year };
  movie.push(m);
  res.status(201).json(movie);
};

// 변경
// - 성공 : id에 해당하는 객체 반환 (200 : OK)
// - 실패 : id가 숫자가 아닐 경우 400 응답, name이 없을 경우 400 응답 (400 : Bad Request)
//          없는 user일 경우 404 응답 (404 : Not Found)
const update = (req, res) => {
  // 127.0.0.1:3000/user/2
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const { title, director, year } = req.body;

  const result = movie.find((m) => m.id === id);
  if (!result) return res.status(404).end();

  if (title) result.title = title;
  if (director) result.director = director;
  if (year) result.year = year;

  res.status(200).json(result);
};

module.exports = { list, detail, remove, create, update };
