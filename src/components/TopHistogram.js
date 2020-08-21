import React, { useEffect, useState } from 'react';
import { toLocaleString } from '../helper';
import _ from 'lodash';

const TopHistogram = (props) => {
  const { width, height, padding, part, data } = props;
  const [canvas, setcanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(null);
  const [canvasHeight, setCanvasHeight] = useState(null);
  const [axisRang, setAxisRang] = useState(0);
  const [axisMax, setAxisMax] = useState(0);
  const [axisPlusRange, setAxisPlusRange] = useState(0);

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
      setAxisPlusRange(plusRange);
    } catch (error) {
      throw error;
    }
  }, [data, part]);

  useEffect(() => {
    if (!canvas) return;
    const rangeHeight = (canvasHeight - padding.top - padding.bottom) / part;
    const centerPosition = {
      x: padding.left,
      y: padding.top + axisPlusRange * rangeHeight,
    };
    for (let index = 0; index < part + 1; index++) {
      const y = padding.top + index * rangeHeight;
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
      ctx.restore();
    }

    let left = 0;
    data.forEach((item, index) => {
      left = left + 90 + (index ? 20 : 0);
      const { accounts } = item;
      let plusLastPosition = centerPosition;
      let minusLastPosition = centerPosition;
      let plusNumber = 0;
      let minusNumber = 0;

      function draw(account, color, lastPosition) {
        const newLastPosition = JSON.parse(JSON.stringify(lastPosition));
        const position = getHeight(
          account,
          axisRang,
          rangeHeight,
          newLastPosition
        );
        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(left + lastPosition.x, lastPosition.y);
        ctx.lineTo(left + position.x, position.y);
        ctx.lineTo(left + position.x + 20, position.y);
        ctx.lineTo(left + position.x + 20, lastPosition.y);
        ctx.lineTo(left + lastPosition.x, lastPosition.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        return position;
      }

      types().forEach((el, index) => {
        const { account, color } = accounts[index];
        if (account > 0) {
          if (plusNumber === 0) {
            plusLastPosition = centerPosition;
          }
          const position = draw(account, color, plusLastPosition);
          plusLastPosition = position;
          plusNumber++;
        } else {
          if (minusNumber === 0) {
            minusLastPosition = centerPosition;
          }
          const position = draw(account, color, minusLastPosition);
          minusLastPosition = position;
          minusNumber++;
        }
      });
    });
    function getHeight(account, range, rangeHeight, newLastPosition) {
      const { x, y } = newLastPosition;
      const height = (rangeHeight / range) * account;
      return {
        x,
        y: y - height,
      };
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
    axisPlusRange,
    data,
  ]);

  return (
    <div>
      <canvas id="top-histogram" width={width} height={height}></canvas>
    </div>
  );
};

export default TopHistogram;

const types = () => {
  return ['equities', 'bonds', 'funds', 'liquidity', 'others', 'liabilities'];
};
