// 데이터
let music = [
  { id: 1, title: "아무노래", singer: "지코" },
  { id: 2, title: "비", singer: "폴킴" },
  { id: 3, title: "별보러가자", singer: "적재" },
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
  res.json(music.slice(0, limit));
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
  const result = music.find((m) => m.id === id);

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

  music = music.filter((m) => m.id !== id);
  res.status(200).json(music);
};

// 등록
// - 성공 : 201 응답, 생성된 User 객체 반환 (201 : Created)
// - 실패 : name 값 누락 시 400 반환 (400 : Bad Request)
const create = (req, res) => {
  const { title, singer } = req.body;
  if (!title || !singer) return res.status(400).end();

  const id = Date.now(); // 1970년 1월 1일 0시 0분 0초부터 현재까지 경과된 밀리 초를 반환
  const m = { id, title, singer };
  music.push(m);
  res.status(201).json(music);
};

// 변경
// - 성공 : id에 해당하는 객체 반환 (200 : OK)
// - 실패 : id가 숫자가 아닐 경우 400 응답, name이 없을 경우 400 응답 (400 : Bad Request)
//          없는 user일 경우 404 응답 (404 : Not Found)
const update = (req, res) => {
  // 127.0.0.1:3000/user/2
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const { title, singer } = req.body;

  const result = music.find((m) => m.id === id);
  if (!result) return res.status(404).end();

  if (title) result.title = title;
  if (singer) result.singer = singer;
  res.status(200).json(result);
};

module.exports = { list, detail, remove, create, update };
