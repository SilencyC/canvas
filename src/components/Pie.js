import React, { useState, useEffect } from 'react';

const Pie = (props) => {
  const { data, width, height } = props;
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [cnavasWidth, setCnavasWidth] = useState(null);
  const [cnavasHeight, setCnavasHeight] = useState(null);
  const [padding, setPadding] = useState(null);
  const [radius, setRadius] = useState(null);

  useEffect(() => {
    const cvs = document.getElementById('canvas');
    const ctx = cvs.getContext('2d');
    const width = cvs.width;
    const height = cvs.height;

    setCanvas(cvs);
    setCtx(ctx);
    setCnavasWidth(width);
    setCnavasHeight(height);
    setPadding(20);
    setRadius((cvs.height - 2 * padding) / 2 - 20);
  }, [data, width, height, padding]);

  useEffect(() => {
    if (!canvas) return;
    const oPoint = {
      x: cnavasWidth / 2,
      y: cnavasHeight / 2,
    };
    const startAngle = 1.5 * Math.PI;
    let endAngle = 1.5 * Math.PI;
    const rangWidth = 20;
    const rang = 10;

    data.forEach((item, index) => {
      let { percent } = item;
      percent = percent / 1;
      endAngle = startAngle - percent * 2 * Math.PI;

      //1
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(oPoint.x, oPoint.y);
      ctx.arc(
        oPoint.x,
        oPoint.y,
        radius - index * (rangWidth + rang),
        startAngle,
        endAngle,
        true
      );
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.strokeStyle = '#fff';
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      //2
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(oPoint.x, oPoint.y);
      ctx.arc(
        oPoint.x,
        oPoint.y,
        radius - index * (rangWidth + rang) - rangWidth,
        startAngle,
        endAngle,
        true
      );
      ctx.closePath();
      ctx.fillStyle = '#FFF';
      // ctx.lineWidth = 10;
      ctx.strokeStyle = '#FFF';
      ctx.stroke();
      ctx.fill();
      ctx.restore();

      const endPoint = {
        x:
          oPoint.x +
          (radius - index * (rangWidth + rang) - rangWidth / 2) *
            Math.sin(endAngle - startAngle),
        y:
          oPoint.y -
          (radius - index * (rangWidth + rang) - rangWidth / 2) *
            Math.cos(endAngle - startAngle),
      };
      ctx.save();
      ctx.beginPath();
      ctx.arc(endPoint.x, endPoint.y, rangWidth / 2 - 1, 0, 2 * Math.PI, true);
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.restore();
    });
  }, [canvas]);

  return (
    <div>
      <canvas id="canvas" width={width} height={height}></canvas>
    </div>
  );
};

export default Pie;
