function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function test(lights) {
  let index = 0;
  while (true) {
    const { title, time } = lights[index];
    console.log(`${title} 亮，持续 ${time} 秒`);
    await sleep(time * 1000); // 将秒转换为毫秒
    index = (index + 1) % lights.length; // 循环索引
  }
  // let pool = Promise.resolve()
  // const common = (color, delay) => {
  //     return new Promise((resolve) => {
  //         setTimeout(() => {
  //             console.log(color)
  //             resolve(color)
  //         }, delay*1000)
  //     })
  // }

  // const reFunc = () => {
  //     arr.forEach((item, index) => {
  //         pool = pool.then((val) => {
  //             return common(item.title, item.time).then((val) => {
  //                 if(index === arr.length - 1) {
  //                     reFunc()
  //                 }
  //                 return val
  //             })
  //         })
  //     })
  // }

  // reFunc()
}

// test([
//   { title: "绿灯", time: 3 },
//   { title: "黄灯", time: 2 },
//   { title: "红灯", time: 5 },
// ]);
console.log('script start')

setTimeout(() => {
    console.log('setTimeout')
}, 0);

new Promise((resolve) => {
    console.log('Promise1')
    setTimeout(() => {
        console.log('promise 2')
    }, 0);
})

Promise.resolve().then(() => {
    console.log('promise3')
}).then(() => {
    console.log('promise4')
})

console.log('script end')