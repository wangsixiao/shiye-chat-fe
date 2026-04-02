/**
 * ios 安卓键盘弹起获取视口高度
 * 键盘弹起，输入框未被弹起问题
 */
import { useEffect, useRef, useState } from "react";

export default function () {
  const inputRef = useRef();
  const [bot, setBot] = useState(0);

  useEffect(() => {
    console.log("useeffect", bot);
    return () => {
      console.log("return useeffect", bot);
    };
    // setInterval(() => {
    //   const h = inputRef.current?.getBoundingClientRect?.()?.bottom?.toFixed(2)
    //   const visual = window.visualViewport?.height?.toFixed(2)
    //   const inner = window.innerHeight
    //   setBot(`h：${h} / visual: ${visual} / inner: ${inner}`)
    // }, 1*1000);
  }, [bot]);
  return (
    <div className="input-div" ref={inputRef}>
      {/* {bot} */}
      <div
        onClick={() => {
          setBot(bot + 1);
        }}
      >
        +
      </div>
      <input />
    </div>
  );
}
