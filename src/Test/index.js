// 0
// 1
// 3
// 4

// add commit push reset diff cherry-pick

// 2绿 2红 2黄 2绿

function loopFunc(props) {
  let status = "";
  const common = (color, delay) => {
    return new Promise((resolve) => {
      status = color;
      setTimeout(() => {
        console.log(status);
        resolve();
      }, delay);
    });
  };

  const green = () => {
    common("green", props["green"] || 2000).then(red);
  };

  const red = () => {
    common("red", props["red"] || 2000).then(yellow);
  };

  const yellow = () => {
    common("yellow", props["yellow"] || 2000).then(green);
  };
  green();
}

// console.log(loopFunc({'green': 2000,'red': 3000, 'yellow': 4000}))

// 获取所有的区 数据多  有控制
function findFunc(limit = 4, tasks) {
  let pool = [];

  const asyncFunc = (val) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(val);
      }, val * 1000);
    });
  };

  const promiseFunc = (callback) => {
    return callback.then((val) => {
      console.log(val);
      if (!tasks.length) {
        return val;
      } else {
        return promiseFunc(asyncFunc(tasks.shift()));
      }
    });
  };

  for (let i = 0; i < limit; i++) {
    pool.push(promiseFunc(asyncFunc(tasks.shift())));
  }

  Promise.allSettled(pool);
}

// console.log(findFunc(5, [1,6,2,7,3,4,8,5]))

function arrayToTree(items) {
  const map = {};
  const roots = [];

  // 第一次遍历：为每个节点创建副本并初始化 children
  items.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  // 第二次遍历：建立父子关系
  items.forEach((item) => {
    const node = map[item.id];
    if (item.parentId === null) {
      roots.push(node);
    } else {
      const parent = map[item.parentId];
      if (parent) {
        parent.children.push(node);
      }
    }
  });

  return roots;
}

const input = [
  { id: 1, name: "xx", parentId: null },
  { id: 2, name: "xx", parentId: 1 },
  { id: 3, name: "xx", parentId: 2 },
];

//   console.log(JSON.stringify(arrayToTree(input), null, 2));

function requestFunc() {
  let currentRequestId = 0;

  const asyncFunc = (val) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(val);
      }, val * 1000);
    });
  };

  const promiseFunc = (callback) => {
    let requestId = ++currentRequestId;
    return callback.then((val) => {
      console.log(val, requestId, currentRequestId);
    });
  };

  setTimeout(() => {
    promiseFunc(asyncFunc(6));
  }, 0);

  setTimeout(() => {
    promiseFunc(asyncFunc(1));
  }, 3000);
}

// console.log(requestFunc())

var a = (v) => {
  return new Promise((resolve, reject) => {
    // throw new Error('error')
    if (v > 5) {
      resolve("success");
    } else {
      reject("fail");
    }
  });
};

// a(6).then(v => {
//     console.log('then', v)
//     throw new Error('then1 error')
// }, e => {
//     console.log('reject111', e)
// }).then(3).then(v => {
//     console.log('then2', v)
// }).catch(err => {
//     console.log('catch', err)
// })

// 两个大对象怎么做比较
const mockRequest = (time, val) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      val < 4 ? reject("请求失败") : resolve("成功"+time);
    }, time * 1000);
  });
};

let lastPromise = Promise.resolve(); // 上一个任务的最终 Promise

async function requestWithRetry(val, maxRetries = 3) {
  let attempt = 0;
  while (true) {
    try {
      const res = await mockRequest(val, attempt > 1 ? val : val);
      console.log('res', res)
      return res
    } catch (error) {
        console.log('失败'+val)
      attempt++;
      if (attempt >= maxRetries) throw error;
      const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s, 4s
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

function createSerialExecutor(val) {
  const task = () => requestWithRetry(val);

  // 将新任务附加到链上，无论上一个任务成功/失败，都继续执行
  lastPromise = lastPromise.then(
    () => task(), // 上一个成功，直接执行新任务
    () => task(), // 上一个失败，也执行新任务
  );
  return lastPromise; // 返回当前任务的 Promise，调用方可获知其最终结果
}

createSerialExecutor(6);
createSerialExecutor(3);
createSerialExecutor(4);
