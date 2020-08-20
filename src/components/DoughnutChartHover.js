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
    const cvs = document.getElementById('doughnut-chart-hover');
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
    let radius = (mixDistance - 2 * padding) / 2 - 2 * rang - 10;

    let index = null;
    let newRadius = radius;
    let newRang = rang;
    function judgment(point, circle, r, outR, data) {
      if (r === 0) return false;
      const dx = circle.x - point.x;
      const dy = circle.y - point.y;
      const distance = dx * dx + dy * dy;
      if (distance > r * r && distance < outR * outR) {
        // 获取鼠标输在区域的下标
        function getIndex(data, angle) {
          let i = null;
          let startAngle = -0.5 * Math.PI;
          let endAngle = startAngle;
          data.forEach((item, index) => {
            endAngle = endAngle + item.percent * 2 * Math.PI;
            if (angle > startAngle && angle < endAngle) {
              i = index;
            }
            startAngle = endAngle;
          });
          return i;
        }

        function cnap(indexVal) {
          if (indexVal !== index) {
            if (newRadius !== radius) {
              newRadius = radius;
              newRang = rang;
              return;
            }
            index = indexVal;   
            drawPie(index);
          } else {
            newRadius = radius - 10;
            newRang = rang + 20;
          }
        }

        //计算鼠标在每个象限上时处在哪一块区域
        if (point.x - circle.x > 0 && point.y - circle.y < 0) {
          //第一象限
          const angle =
            Math.atan((point.x - circle.x) / (circle.y - point.y)) -
            0.5 * Math.PI;
          const indexVal = getIndex(data, angle);
          cnap(indexVal);
        } else if (point.x - circle.x > 0 && point.y - circle.y > 0) {
          //第二象限
          const angle = Math.atan((point.y - circle.y) / (point.x - circle.x));
          const indexVal = getIndex(data, angle);
          cnap(indexVal);
        } else if (point.x - circle.x < 0 && point.y - circle.y > 0) {
          //第三象限
          const angle =
            Math.atan((circle.x - point.x) / (point.y - circle.y)) +
            0.5 * Math.PI;
          const indexVal = getIndex(data, angle);
          cnap(indexVal);
        } else if (point.x - circle.x < 0 && point.y - circle.y < 0) {
          //第四象限
          const angle =
            Math.atan((circle.y - point.y) / (circle.x - point.x)) + Math.PI;
          const indexVal = getIndex(data, angle);
          cnap(indexVal);
        }
      } else {
        if (index === null) return;
        newRadius = radius;
        newRang = rang;
        drawPie();
        index = null;
      }
    }

    canvas.addEventListener('mousemove', handleMousemove, false);

    function handleMousemove(e) {
      const mousePosition = {
        x: e.offsetX,
        y: e.offsetY,
      };

      // if (index === null) {
      //   newRadius = radius;
      //   newRang = rang;
      // } else {
      //   newRadius = radius - 10;
      //   newRang = rang + 20;
      // }
      judgment(
        mousePosition,
        centerPosition,
        newRadius,
        newRadius + newRang,
        dataOfHandle
      );
    }
    function drawPie(i) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      let newRang = rang;
      let newRadius = radius;
      dataOfHandle.forEach((item, index) => {
        endAngle = endAngle + item.percent * 2 * Math.PI;
        if (i === index) {
          newRadius = newRadius - 10;
          newRang = newRang + 20;
        } else {
          newRang = rang;
          newRadius = radius;
        }
        const startPosition = {
          x: centerPosition.x + newRadius * Math.cos(startAngle),
          y: centerPosition.y + newRadius * Math.sin(startAngle),
        };
        const startOutPosition = {
          x: centerPosition.x + (newRadius + newRang) * Math.cos(startAngle),
          y: centerPosition.y + (newRadius + newRang) * Math.sin(startAngle),
        };
        const endPosition = {
          x: centerPosition.x + newRadius * Math.cos(endAngle),
          y: centerPosition.y + newRadius * Math.sin(endAngle),
        };

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(startPosition.x, startPosition.y);
        ctx.lineTo(startOutPosition.x, startOutPosition.y);
        ctx.arc(
          centerPosition.x,
          centerPosition.y,
          newRadius + newRang,
          startAngle,
          endAngle
        );
        ctx.lineTo(endPosition.x, endPosition.y);
        ctx.arc(
          centerPosition.x,
          centerPosition.y,
          newRadius,
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
        startAngle = endAngle;
      });
    }
    drawPie();
    return () => {
      canvas.removeEventListener('mousemove', handleMousemove);
    };
  }, [canvas, ctx, canvasHeight, canvasWidth, padding, dataOfHandle, rang]);

  return (
    <div>
      <canvas id="doughnut-chart-hover" width={width} height={height}></canvas>
    </div>
  );
};

export default DoughnutChart;
