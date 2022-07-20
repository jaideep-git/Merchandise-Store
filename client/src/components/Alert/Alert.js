import React, { useEffect, useState } from 'react';
import './Alert.css'

const Alert = (props) => {
    const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  // * Starts Alert Timer
  const handleStartTimer = () => {
    const id = setInterval(() => {
      // Changes bar width
      setWidth(prev => {
        if (prev < 100) {
          return prev + 0.5;
        }

        clearInterval(id);
        return prev;
      });
    }, 20);

    setIntervalID(id);
  };

  // * Pauses Alert Timer
  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  // * Removes Alert From the Dom
  const handleCloseAlert = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      props.dispatch({
        type: "REMOVE_ALERT",
        id: props.id
      })
    }, 400)
  };

  useEffect(() => {
    if (width === 100) {
      handleCloseAlert()
    }
  }, [width])

  useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification-item error ${exit ? 'exit' : '' }`} >
      <p>{props.error}</p>
    
      <div className={"bar"} style={{ width: `${width}%` }} />
    </div>
  )
}

export default Alert