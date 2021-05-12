const
    minYear = d3.min(birthData, d => {
        return d.year;
    }),
    maxYear = d3.max(birthData, d => {
        return d.year;
    }),
    width = 600,
    height = 600,
    barPadding = 10,
    numBars = 12,
    barWidth = width / numBars - barPadding,
    maxBirths = d3.max(birthData, d => {
        return d.births;
    });

const yScale = d3.scaleLinear()
    .domain([0, maxBirths])
    .range([height, 0])

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
        return height - yScale(d.births);
    })
    .attr('y', d => {
        return yScale(d.births);
    })
    .attr('x', (d, i) => {
        return barWidth + barPadding * i;
    })
    .attr('fill', 'purple')


d3.select('input')
    .on('input', () => {
        let year = +d3.event.target.value;
        d3.selectAll('rect')
            .data(birthData.filter(d => {
                return d.year === year;
            }))
            .attr('height', d => {
                return height - yScale(d.births);
            })
            .attr('y', d => {
                return yScale(d.births);
            })
    })