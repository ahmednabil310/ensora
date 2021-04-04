function drawSensorsGraph(parent, data, color, unit) {
  const width = parent.node().clientWidth;

  const height = 144;
  const margin = { top: 16, right: 36, bottom: 20, left: 40 };

  const yAxis = (g) =>
    g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5))
      .call((g) => g.select('.domain').remove())
      //left line
      .call((g) =>
        g
          .append('line')
          .attr('y1', margin.top)
          .attr('y2', height - margin.bottom)
          .attr('stroke', '#9DA9B5')
      )
      //right line
      .call((g) =>
        g
          .append('line')
          .attr('y1', margin.top)
          .attr('y2', height - margin.bottom)
          .attr('x1', width - margin.left - margin.right)
          .attr('x2', width - margin.left - margin.right)
          .attr('stroke', '#9DA9B5')
      )
      //top line
      .call((g) =>
        g
          .append('line')
          .attr('y1', margin.top)
          .attr('y2', margin.top)
          .attr('x2', width - margin.left - margin.right)
          .attr('stroke', '#9DA9B5')
      )
      //bottom line
      .call((g) =>
        g
          .append('line')
          .attr('y1', height - margin.bottom)
          .attr('y2', height - margin.bottom)
          .attr('x2', width - margin.left - margin.right)
          .attr('stroke', '#9DA9B5')
      )
      .call((g) =>
        g
          .selectAll('.tick:not(:first-of-type) line')
          .clone()
          .attr('x2', width - margin.left - margin.right)
          .attr('stroke', '#DFE4EB')
          .attr('stroke-width', '1px')
          .style('visibility', 'visible')
      )
      .call((g) =>
        g
          .select('.tick:last-of-type text')
          .clone()
          .attr('x', 3)
          .attr('text-anchor', 'start')
          .attr('font-weight', 'bold')
          .text(data.y)
      );

  const xAxis = (g) =>
    g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(d3.timeDay.filter((d) => d3.timeDay.count(0, d) % 7 === 0))
          .tickSizeOuter(0)
          .tickFormat((d, i) => moment(d).format('MMM D'))
      )
      .call((g) => g.select('.domain').remove());

  const y = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.value))
    .nice()
    .range([height - margin.bottom, margin.top]);

  const x = d3
    .scaleUtc()
    .domain(d3.extent(data, (d) => new Date(d.date)))
    .range([margin.left, width - margin.right]);

  const line = d3
    .line()
    .defined((d) => !isNaN(d.value))
    .x((d) => x(new Date(d.date)))
    .y((d) => y(d.value));

  const svg = parent.select('.graph').attr('viewBox', [0, 0, width, height]);

  parent
    .select('.xaxis-group')
    .call((g) => g.selectAll('*').remove())
    .call(xAxis);

  parent
    .select('.yaxis-group')
    .call((g) => g.selectAll('*').remove())
    .call(yAxis);

  parent
    .select('.graph-group')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', 1.5)
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('d', line);

  const tooltip = parent
    .select('.tooltip-area')
    .style('pointer-events', 'none')
    .style('opacity', 1)
    .style('display', 'none');

  const lineTooltip = svg
    .select('.line-group > line')
    .style('opacity', 0)
    .attr('y1', margin.top)
    .attr('y2', height - margin.bottom)
    .attr('stroke', '#9DA9B5');

  const graphDot = svg
    .selectAll('.graph-dot-group > rect')
    .attr('fill', color)
    .style('opacity', 0);

  const bisectDate = d3.bisector(function (d) {
    return new Date(d.date);
  }).left;
  const formatDate = (date) => {
    const momentDate = moment(date),
      now = moment();
    if (momentDate.year() === now.year())
      return momentDate.format('ddd, MMMM D hh:mma');
    return momentDate.format('llll');
  };

  const mouseover = (event, d) => {
    tooltip.style('display', null);
    lineTooltip.style('opacity', 1);
    graphDot.style('opacity', 1);
  };

  const mouseleave = (event, d) => {
    tooltip.style('display', 'none');
    lineTooltip.style('opacity', 0);
    graphDot.style('opacity', 0);
  };

  const mousemove = function (event) {
    const x0 = x.invert(d3.pointer(event)[0]),
      i = bisectDate(data, x0, 1),
      d0 = data[i - 1],
      d1 = data[i],
      d =
        new Date(x0) - new Date(d0.date) > new Date(d1.date) - new Date(x0)
          ? d1
          : d0;
    const text = tooltip.select('.tooltip-area__text');

    tooltip.style('display', null);
    lineTooltip.style('opacity', 1);
    graphDot.style('opacity', 1);
    text.node().innerHTML = `
      ${formatDate(d.date)}<br>
      <svg width="22" height="3" viewBox="0 0 22 3" fill="none" xmlns="http://www.w3.org/2000/svg" class="legend-line">
        <rect width="22" height="3" fill="${color}" />
      </svg>
      <span class="tooltip-number">${d.value} ${unit}</span>
    `;

    const xValue = x(new Date(d.date)),
      yValue = y(d.value);

    lineTooltip.attr('x1', xValue).attr('x2', xValue);
    graphDot.each(function (d, i) {
      d3.select(this).call((g) =>
        g.attr('y', yValue - g.attr('rx')).attr('x', xValue - g.attr('rx'))
      );
    });
    const lineTooltipBbox = lineTooltip.node().getBoundingClientRect();
    const graphDotBbox = graphDot.node().getBoundingClientRect();
    const parentBox = parent.node().getBoundingClientRect();

    tooltip
      .style('top', graphDotBbox.top - parentBox.top - 5 + 'px')
      .style(
        'left',
        `calc(${lineTooltipBbox.left - parentBox.left}px + 0.5em)`
      );

    const tooltipBox = tooltip.node().getBoundingClientRect();
    if (!isInViewport(tooltipBox))
      tooltip.style(
        'left',
        `calc(${
          lineTooltipBbox.left - parentBox.left - tooltipBox.width
        }px - 0.5em)`
      );
  };

  svg
    .select('.overlay')
    .attr('class', 'overlay')
    .attr('x', margin.left)
    .attr('y', margin.top)
    .attr('width', width - margin.right - margin.left)
    .attr('height', height - margin.bottom - margin.top)
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave)
    .on('mouseover', mouseover);
}
