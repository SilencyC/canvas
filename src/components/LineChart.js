import React, { useState, useEffect } from 'react';
import { useGetCanvas } from '../useHooks';

const LineChart = (props) => {
  const { option } = props;
  const [allPoint, setAllPoint] = useState([]);
  const [canvas] = useGetCanvas(option);
  const [ctx, setCtx] = useState(null);
  const [lastVal, setLastVal] = useState(null);

  const padding = 50;
  const halving = 7;
  function getCtrlPoint(ps, i, a, b) {
    if (!a || !b) {
      a = 0.2;
      b = 0.2;
    }
    if (i < 1) {
      var pAx = ps[0].x + (ps[1].x - ps[0].x) * a;
      var pAy = ps[0].y + (ps[1].y - ps[0].y) * a;
    } else {
      var pAx = ps[i].x + (ps[i + 1].x - ps[i - 1].x) * a;
      var pAy = ps[i].y + (ps[i + 1].y - ps[i - 1].y) * a;
    }
    if (i > ps.length - 3) {
      var last = ps.length - 1;
      var pBx = ps[last].x - (ps[last].x - ps[last - 1].x) * b;
      var pBy = ps[last].y - (ps[last].y - ps[last - 1].y) * b;
    } else {
      var pBx = ps[i + 1].x - (ps[i + 2].x - ps[i].x) * b;
      var pBy = ps[i + 1].y - (ps[i + 2].y - ps[i].y) * b;
    }
    return {
      pA: { x: pAx, y: pAy },
      pB: { x: pBx, y: pBy },
    };
  }

  const getAllPointPosition = (datas, width, height) => {
    const areaWidth = width - 2 * padding;
    const areaHeight = height - 2 * padding;
    const eachWidth = areaWidth / (datas.length - 1);
    const ox = padding;
    const oy = height - padding;
    let v = JSON.parse(JSON.stringify(datas));
    v.sort((a, b) => a - b);
    const range = v[v.length - 1] - v[0];
    const allPointPositions = datas.map((point, i) => {
      const pointX = ox + i * eachWidth;
      const pointY = oy - (areaHeight * (point - v[0])) / range;
      return {
        x: pointX,
        y: pointY,
        value: point
      };
    });
    return allPointPositions;
  };

  const setAxis = (oPointPosition, datas, width, height, ctx) => {
    const areaWidth = width - 2 * padding;
    const areaHeight = height - 2 * padding;
    let v = JSON.parse(JSON.stringify(datas));
    v.sort((a, b) => a - b);
    const range = v[v.length - 1] - v[0];
    const minRang = v[0];
    const maxRang = v[v.length - 1];

    const axisX = {
      x: width - padding,
      y: height - padding,
    };
    for (let index = 0; index < halving + 1; index++) {
      const labelY = oPointPosition.y - (areaHeight / halving) * index;
      const text =
        index < 7
          ? (minRang + (range / halving) * index).toFixed(2)
          : maxRang.toFixed(2);
      ctx.save();
      ctx.strokeStyle = '#131313';
      ctx.beginPath();
      ctx.moveTo(oPointPosition.x, labelY);
      ctx.lineTo(oPointPosition.x - 10, labelY);
      ctx.textAlign = 'end';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, oPointPosition.x - 15, labelY);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      ctx.strokeStyle = 'rgba(164, 178, 197, 1)';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(oPointPosition.x, labelY);
      ctx.lineTo(axisX.x, labelY);
      ctx.stroke();
    }
  };
  function drawLine(ctx, width, height, allPointPositions) {
    const series = option.series;
    const { data, itemStyle, areaStyle } = series;
    const ox = padding;
    const oy = height - padding;
    const axisY = {
      x: padding,
      y: padding,
    };
    const axisX = {
      x: width - padding,
      y: height - padding,
    };
    ctx.strokeStyle = '#131313';
    ctx.beginPath();
    ctx.moveTo(axisY.x, axisY.y);
    ctx.lineTo(ox, oy);
    ctx.lineTo(axisX.x, axisX.y);
    ctx.lineWidth = 1;
    ctx.stroke();
    setAxis({ x: ox, y: oy }, data, width, height, ctx);
    ctx.save();
    allPointPositions.forEach((p, index) => {
      if (index === 0) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
      } else {
        let ctlP = getCtrlPoint(allPointPositions, index - 1);
        ctx.bezierCurveTo(ctlP.pA.x, ctlP.pA.y, ctlP.pB.x, ctlP.pB.y, p.x, p.y);
      }
    });
    ctx.strokeStyle = itemStyle.color;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.lineTo(axisX.x, axisX.y);
    ctx.lineTo(ox, oy);
    ctx.closePath();
    var gradient = ctx.createLinearGradient(0, 0, 0, oy);
    gradient.addColorStop(0, 'rgba(50,105,255, 0.5)');
    gradient.addColorStop(1, 'rgba(50,105,255, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();
  }

  useEffect(() => {
    if (!canvas) return;
    const width = canvas.width;
    const height = canvas.height;
    const series = option.series;
    const { data, itemStyle, areaStyle } = series;
    const allPointPositions = getAllPointPosition(data, width, height);
    setAllPoint(allPointPositions);
    const ctx = canvas.getContext('2d');
    setCtx(ctx);
    drawLine(ctx, width, height, allPointPositions);
  }, [canvas, option.series]);
  useEffect(() => {
    if (!allPoint.length) return;
    const width = canvas.width;
    const height = canvas.height;
    const getMousePosition = (e) => {
      return {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleMousemove = (e) => {
      const mousePosition = getMousePosition(e);
      const val = allPoint.find(
        (item) => item.x - 3 < mousePosition.x && mousePosition.x < item.x + 3
      );
      if (val && JSON.stringify(val) !== JSON.stringify(lastVal)) {
        ctx.clearRect(0, 0, 800, 600);
        drawLine(ctx, width, height, allPoint);
        ctx.save();
        ctx.fillStyle = '#FAA82F';
        ctx.strokeStyle = '#FAA82F';
        ctx.beginPath();
        ctx.moveTo(val.x, val.y);
        ctx.arc(val.x, val.y, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.fillStyle = '#FFF';
        ctx.strokeStyle = '#FFF';
        ctx.beginPath();
        ctx.moveTo(val.x, val.y);
        ctx.arc(val.x, val.y, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.strokeStyle = '#FAA82F';
        ctx.beginPath();
        ctx.lineTo(val.x, val.y + 2.5);
        ctx.lineTo(val.x, 350);
        ctx.setLineDash([10, 10]);
        ctx.stroke();
        ctx.restore();
        setLastVal(val);
      }
    };

    function handleMouseleave(e) {
      ctx.clearRect(0, 0, 800, 600);
      drawLine(ctx, width, height, allPoint);
      setLastVal(null);
    }

    function addEventHandle(canvas) {
      canvas.addEventListener('mousemove', handleMousemove, false);
      canvas.addEventListener('mouseleave', handleMouseleave, false);
    }
    addEventHandle(canvas);
    return () => {
      canvas.removeEventListener('mousemove', handleMousemove);
    };
  }, [allPoint, lastVal]);

  return (
    <div>
      <canvas
        id={option.canvas.id}
        width="600"
        height="400"
        style={{ width: '600px', height: '400px' }}
      ></canvas>
    </div>
  );
};

export default LineChart;
