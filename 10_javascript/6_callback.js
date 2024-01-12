// Javascript - 5. 콜백 함수

// 다른 함수의 인자로서 넘겨지는 함수로, 넘겨받은 코드에서
// 콜백함수를 필요에 따라 즉시 실행하거나 나중에 실행할 수 있음

// 동기식 처리
function add_sync(a, b) {
  var sum = a + b;
  return sum;
}

function print(result) {
  console.log(result);
}

print(add_sync(1, 2));

// 비동기식 처리
function add_async(a, b, callback) {
  var sum = a + b;
  callback(sum);
}

// 콜백 함수로 사용할 함수 정의
function print(result) {
  console.log(result);
}

add_async(1, 2, print);

// 익명함수로 전달
add_async(2, 3, function (result) {
  console.log(result);
});

// 콜백함수를 애로우 함수(람다식)로 전달
add_async(2, 3, (result) => {
  console.log(result);
});

add_async(12, 13, (result) => console.log(result));

// 콜백함수
const increase = (number, callback) => {
  setTimeout(() => {
    const result = number + 1;
    console.log(result);
    callback(result);
  }, 1000);
};

/*
// 1초 간격으로 반복 호출하고 싶으면 -> 콜백 지옥
increase(0, (result) => {
  increase(result, (result) => {
    increase(result, (result) => {
      console.log("작업완료");
    });
  });
});
*/

// Promise : 콜백 지옥을 없애기 위한 ES6에 도입된 기능
/*
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    //resolve(1);
    reject(new Error());
  }, 1000);
});

promise
  .then((n) => {
    console.log(n);
  })
  .catch((e) => {
    console.log(e);
  });

  */
const increase2 = (number) => {
  const promise = new Promise((resolve, reject) => {
    // resolve는 성공, reject는 실패
    setTimeout(() => {
      const result = number + 1;
      // if (result > 3) {
      //   const e = new Error("Number is too big");
      //   return reject(e);
      // }
      console.log(result);
      resolve(result);
    }, 1000);
  });
  return promise;
};

/*
increase2(0)
  .then((number) => {
    // Promise에서 resolve된 값
    return increase2(number); // Promise를 리턴함
  })
  .then((number) => {
    return increase2(number);
  })
  .catch((e) => {
    console.log(e);
  });

// 이렇게 쓸 수도 있음
increase2(0)
  .then(increase2)
  .then(increase2)
  .catch((e) => {
    console.log(e);
  });
*/

// Promise를 사용하면 코드의 깊이가 길어지지 않게 됨
// 그러나 에러 발생 시 어디서 발생했는지 찾기가 어렵고 특정 조건에 따라 분기를 나누는게 어려움

// async/await는 Promise를 더욱 쉽게 사용할 수 있도록 추가된 ES2017(ES8) 문법임
// 함수 앞에 async 키워드 추가, Promise 앞에 await 키워드 추가
// Promise가 끝날때까지 기다리고 결과값을 전달 받을 수 있음
const runTask = async () => {
  try {
    let result = await increase2(0);
    result = await increase2(result);
    result = await increase2(result);
  } catch (e) {
    console.log(e);
  }
};

runTask();
