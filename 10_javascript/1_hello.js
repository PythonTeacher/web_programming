// javascript 학습 사이트
// - javascript.info
// - https://developer.mozilla.org/ko/docs/Web/JavaScript

const limit = parseInt("123adf", 10);

console.log(limit);
if (Number.isNaN(limit)) {
  console.log("number 타입 아님");
} else {
  console.log("number 타입");
}

const todos = [
  { id: 1, txt: "할일1", done: true },
  { id: 2, txt: "할일2", done: false },
];
const a = todos.concat({ id: 3, txt: "할일3", done: false });
console.log(a); // [{id:1..}, {id:2..}, {id:3..}]

const b = a.filter((todo) => todo.id !== 2);
console.log(b); // [{id:1..}, {id:3..}]

const c = b.map((todo) =>
  todo.id === 3 ? { ...todo, done: !todo.done } : todo
);
console.log(c); // [{id:1..}, {id:3, txt:'할일3', done:true}]
