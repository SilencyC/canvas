import { useState, useEffect } from 'react';

export const useLinearGradient = (option, canvas) => {
  const [ctx, setCtx] = useState(null);
  const [width, setWidth] = useState(null);
  useEffect(() => {
    if(!canvas) return;
    setCtx(canvas.getContext('2d'));
    setWidth(canvas.width);
  }, [canvas]);
  return [ctx, width];
};
