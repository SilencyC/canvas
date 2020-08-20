import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';
import Pie from './Pie';
import DoughnutChart from './DoughnutChart';
import DoughnutChartHover from './DoughnutChartHover'

const Com = () => {
  const [doughnutData] = useState([
    {
      title: 'UBS-CH',
      percent: 0.4599,
      color: '#F85F5F',
    },
    {
      title: 'JP Morgan-SG',
      percent: 0.1771,
      color: '#CC715E',
    },
    {
      title: 'VP Bank-LI',
      percent: 0.1105,
      color: '#803EEE',
    },
    {
      title: 'Julius Baer-HK',
      percent: 0.0747,
      color: '#6B87C8',
    },
    {
      title: 'UBP Bank-CH',
      percent: 0.0616,
      color: '#5FA8F1',
    },
    {
      title: 'UBP Bank-SG',
      percent: 0.0434,
      color: '#49CB98',
    },
    {
      title: 'UBP Bank-HK',
      percent: 0.0396,
      color: '#49CBC4',
    },
    {
      title: 'Credit Suisse-HK',
      percent: 0.0059,
      color: '#7480F4',
    },
    {
      title: 'Julius Baer-CH',
      percent: 0.0049,
      color: '#F8784C',
    },
    {
      title: 'VP Bank-CH',
      percent: 0.0026,
      color: '#F8C677',
    },
  ]);

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

  useEffect(() => {
    // const id = setTimeout(() => {
    //   setDoughnutData(doughnutData.slice(1))
    //   // DoughnutData = DoughnutData.slice(1);
    //   console.log('setTimeout');
    // }, 3000);
    // return () => {
    //   clearInterval(id);
    // };
  }, []);
  return (
    <div>
      <LineChart option={option}></LineChart>
      <Pie data={pieData} width={'600'} height={'400'}></Pie>
      <DoughnutChart
        data={doughnutData}
        width={'700'}
        height={'400'}
        rang={40}
      ></DoughnutChart>
      <DoughnutChartHover
        data={doughnutData}
        width={'700'}
        height={'400'}
        rang={40}
      ></DoughnutChartHover>
    </div>
  );
};

export default Com;
