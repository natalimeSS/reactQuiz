import React, {useState, useRef}  from 'react';

const Test = () => {
    const [count, setCount] = useState(0);
    const currentTime = useRef(count);

    const startCount = () => {
        currentTime.current = setInterval(() => {
            setCount((count) => count + 1)
        }, 1000)
    };

    const stopCount = () => {
        clearInterval(currentTime.current)
    };

    return(
      <>
        <div>{count}</div>
        <button onClick={startCount}>Start</button>
        <button onClick={stopCount}>Stop</button>
      </>
    )
};

export default Test;