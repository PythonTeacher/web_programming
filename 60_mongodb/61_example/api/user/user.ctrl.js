var UserModel = require("../../models/user");

// 목록조회
// - 성공 : limit 수만큼 User 객체를 담은 배열 리턴 (200 : OK)
// - 실패 : limit가 숫자형이 아니면 400을 응답 (400: Bad Request)
const list = (req, res) => {
  // 127.0.0.1:3000/users?limit=2
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);

  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }

  UserModel.find((err, result) => {
    if (err) {
      return res.status(500).end();
    }
    res.json(result);
  }).limit(limit);
};

// 상세조회
// - 성공 : id에 해당하는 User 객체 리턴 (200 : OK)
// - 실패 : id가 숫자가 아닐 경우 400 응답, 해당하는 id가 없는 경우 404 응답 (404 : Not Found)
const detail = (req, res) => {
  // 127.0.0.1:3000/users/1  // or 127.0.0.1:3000/users?id=1
  const id = req.params.id; // || req.query.id;
  // 여기까지 왔다는 건 id값이 있다는 것
  /*if (!id) {
    return res.status(400).end();
  }*/

  // {_id: id}
  UserModel.findById(id, (err, result) => {
    if (err) {
      return res.status(500).end();
    }
    if (!result) {
      return res.status(404).end();
    }
    res.json(result);
  });
};

// 삭제
// - 성공 : 삭제 후 결과 배열 리턴 (200 : OK)
// - 실패 : id가 숫자가 아닐 경우 400 응답 (400 : Bad Request)
const remove = (req, res) => {
  // 127.0.0.1:3000/users/1
  const id = req.params.id;
  /*if (!id) {
    return res.status(400).end();
  }*/

  UserModel.findByIdAndDelete(id, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();
    res.json(result);
  });
};

// 등록
// - 성공 : 201 응답, 생성된 User 객체 반환 (201 : Created)
// - 실패 : name 값 누락 시 400 반환 (400 : Bad Request)
const create = (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).end();

  UserModel.create({ name }, (err, result) => {
    if (err) {
      return res.status(500).end();
    } else {
      res.status(201).json(result);
    }
  });
};

// 변경
// - 성공 : id에 해당하는 객체 반환 (200 : OK)
// - 실패 : id가 숫자가 아닐 경우 400 응답, name이 없을 경우 400 응답 (400 : Bad Request)
//          없는 user일 경우 404 응답 (404 : Not Found)
const update = (req, res) => {
  // 127.0.0.1:3000/user/2
  const id = req.params.id;
  //if (!id) return res.status(400).end();

  const name = req.body.name;
  // 값을 clear 할 경우도 있음
  // if (!name) return res.status(400).end();

  UserModel.findByIdAndUpdate(id, { name }, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();
    res.json(result);
  });
};

module.exports = { list, detail, remove, create, update };
