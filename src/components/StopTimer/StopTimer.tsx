import React, { useState, forwardRef, useImperativeHandle } from 'react';

const Stopwatch = forwardRef((props, ref) => {
  const [seconds, setSeconds] = useState(0);
  const [running, setrunning] = useState(false);

  useImperativeHandle(ref, () => ({
    start() {
      if (!running) {
        setInterval(() => {
          setSeconds((timer) => timer + 1);
        }, 1000);
      }
    },

    stop() {
      setrunning(true);
    },

    reset() {
      setSeconds(0);
    },

    currentValue() {
      return seconds.toString();
    },
  }));

  return <></>;
});

export default Stopwatch;
