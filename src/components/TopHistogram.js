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
      // console.log('data::', data);
      data.forEach((item) => {
        const { accounts } = item;
        let accountArr = [];
        accounts.forEach((el) => {
          if (isNaN(el.account * 1)) {
            return;
          } else {
            accountArr.push(el.account * 1);
          }
        });
        allAccounts = _.concat(allAccounts, accountArr);
      });
      if (allAccounts.length < 30) return;
      // console.log('allAccounts::', allAccounts);
      const maxAccount = _.max(allAccounts);
      const minAccount = _.min(allAccounts);
      // console.log('maxAccount::', maxAccount);
      // console.log('minAccount::', minAccount);
    } catch (error) {
      throw error;
    }
  }, [data]);

  useEffect(() => {
    if (!canvas) return;
    const range = (canvasHeight - padding.top - padding.bottom) / part;
    // const centerPosition = {
    //   x: padding.left,
    //   y: canvasHeight - padding.bottom - 2 * range,
    // };

    for (let index = 0; index < part + 1; index++) {
      const y = canvasHeight - padding.bottom - index * range;
      let text = toLocaleString(-400000000 + index * 200000000);
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
  }, [canvas, ctx, canvasWidth, canvasHeight, padding, part]);

  return (
    <div>
      <canvas id="top-histogram" width={width} height={height}></canvas>
    </div>
  );
};

export default TopHistogram;
