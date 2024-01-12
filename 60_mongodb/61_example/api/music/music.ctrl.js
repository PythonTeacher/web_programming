const MusicModel = require("../../models/music");
const mongoose = require("mongoose");

// 목록조회: GET /api/music?limit=2
// - 성공 : limit 수만큼 User 객체를 담은 배열 리턴 (200 : OK)
// - 실패 : limit가 숫자형이 아니면 400을 응답 (400: Bad Request)
const list = (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);

  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }

  // 첫번째 방법
  MusicModel.find((err, result) => {
    if (err) return res.status(500).end();
    res.json(result);
  })
    .sort({ _id: -1 })
    .limit(limit);

  // 두번째 방법
  /*MusicModel.find()
    .sort({ _id: -1 })
    .limit(limit)
    .exec((err, result) => {
      if (err) throw err;
      res.json(result);
    });*/
};

// 상세조회: GET /api/music/:id
// - 성공 : id에 해당하는 User 객체 리턴 (200 : OK)
// - 실패 : 유효한 id가 아닐 경우 400 응답, 해당하는 id가 없는 경우 404 응답 (404 : Not Found)
const detail = (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).end();
  }

  MusicModel.findById(id, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();
    res.json(result);
  });

  /*MusicModel.findOne({ _id: id }, (err, result) => {
    if (err) next(err); // return res.status(500).end();
    if (!result) return res.status(404).end();
    res.json(result);
  });*/
};

// 삭제: DELETE /api/music/:id
// - 성공 : 삭제 후 결과 배열 리턴 (200 : OK)
// - 실패 : 유효한 id가 아닐 경우 400 응답 (400 : Bad Request)
const remove = (req, res) => {
  // 127.0.0.1:3000/users/1
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).end();
  }

  MusicModel.findByIdAndDelete(id, (err, result) => {
    if (err) return res.status(500).end();
    if (!result) return res.status(404).end();
    res.json(result);
  });
};

// 등록: POST /api/music
// - 성공 : 201 응답, 생성된 User 객체 반환 (201 : Created)
// - 실패 : name 값 누락 시 400 반환 (400 : Bad Request)
const create = (req, res) => {
  const { singer, title } = req.body;
  if (!title || !singer) return res.status(400).end();

  /*MusicModel.create({ singer, title }, (err, result) => {
    if (err) throw err;
    res.status(201).json(result);
  });*/

  // save() : 모델의 instance인 document를 생성
  const music = new MusicModel({ singer, title });
  music.save((err, result) => {
    if (err) return res.status(500).end();
    res.status(201).json(result);
  });
};

// 변경: PUT /api/music/:id
// - 성공 : id에 해당하는 객체 반환 (200 : OK)
// - 실패 : 유효한 id가 아닐 경우 400 응답, name이 없을 경우 400 응답 (400 : Bad Request)
//          없는 user일 경우 404 응답 (404 : Not Found)
const update = (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).end();
  }

  const { singer, title } = req.body;

  MusicModel.findByIdAndUpdate(
    id,
    { singer, title },
    { new: true },
    (err, result) => {
      if (err) return res.status(500).end();
      if (!result) return res.status(404).end();
      res.json(result);
    }
  );
};

module.exports = { list, detail, remove, create, update };
