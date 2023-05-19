import React, { useEffect, useRef } from 'react';
import { initFluidAnimation } from './js/script.js';


const Fluid = () => {
  const canvasRef = useRef();

  useEffect(() => {
    if (canvasRef.current) {
      initFluidAnimation(canvasRef.current);
    }
  }, [canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      className="fluid-canvas"
      style={{
        color: 'white',
        height: '100%',
        width: '100%',
        margin: 0,
        position: 'absolute',
      }}
    />
  );
};

export default Fluid;
