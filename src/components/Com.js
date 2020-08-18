import React from 'react';
import LineChart from './LineChart';
import Pie from './Pie';

const Com = () => {
  // const [datas, setDatas] = useState([]);
  const data = [Math.random() * 300];
  for (var i = 1; i < 20; i++) {
    //按照echarts
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
  }
  const option = {
    canvas: {
      id: 'canvas-line',
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

  const pieData = [
    {
      name: 'UBS CH',
      percent: 0.87,
      color: '#F8C677',
    },
    {
      name: 'LGT SG',
      percent: 0.75,
      color: '#F8784C',
    },
    {
      name: 'UOB HK',
      percent: 0.65,
      color: '#E93D75',
    },
    {
      name: 'VP LI',
      percent: 0.54,
      color: '#803EEE',
    },
    {
      name: 'JB Hk',
      percent: 0.32,
      color: '#08C7BA',
    },
  ];
  return (
    <div>
      <LineChart option={option}></LineChart>
      <Pie data={pieData} width={'600'} height={'400'}></Pie>
    </div>
  );
};

export default Com;
