import React, { useEffect, useState } from 'react';
import { toLocaleString } from '../helper';
import _ from 'lodash';

const TopHistogram = (props) => {
  const { width, height, padding, part, data } = props;
  // console.log(data);
  const [canvas, setcanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(null);
  const [canvasHeight, setCanvasHeight] = useState(null);
  const [axisRang, setAxisRang] = useState(0);
  const [axisMax, setAxisMax] = useState(0);

  useEffect(() => {
    const cvs = document.getElementById('top-histogram');
    const ctx = cvs.getContext('2d');

    setcanvas(cvs);
    setCtx(ctx);
    setCanvasWidth(cvs.width);
    setCanvasHeight(cvs.height);
  }, []);

  useEffect(() => {
    try {
      let allAccounts = [];
      console.log(data);
      data.forEach((item) => {
        const { accounts } = item;
        let plusTotal = 0;
        let minusTotal = 0;
        accounts.forEach((el) => {
          const { account } = el;
          if (account * 1 > 0) {
            plusTotal += account * 1;
          } else {
            minusTotal += account * 1;
          }
        });
        allAccounts.push(plusTotal);
        allAccounts.push(minusTotal);
      });
      const maxAccount = _.max(allAccounts);
      const minAccount = _.min(allAccounts);
      let range = Math.ceil(
        (maxAccount - minAccount) / (maxAccount || minAccount ? part - 1 : part)
      );
      const plusRange = Math.ceil(maxAccount / range);
      setAxisMax(range * plusRange);
      setAxisRang(range);
    } catch (error) {
      throw error;
    }
  }, [data, part]);

  useEffect(() => {
    if (!canvas) return;
    const range = (canvasHeight - padding.top - padding.bottom) / part;
    // const centerPosition = {
    //   x: padding.left,
    //   y: canvasHeight - padding.bottom - 2 * range,
    // };

    for (let index = 0; index < part + 1; index++) {
      const y = padding.top + index * range;
      let text = toLocaleString(axisMax - index * axisRang);
      if (text === '0.00') {
        text = '0';
      }
      const startPoint = {
        x: padding.left,
        y,
      };
      const endPoint = {
        x: canvasWidth - padding.right,
        y,
      };
      ctx.save();
      ctx.setLineDash([10, 15]);
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = '#a4b2c5';
      ctx.fillStyle = '#a4b2c5';
      ctx.font = '14px PingFang';
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.textAlign = 'end';
      ctx.textBaseline = 'middle';
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.fillText(text, startPoint.x - 15, startPoint.y);
      ctx.stroke();
    }
  }, [
    canvas,
    ctx,
    canvasWidth,
    canvasHeight,
    padding,
    part,
    axisRang,
    axisMax,
  ]);

  return (
    <div>
      <canvas id="top-histogram" width={width} height={height}></canvas>
    </div>
  );
};

export default TopHistogram;
