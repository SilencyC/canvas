import React from 'react';
import LineChart from './LineChart';

const Com = () => {
  // const [datas, setDatas] = useState([]);
  const data = [Math.random() * 300];
  for (var i = 1; i < 20; i++) {
    //按照echarts
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
  }
  const option = {
    canvas: {
      id: 'canvas',
    },
    series: {
      name: '模拟数据',
      itemStyle: {
        color: 'rgb(50,105,255)',
      },
      areaStyle: {
        color: 'rgb(255, 158, 68)',
      },
      data: data,
    },
  };
  return (
    <div>
      <LineChart option={option}></LineChart>
    </div>
  );
};

export default Com;
