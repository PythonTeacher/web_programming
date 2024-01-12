const MovieModel = require("../../models/movie");
const mongoose = require("mongoose");

// id 유효성 체크
const checkId = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("유효하지 않은 id입니다.");
  }
  next();
};

// 목록조회: GET /movie?limit=2
// - 성공 : limit 수만큼 User 객체를 담은 배열 리턴 (200 : OK)
// - 실패 : limit가 숫자형이 아니면 400을 응답 (400: Bad Request)
const list = (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);

  if (Number.isNaN(limit)) {
    return res.status(400).send("limit가 숫자형이 아닙니다");
  }

  // 두번째 방법
  MovieModel.find()
    .limit(limit)
    .sort({ _id: -1 })
    .exec((err, result) => {
      if (err) return res.status(500).send("목록조회 시 오류가 발생했습니다.");
      res.render("movie/list", { result });
    });
};

// 상세조회: GET /api/movie/:id
// - 성공 : id에 해당하는 User 객체 리턴 (200 : OK)
// - 실패 : 유효한 id가 아닌 경우 400 응답, 해당하는 id가 없는 경우 404 응답 (404 : Not Found)
const detail = (req, res) => {
  const id = req.params.id;

  MovieModel.findById(id, (err, result) => {
    if (err) return res.status(500).send("상세조회 시 오류가 발생했습니다.");
    if (!result) return res.status(404).send("존재하지 않는 id입니다.");
    res.render("movie/detail", { result });
  });
};

// 삭제: DELETE /api/movie/:id
// - 성공 : 삭제 후 결과 배열 리턴 (200 : OK)
// - 실패 : 유효한 id가 아닌 경우 400 응답 (400 : Bad Request)
const remove = (req, res) => {
  const id = req.params.id;

  MovieModel.findByIdAndDelete(id, (err, result) => {
    if (err) return res.status(500).send("삭제 시 오류가 발생했습니다.");
    if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
    res.json(result);
  });
};

// 등록: POST /api/movie
// - 성공 : 201 응답, 생성된 User 객체 반환 (201 : Created)
// - 실패 : name 값 누락 시 400 반환 (400 : Bad Request)
const create = (req, res) => {
  const { title, director, year } = req.body;
  if (!title || !director || !year)
    return res.status(400).send("필수값이 입력되지 않았습니다.");

  // save() : 모델의 instance인 document를 생성
  const movie = new MovieModel({ title, director, year });
  movie.save((err, result) => {
    if (err) return res.status(500).send("등록 시 오류가 발생했습니다.");
    res.status(201).json(result);
  });
};

// 변경: PUT /api/movie/:id
// - 성공 : id에 해당하는 객체 반환 (200 : OK)
// - 실패 : 유효한 id가 아닌 경우 400 응답, name이 없을 경우 400 응답 (400 : Bad Request)
//          없는 user일 경우 404 응답 (404 : Not Found)
const update = (req, res) => {
  const id = req.params.id;
  const { title, director, year } = req.body;

  MovieModel.findByIdAndUpdate(
    id,
    { title, director, year },
    { new: true },
    (err, result) => {
      if (err) return res.status(500).send("수정 시 오류가 발생했습니다.");
      if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
      res.json(result);
    }
  );
};

const showCreatePage = (req, res) => {
  res.render("movie/create", { name: req.session.name });
};

const showUpdatePage = (req, res) => {
  const id = req.params.id;

  MovieModel.findById(id, (err, result) => {
    if (err) return res.status(500).send("조회 시 오류가 발생했습니다.");
    if (!result) return res.status(404).send("해당하는 정보가 없습니다.");
    res.render("movie/update", { result });
  });
};

module.exports = {
  list,
  detail,
  remove,
  create,
  update,
  checkId,
  showCreatePage,
  showUpdatePage,
};
