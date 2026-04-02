/**
 * 打字机效果
 */

import { useEffect, useCallback, useRef, useState } from "react";

export default function () {
  const [text, setText] = useState("");
  const [inputText, setInputText] = useState("");
  const timerRef = useRef();
  const content =
    "哈哈哈哈Help me create this skill for Cursor: 如果要添加一个组件，需要支持pc和移动端，规则参考现有项目";

  const handleClear = () => {
    timerRef.current && clearTimeout(timerRef.current);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prev) => {
        if (prev.length >= content.length) {
          clearInterval(interval);
          return prev;
        }
        const nextLength = Math.min(prev.length + 5, content.length);
        return content.slice(0, nextLength);
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handlePrintText = useCallback(() => {
    console.log('inputText', inputText)
    setTimeout(() => {
      console.log(inputText);
    }, 3000);
  }, [inputText]);

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <button onClick={handlePrintText}>打印</button>
      {text} <div onClick={handleClear}>stop</div>
    </div>
  );
}
