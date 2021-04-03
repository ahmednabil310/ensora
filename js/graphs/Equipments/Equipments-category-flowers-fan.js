var parent3 = d3.select('#flowers-fan');
drawFlowersFanGraph(parent3);
d3.select(window).on('resize.Flowers', () => drawFlowersFanGraph(parent3));

function drawFlowersFanGraph(parent) {
  const width = parent.node().clientWidth;
  console.log(width);
  const colors = {
    on: '#71C76A',
    off: '#5B6D83',
    override: '#EC6060',
    auto: '#5AAFE8',
  };

  const textColors = {
    on: '#71C76A',
    off: '#687D8F',
    auto: '#5AAFE8',
    override: '#EC6060',
  };
  const data = [
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
  //assuming both starts and ends at the same date
  const minDate = moment(data[0].values[0].startDate);
  const maxDate = moment(
    data[data.length - 1].values[data[data.length - 1].values.length - 1]
      .endDate
  );

  //name is for y axis
  //key is for layers (stacks) / value should be in key:value
  const tseries = [];
  data.forEach((d) => {
    const obj = { name: d.name };
    d.values.forEach((v, i) => {
      const key = v.state + i;
      const interval = moment(v.endDate).diff(v.startDate);
      obj[key] = interval;
    });
    tseries.push(obj);
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const columns = [
    ...Object.keys(tseries[0]).filter((t) => t !== 'name'),
    ...Object.keys(tseries[1]).filter((t) => t !== 'name'),
  ];

  const margin = { top: 10, right: 10, bottom: 30, left: 54 },
    height = Math.max(data.length, 4) * 23.5 + margin.top + margin.bottom,
    yAxis = (g) =>
      g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickSizeOuter(0))
        .call((g) => g.selectAll('.domain').remove())
        .call((g) =>
          g
            .selectAll('.tick text')
            .attr('dy', '-1.2em')
            .attr('class', 'yaxis-labels')
            .attr('fill', function (d, i) {
              return textColors[d.toLowerCase()];
            })
        )
        .call((g) =>
          g.selectAll('.tick text').attr('dy', function (d, i) {
            if (i === 0) return '-0.5em';
            if (i === 1) return '-1.8em';
            if (i === 2) return '-3.5em';
            return '-5.0em';
          })
        ),
    xAxis = (g) =>
      g
        .attr('transform', `translate(0,${(height - margin.bottom) / 2 - 7})`)
        .call(
          d3
            .axisBottom(timeScale)
            .ticks(d3.timeDay.filter((d) => d3.timeDay.count(0, d) % 7 === 0))
            .tickFormat((d, i) => moment(d).format('MMM D'))
            .tickSizeOuter(0)
        )
        .call((g) => g.selectAll('.domain').remove()),
    series = d3
      .stack()
      .keys(columns)
      .value((obj, key) => (obj[key] ? obj[key] : 0))(tseries),
    y = d3
      .scaleBand()
      .domain(['On', 'Off', 'Auto', 'Override'])
      .range([0, height - margin.bottom])
      .padding(0),
    timeScale = d3
      .scaleTime()
      .domain([minDate.toDate(), maxDate.toDate()])
      .range([margin.left, width - margin.right]),
    x = d3
      .scaleLinear()
      .domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1]))])
      .range([margin.left, width - margin.right]);

  const svg = parent
    .select('.graph')
    .attr('viewBox', [0, -margin.top, width, height / 2 + margin.bottom / 2])
    .style('overflow', 'visible');

  const tmp = svg.select('.rects-group');
  const tmp1 = tmp
    .selectAll('g')
    .data(series)
    .join('g')
    .attr('fill', (d) => colors[d.key.split(/\d/)[0]])
    .selectAll('rect')
    .data((d) => d)
    .join('rect')
    .attr('x', (d) => x(d[0]))
    .attr('y', (d, i) => (i === 0 ? y('On') : y('Off')))
    .attr('width', (d) => x(d[1]) - x(d[0]))
    .attr('height', function (d, i) {
      if (i === 0) return y.bandwidth();
      return 19;
    });

  svg.select('.xaxis-group').call(xAxis);

  svg.select('.yaxis-group').call(yAxis);

  const tooltip = parent.select('.tooltip-area').style('opacity', 0);

  const line = svg
    .select('.line-group > line')
    .attr('y1', 0)
    .attr('y2', y.bandwidth() + 19)
    .attr('stroke', '#DFE4EB')
    .style('opacity', 0);

  const mouseover = (event, d) => {
    if (!isEventInElement(event, tmp.node())) {
      tooltip.style('opacity', 0);
      line.style('opacity', 1);
      return;
    }
    tooltip.style('opacity', 1);
    line.style('opacity', 1);
  };

  const mouseleave = (event, d) => {
    tooltip.style('opacity', 0);
    line.style('opacity', 0);
  };

  function isEventInElement(event, element) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX;
    if (x < rect.left || x >= rect.right) return false;
    const y = event.clientY;
    if (y < rect.top || y >= rect.bottom) return false;
    return true;
  }

  function isInViewport(rect) {
    return (
      rect.left >= 0 &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) - 50
    );
  }

  const getData = (x) => {
    hoveredData = [];
    for (let arr of series) {
      for (let layer of arr) {
        if (layer[0] !== layer[1] && x >= layer[0] && x <= layer[1])
          hoveredData.push(arr.key.split(/\d/)[0]);
      }
    }
    return hoveredData;
  };
  const mousemove = (event, d) => {
    if (!isEventInElement(event, tmp.node())) {
      tooltip.style('opacity', 0);
      line.style('opacity', 0);
      return;
    }

    const text = tooltip.select('.tooltip-area__text');
    const coord = d3.pointer(event, tmp.node());
    const invertedX = x.invert(coord[0]);
    const hoveredData = getData(invertedX);
    tooltip.style('opacity', 1);
    line.style('opacity', 1);

    text.node().innerHTML = `
  ${moment(minDate)
    .add(invertedX)
    .calendar(null, {
      sameElse: function (now) {
        if (this.year() === now.year()) {
          return 'ddd, MMMM D hh:mma';
        }
        return 'llll';
      },
    })}<br>
  Power <span class="power-text__${hoveredData[0]}">${capitalizeFirstLetter(
      hoveredData[0]
    )}</span><br>
  Mode <span class="mode-text__${hoveredData[1]}">${capitalizeFirstLetter(
      hoveredData[1]
    )}</span><br>
  `;

    const parentBox = parent.node().getBoundingClientRect();
    tooltip
      .style(
        'bottom',
        tmp.node().getBoundingClientRect().top - parentBox.top - 5 + 'px'
      )
      .style('left', `calc(${event.clientX - parentBox.left}px + 0.5em)`);

    const tooltipBox = tooltip.node().getBoundingClientRect();
    if (!isInViewport(tooltipBox))
      tooltip.style(
        'left',
        `calc(${event.clientX - parentBox.left - tooltipBox.width}px - 0.5em)`
      );

    line.attr('x1', coord[0]).attr('x2', coord[0]);
  };

  tooltip
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave)
    .on('mouseover', mouseover);

  tmp1
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave)
    .on('mouseover', mouseover);

  line
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave)
    .on('mouseover', mouseover);
}
