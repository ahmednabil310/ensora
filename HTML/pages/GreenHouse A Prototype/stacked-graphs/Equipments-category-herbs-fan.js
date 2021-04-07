var parent6 = d3.select('#herbs-fan');
const data6 = [
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
drawGraph(parent6, data6);
d3.select(window).on('resize.herbs', () => drawGraph(parent6, data6));
