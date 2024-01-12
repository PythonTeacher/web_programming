// 1. Spread 연산자 (ES6, 전개연산자)
// 배열
const num = [1, 2, 3, 4, 5];
console.log(num);
console.log(...num);
console.log([...num]); // num에 있는 값을 전개하여 다시 새로운 배열로 만듬
console.log([...num, 6]);

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a, b, rest);

// 객체
const std = { id: 1, name: '홍길동' };
const std2 = { addr: '안산', phone: '010-1111-2222' };
const std3 = { ...std, ...std2 }; // 새로운 객체를 만듬
console.log(std3);

// 2. 비구조화 할당 (구조 분해 할당)
// 배열 구조 분해 할당
const arr = [1, 2, 3];
console.log(arr[0], arr[1], arr[2]);

const [one, two, three] = arr;
console.log(one, two, three);

// 객체 구조 분해 할당
const obj = {
  id: 1,
  text: 'hello',
};
console.log(obj.id, obj.text);

const { id, text } = obj;
console.log(id, text);

const arrobj = [
  { id: 1, text: 'hello' },
  { id: 2, text: 'hi' },
  { id: 3, text: 'bye' },
];
const [first, second, third] = arrobj;
console.log(first, second, third);

const [
  { id: id1, text: text1 }, // const id1 = arrobj[0].id
  { id: id2, text: text2 },
  { id: id3, text: text3 },
] = arrobj;
console.log(id1, text1);
console.log(id2, text2);
console.log(id3, text3);

let c = 1,
  d = 2;
console.log(c, d);
[c, d] = [d, c];
console.log(c, d);

// 3. 불변성 유지
// 객체
const object = {
  a: 1,
  b: 2,
};

object.b = 3; // (X) -> 값을 직접 수정하면 불변성이 깨짐

console.log(object);

const newObject = {
  ...object, // 기존 값 집어넣고
  b: 3, // 새로운 값으로 덮어씀
}; // (O) -> spread 연산 : 컴포넌트 제대로 리렌더링, 컴포넌트 최적화

console.log(newObject);

// 배열
const todos = [
  {
    id: 1,
    text: '할일 1',
    done: true,
  },
  {
    id: 2,
    text: '할일 2',
    done: false,
  },
];

console.log(todos);

/*todos.push({
  id: 3,
  text: "할일 3",
  done: false,
});

console.log(todos);

todos.splice(
  todos.findIndex((todo) => todo.id === 2),
  1
);

console.log(todos);

const selected = todos.find((todo) => todo.id === 3);
selected.done = !selected.done;
console.log(todos);*/
// (X) -> 배열을 직접 수정하면 안됨

// concat(추가), filter(삭제), map(수정)을 이용하여 새로운 배열을 만들어야 함
const inserted = todos.concat({
  id: 3,
  text: '할일 3',
  done: false,
});

console.log(todos);
console.log(inserted);

const filtered = inserted.filter((todo) => todo.id !== 2);
console.log(filtered);

const toggled = filtered.map((todo) =>
  todo.id === 3 ? { ...todo, done: !todo.done } : todo,
);
console.log(toggled);

// 4. 라이브러리 불러오기
// node.js에서 사용하고 있는 CommonJS 문법
//const moment = require("moment");

// ES6(ES2015)에서 새롭게 도입된 키워드
// CommonJS에 비해 가독성도 좋고, 모듈에서 실제 쓰이는 부분만 불러오므로 성능과 메모리 측면에서 좋음
//import moment from ("moment");

// 내보내기
// CommonJS 문법
//module.exports = {};

// ES6
//export default 컴포넌트명;

/*
const add = (number) => {
  setTimeout(() => {
    const result = number + 1;
    console.log(result);
    return result;
  }, 1000);
};

let result = add(0);
result = add(result);
result = add(result);
console.log(result);
*/

/*
// 콜백으로 해결하기
const add = (number, callback) => {
  setTimeout(() => {
    const result = number + 1;
    console.log(result);
    callback(result);
  }, 1000);
};

// 콜백 지옥
add(0, (result) => {
  add(result, (result) => {
    add(result, (result) => {
      console.log(result);
    });
  });
});
*/

/*
// Promise : 콜백 지옥을 없애기 위한 ES6에 도입된 기능
const add = (number) => {
  const promise = new Promise((resolve, reject) => {
    // resolve는 성공, reject는 실패
    setTimeout(() => {
      const result = number + 1;
      console.log(result);
      resolve(result);
    }, 1000);
  });
  
  return promise;
};

add(0)
  .then((number) => {
    // Promise에서 resolve된 값
    return add(number); // Promise를 리턴함
  })
  .then((number) => {
    return add(number);
  })
  .catch((e) => {
    console.log(e);
  });

*/

// Promise를 사용하면 콜백 지옥은 해결할 수 있지만
// 에러가 어디서 발생했는지 찾기가 어렵고 특정 조건에 따라 분기를 나누는게 어려움

// async/await는 Promise를 더욱 쉽게 사용할 수 있도록 추가된 ES2017(ES8) 문법임
// 함수 앞에 async 키워드 추가, Promise 앞에 await 키워드 추가
// Promise가 끝날때까지 기다리고 결과값을 전달 받을 수 있음
const add = (number) => {
  const promise = new Promise((resolve, reject) => {
    // resolve는 성공, reject는 실패
    setTimeout(() => {
      const result = number + 1;
      console.log(result);
      resolve(result);
    }, 1000);
  });
  return promise;
};

const runTask = async () => {
  try {
    let result = await add(0);
    result = await add(result);
    result = await add(result);
  } catch (e) {
    console.log(e);
  }
};

runTask();
