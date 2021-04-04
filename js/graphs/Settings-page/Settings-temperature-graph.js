var parent2 = d3.select('#temperature-graph');
const data2 = [
  {
    date: '2021-07-13T12:00:00.000Z',
    value: 27.5,
  },
  {
    date: '2021-07-14T00:00:00.000Z',
    value: 30,
  },
  {
    date: '2021-07-25T00:00:00.000Z',
    value: 40,
  },
  {
    date: '2021-07-26T00:00:00.000Z',
    value: 15,
  },
  {
    date: '2021-07-29T00:00:00.000Z',
    value: 10,
  },
  {
    date: '2021-08-01T00:00:00.000Z',
    value: 13,
  },
  {
    date: '2021-08-02T00:00:00.000Z',
    value: 12,
  },
  {
    date: '2021-08-03T00:00:00.000Z',
    value: 30.2,
  },
  {
    date: '2021-08-04T00:00:00.000Z',
    value: 33.3,
  },
  {
    date: '2021-08-07T00:00:00.000Z',
    value: 36,
  },
];
drawSensorsGraph(parent2, data2, '#B1DF8D', "°F");
d3.select(window).on('resize.temperature-graph', () =>
  drawSensorsGraph(parent2, data2, '#B1DF8D', "°F")
);
