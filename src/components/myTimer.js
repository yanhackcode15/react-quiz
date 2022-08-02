import React from 'react';

export default function myTimer({days, hours, minutes, seconds, isRunning}) {
  return (
    <div className="timer">
      <div>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p className="paddingLeft">{isRunning ? 'Running' : 'Not running'}</p>
      {/* <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button> */}
    </div>
  );
}