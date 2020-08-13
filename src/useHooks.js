import { useState, useEffect } from 'react';

export const useGetCanvas = (option) => {
  const [canvas, setCanvas] = useState(null);
  useEffect(() => {
    const canvas = document.getElementById(option.canvas.id);
    setCanvas(canvas);
  }, [option]);
  return [canvas];
};
