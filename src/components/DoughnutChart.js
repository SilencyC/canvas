import React, { useState, useEffect } from 'react';

const DoughnutChart = (props) => {
  const { data, width, height, rang } = props;
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(null);
  const [canvasHeight, setCanvasHeight] = useState(null);
  const [padding] = useState(20);
  const [dataOfHandle, setDataOfHandle] = useState([]);

  useEffect(() => {
    const cvs = document.getElementById('doughnut-canvas');
    const ctx = cvs.getContext('2d');
    const width = cvs.width;
    const height = cvs.height;
    setCanvas(cvs);
    setCtx(ctx);
    setCanvasWidth(width);
    setCanvasHeight(height);
  }, []);

  useEffect(() => {
    const total = data.reduce((pre, current) => {
      return pre + Math.abs(current.percent);
    }, 0);
    let newData = data.map((item) => {
      const percent = (item.percent / total).toFixed(4) * 1;
      return {
        ...item,
        percent,
      };
    });
    newData.sort((a, b) => a.percent - b.percent);
    setDataOfHandle(newData);
  }, [data]);

  useEffect(() => {
    if (!canvas || !dataOfHandle.length) return;
    const centerPosition = {
      x: canvasWidth / 2,
      y: canvasHeight / 2,
    };
    let startAngle = -0.5 * Math.PI;
    let endAngle = startAngle;

    const mixDistance = canvasHeight > canvasWidth ? canvasWidth : canvasHeight;
    const radius = (mixDistance - 2 * padding) / 2 - 2 * rang - 10;
    let lastHalfOutPositionY = null;
    let lastSing = 1;

    dataOfHandle.forEach((item, index) => {
      endAngle = endAngle + item.percent * 2 * Math.PI;
      const startPosition = {
        x: centerPosition.x + radius * Math.cos(startAngle),
        y: centerPosition.y + radius * Math.sin(startAngle),
      };
      const startOutPosition = {
        x: centerPosition.x + (radius + rang) * Math.cos(startAngle),
        y: centerPosition.y + (radius + rang) * Math.sin(startAngle),
      };
      const endPosition = {
        x: centerPosition.x + radius * Math.cos(endAngle),
        y: centerPosition.y + radius * Math.sin(endAngle),
      };

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(startPosition.x, startPosition.y);
      ctx.lineTo(startOutPosition.x, startOutPosition.y);
      ctx.arc(
        centerPosition.x,
        centerPosition.y,
        radius + rang,
        startAngle,
        endAngle
      );
      ctx.lineTo(endPosition.x, endPosition.y);
      ctx.arc(
        centerPosition.x,
        centerPosition.y,
        radius,
        endAngle,
        startAngle,
        true
      );

      ctx.fillStyle = item.color;
      ctx.strokeStyle = item.color;
      ctx.fill();
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
      let sing = 1;

      function drawLine() {
        const half = endAngle - (endAngle - startAngle) / 2;
        if (half > 0.5 * Math.PI && half < 1.5 * Math.PI) {
          sing = -1;
        } else {
          sing = 1;
        }
        const halfPosition = {
          x: centerPosition.x + (radius + rang) * Math.cos(half),
          y: centerPosition.y + (radius + rang) * Math.sin(half),
        };
        let halfOutPosition = {
          x: centerPosition.x + (radius + rang + 20) * Math.cos(half),
          y: centerPosition.y + (radius + rang + 20) * Math.sin(half),
        };
        if (
          lastHalfOutPositionY &&
          sing * (halfOutPosition.y - lastHalfOutPositionY) < 15 &&
          lastSing === sing
        ) {
          const newRadius = radius + rang + 20;
          const newAngle = Math.acos(
            (lastHalfOutPositionY + 15 * sing - centerPosition.y) / newRadius
          );
          let x = null;
          if (isNaN(newAngle)) {
            x = halfOutPosition.x;
          } else {
            x = centerPosition.x + sing * newRadius * Math.sin(newAngle);
          }
          halfOutPosition = {
            x,
            y: lastHalfOutPositionY + 15 * sing,
          };
        }
        const title = item.title + ' ' + (item.percent * 100).toFixed(2) + '%';
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(halfPosition.x, halfPosition.y);
        ctx.lineTo(halfOutPosition.x, halfOutPosition.y);
        ctx.lineTo(halfOutPosition.x + sing * 20, halfOutPosition.y);
        ctx.textBaseline = 'middle';
        ctx.textAlign = sing < 0 ? 'end' : 'start';
        ctx.strokeStyle = item.color;
        ctx.fillStyle = item.color;
        ctx.font = '400 14px serif';
        ctx.fillText(title, halfOutPosition.x + sing * 25, halfOutPosition.y);
        ctx.stroke();
        ctx.restore();
        lastHalfOutPositionY = halfOutPosition.y;
        lastSing = sing;
      }

      drawLine();
      startAngle = endAngle;
    });
  }, [canvas, ctx, canvasHeight, canvasWidth, padding, dataOfHandle, rang]);

  return (
    <div>
      <canvas id="doughnut-canvas" width={width} height={height}></canvas>
    </div>
  );
};

export default DoughnutChart;
