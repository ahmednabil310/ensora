var parent1 = d3.select('#herbs-fan');
const data1 = [
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
drawGraph(parent1, data1);
d3.select(window).on('resize.herbs', () => drawGraph(parent1, data1));
