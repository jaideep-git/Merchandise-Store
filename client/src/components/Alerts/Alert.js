import React, { useEffect, useState } from 'react';
import './Alert.css'

const Alert = (props) => {
  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  const handleStartTimer = () => {
    const id = setInterval(() => {
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

  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

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

  React.useEffect(() => {
    if (width === 100) {
      // Close Alert
      handleCloseAlert()
    }
  }, [width])

  React.useEffect(() => {
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
