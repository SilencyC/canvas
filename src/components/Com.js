import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';
import Pie from './Pie';
import DoughnutChart from './DoughnutChart';
import DoughnutChartHover from './DoughnutChartHover';
import TopHistogram from './TopHistogram';

const Com = () => {
  const [doughnutData] = useState([
    {
      title: 'UBS-CH',
      percent: 0.4599,
      color: '#49CB98',
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
      color: '#F85F5F',
    },
    {
      title: 'UBP Bank-HK',
      percent: 0.0396,
      color: '#49CBC4',
    },
    {
      title: 'Credit Suisse-HK',
      percent: 0.0349,
      color: '#7480F4',
    },
    {
      title: 'Julius Baer-CH',
      percent: 0.0449,
      color: '#F8784C',
    },
    {
      title: 'VP Bank-CH',
      percent: 0.0326,
      color: '#F8C677',
    },
  ]);

  const [topHistogrram] = useState([
    {
      name: 'Account1',
      accounts: [
        {
          name: 'equities',
          account: '24232234',
          color: '#49CB98',
        },
        {
          name: 'bonds',
          account: '2423223',
          color: '#CC715E',
        },
        {
          name: 'funds',
          account: '64232234',
          color: '#803EEE',
        },
        {
          name: 'liquidity',
          account: '6232234',
          color: '#F8784C',
        },
        {
          name: 'others',
          account: '9232234',
          color: '#F8C677',
        },
        {
          name: 'liabilities',
          account: '-9232234',
          color: '#7480F4',
        },
      ],
    },
    {
      name: 'Account2',
      accounts: [
        {
          name: 'equities',
          account: '5342340',
          color: '#49CB98',
        },
        {
          name: 'bonds',
          account: '6756756',
          color: '#CC715E',
        },
        {
          name: 'funds',
          account: '87978965',
          color: '#803EEE',
        },
        {
          name: 'liquidity',
          account: '3454650',
          color: '#F8784C',
        },
        {
          name: 'others',
          account: '5645456',
          color: '#F8C677',
        },
        {
          name: 'liabilities',
          account: '-34534534',
          color: '#7480F4',
        },
      ],
    },
    {
      name: 'Account3',
      accounts: [
        {
          name: 'equities',
          account: '24232234',
          color: '#49CB98',
        },
        {
          name: 'bonds',
          account: '2423223',
          color: '#CC715E',
        },
        {
          name: 'funds',
          account: '64232234',
          color: '#803EEE',
        },
        {
          name: 'liquidity',
          account: '23123123',
          color: '#F8784C',
        },
        {
          name: 'others',
          account: '9232234',
          color: '#F8C677',
        },
        {
          name: 'liabilities',
          account: '-9232234',
          color: '#7480F4',
        },
      ],
    },
    {
      name: 'Account4',
      accounts: [
        {
          name: 'equities',
          account: '24232234',
          color: '#49CB98',
        },
        {
          name: 'bonds',
          account: '2423223',
          color: '#CC715E',
        },
        {
          name: 'funds',
          account: '64232234',
          color: '#803EEE',
        },
        {
          name: 'liquidity',
          account: '6232234',
          color: '#F8784C',
        },
        {
          name: 'others',
          account: '9232234',
          color: '#F8C677',
        },
        {
          name: 'liabilities',
          account: '-9232234',
          color: '#7480F4',
        },
      ],
    },
    {
      name: 'Account5',
      accounts: [
        {
          name: 'equities',
          account: '24232234',
          color: '#49CB98',
        },
        {
          name: 'bonds',
          account: '2423223',
          color: '#CC715E',
        },
        {
          name: 'funds',
          account: '64232234',
          color: '#803EEE',
        },
        {
          name: 'liquidity',
          account: '6232234',
          color: '#F8784C',
        },
        {
          name: 'others',
          account: '9232234',
          color: '#F8C677',
        },
        {
          name: 'liabilities',
          account: '-9232234',
          color: '#7480F4',
        },
      ],
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
      <TopHistogram
        data={topHistogrram}
        width={'800'}
        height={'420'}
        padding={{ top: 15, right: 0, bottom: 50, left: 150 }}
        part={7}
      ></TopHistogram>
    </div>
  );
};

export default Com;
