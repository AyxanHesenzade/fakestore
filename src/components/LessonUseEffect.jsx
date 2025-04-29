import React, { useState, useEffect } from 'react';

function LessonUseEffect() {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log('state güncellendi');

    // const interval = setInterval(() => {
    //   setNumber((n) => n + 1);
    // }, );

    
    // return () => clearInterval(interval);
  }, []); 

  return (
    <div>
      {number}
      <button onClick={() => setNumber(number + 1)}>Click</button>
    </div>
  );
}

export default LessonUseEffect;
