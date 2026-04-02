import { useEffect, useState } from "react";

export default function MemoryFun() {
    const [val, setVal] = useState(0)
  let res = [];
  useEffect(() => {
    console.log("MemoryFun");
  }, []);
  const fn1 = () => {
    let a = new Array(10000); // 这里设置了一个很大的数组对象
    let b = 3;
    function fn2() {
      let c = [1, 2, 3];
    }
    fn2();
    return a;
  };
  const myClick = () => {
    res.push(fn1());
  };

  const myClick2 = () => {
    // setInterval(() => {
    //     setVal(val => val+1)
    // }, 1000);
  }
  return (
    <div>
      <button onClick={myClick}>执行fn1函数</button>
      <button onClick={myClick2}>执行fn2函数{val}</button>
    </div>
  );
}
