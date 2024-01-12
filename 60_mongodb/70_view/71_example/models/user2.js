const mongoose = require("mongoose");

// 스키마 정의 (사용자 정보)
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true, // useCreateIndex: truree 추가
  },
  password: {
    // 암호화해서 들어감
    type: String,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50, // minlength도 있음
  },
  role: {
    type: Number,
    default: 0, // 0: 일반사용자, 1: 관리자
  },
  token: {
    type: String,
  },
});

// 스키마에서 모델 클래스 생성 후 exports
// model(모델명, 스키마) -> DB의 user 컬렉션과 매칭
module.exports = mongoose.model("user", UserSchema);
