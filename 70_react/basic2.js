// 배열 + 객체
const todos = [
  {
    id: 1,
    text: '아침자습하기',
    done: true,
  },
  {
    id: 2,
    text: '저녁자습하기',
    done: false,
  },
];

// 할일 추가
todos.push({
  id: 3,
  text: '심야자습하기',
  done: false,
}); // (X)

const inserted = todos.concat({
  id: 4,
  text: '취침하기',
  done: false,
});

console.log(todos); // 123
console.log(inserted); // 1234

// 삭제 (splice -> filter)
todos.splice(2, 1);
console.log(todos); // (X) // 12

const filtered = inserted.filter((todo) => todo.id !== 3);
console.log(filtered); // 124

console.log('***************');
// 변경
console.log(inserted); // 1234
const selected = todos.find((todo) => todo.id === 2);
selected.done = !selected.done;
console.log(todos);
console.log(inserted);

/*
const toggled = inserted.map(todo => todo.id === 2 ? {...todo, done: !todo.done} : todo );
console.log(toggled);
*/

console.log('************************');
const arr = ['hello', 'hi'];

const newArr = arr.concat('bye');
console.log(newArr);

arr[1] = 'bye';
console.log(arr);
console.log(newArr);
