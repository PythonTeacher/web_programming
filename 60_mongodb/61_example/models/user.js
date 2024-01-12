const mongoose = require("mongoose");

// 스키마 정의
const UserSchema = new mongoose.Schema({
  // _id : objectid 자동 생성
  name: {
    type: String,
    trim: true,
    required: true,
  },
  // 로그인 추가
  userId: {
    type: String,
    trim: true,
    required: true,
  },
  userPwd: {
    type: String,
    trim: true,
    required: true,
  },
  salt: {
    type: String,
  },
});

// 스키마에서 모델 클래스 생성 후 exports
// model(모델명, 스키마) -> DB의 user 컬렉션과 매칭
module.exports = mongoose.model("user", UserSchema);
