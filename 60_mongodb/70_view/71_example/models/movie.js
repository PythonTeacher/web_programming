const mongoose = require("mongoose");

// 스키마 정의
const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  director: {
    type: String,
    trim: true,
    required: true,
  },
  year: {
    type: String,
    trim: true,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// 스키마는 단순히 구조만 정의하므로 DB에 들어있는 컬렉션을 지정하려면 모델을 만들어야 함
// db에서 music이라는 이름의 컬렉션을 찾아 MusicSchema 구조로 되어 있는 모델 클래스를 만들어 리턴
module.exports = mongoose.model("movie", MovieSchema);
