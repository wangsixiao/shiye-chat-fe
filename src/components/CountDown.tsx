import { useState,useEffect, useRef } from "react"


/** 实现倒计时hook封装 */
function useCountDown(props){
  const [val, setVal] = useState();
  const {targetDate, onEnd} = props;
  const intervalRef = useRef();

  const intervalFn = () => {
    intervalRef.current = setInterval(() => {
      setVal((pre) => {
        console.log(pre)
        if(pre <= 0) {
          onEnd?.()
          clearInterval(intervalRef.current)
          return 0
        }
        return  pre - 1000;
      })
    }, 1000)
  }

  useEffect(() => {
    if(intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if(targetDate) {
      const initVal = targetDate - Date.now()
      setVal(initVal)
      intervalFn()
    }else{
      setVal(0);
    }
    return () => {
      if(intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [targetDate])
  
  return [val]
}

const App = () => {
  const [targetDate, setTargetDate] = useState()
  
  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      console.log('end')
    }
  })
  
  return (
    <div >
      <button
        onClick={() => {
          setTargetDate(Date.now() + 5000);
        }}
        disabled={countdown !== 0}
      >
        {countdown === 0 ? 'Start Interval' : `Reset After ${Math.round(countdown / 1000)}s`}
      </button>
      <div>{countdown}</div>
      <button
        onClick={() => {
          setTargetDate(undefined);
        }}
        style={{ marginLeft: 8 }}
      >
        stop
      </button>
    </div>
  )
}

export default App