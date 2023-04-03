import React, { useState, useEffect } from 'react';

const TypewriterComp = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [stopTyping, setStopTyping] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (!stopTyping) {
        setDisplayText(text.substring(0, currentIndex + 1));
        currentIndex++;
        if (currentIndex === text.length) {
          clearInterval(interval);
        }
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [text, stopTyping]);

  return (
    <div>
      <span>{displayText}</span>
    </div>
  );
};

export default TypewriterComp;
