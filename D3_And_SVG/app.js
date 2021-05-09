const
    minYear = birthData[0].year,
    maxYear = birthData[birthData.length - 1].year,
    width = 600,
    height = 600,
    barPadding = 10,
    numBars = 12,
    barWidth = width / numBars - barPadding;

d3.select('input')
    .property('min', minYear)
    .property('max', maxYear)
    .property('value', minYear);

d3.select('svg')
    .attr('width', width)
    .attr('height', height)
    .selectAll('rect')
    .data(birthData.filter(d => {
        return d.year === minYear;
    }))
    .enter()
    .append('rect')
    .attr('width', barWidth)
    .attr('height', d => {
        return d.births / 2.5e6 * height;
    })
    .attr('y', d => {
        return height - d.births / 2.5e6 * height;
    })
    .attr('x', (d, i) => {
        return barWidth + barPadding * i;
    })
    .attr('fill', 'purple')