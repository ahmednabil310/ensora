var parent5 = d3.select('#flowers-fan');
const data5 = [
  {
    name: 'on/off',
    values: [
      {
        endDate: '2021/7/16',
        startDate: '2021/7/12',
        state: 'off',
      },
      {
        endDate: '2021/7/28',
        startDate: '2021/7/16',
        state: 'on',
      },
      {
        endDate: '2021/7/30 12:00',
        startDate: '2021/7/28',
        state: 'off',
      },
      {
        endDate: '2021/8/2',
        startDate: '2021/7/30 12:00',
        state: 'on',
      },
      {
        endDate: '2021/8/5',
        startDate: '2021/8/2',
        state: 'off',
      },
    ],
  },
  {
    name: 'auto/override',
    values: [
      {
        endDate: '2021/7/21',
        startDate: '2021/7/12',
        state: 'override',
      },
      {
        endDate: '2021/8/5',
        startDate: '2021/7/21',
        state: 'auto',
      },
    ],
  },
];
drawGraph(parent5, data5);
d3.select(window).on('resize.Flowers', () => drawGraph(parent5, data5));