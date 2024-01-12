// 목록조회
const list = (req, res) => {
  res.send("user list");
};

// 상세조회
const detail = (req, res) => {
  res.send(`user detail : ${req.params.id}`);
};

// 삭제
const remove = (req, res) => {
  res.send(`user delete : ${req.params.id}`);
};

// 등록
const create = (req, res) => {
  res.send("user create");
};

// 변경
const update = (req, res) => {
  res.send(`user update : ${req.params.id}`);
};

module.exports = { list, detail, remove, create, update };
