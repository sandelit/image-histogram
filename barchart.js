
let barData = [20, 30, 45, 15, 67, 99, 126, 32, 60, 43, 80];
const height = 400,
    width = 600,
    barWidth = 50,
    barOffset = 5;
const colorArr = ["#29D414", "#FF0000"];

let yScale = d3.scaleLinear()
    .domain([0, d3.max(barData)])
    .range([0, height])

let xScale = d3.scaleBand()
    .domain(barData)
    .paddingInner(.1)
    .paddingOuter(.1)
    .range([0, width])

let colors = d3.scaleLinear()
    .domain([0, d3.max(barData)])
    .range(colorArr)


d3.select('#canvas').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#C9D7D6')

.selectAll('rect').data(barData)
    .enter().append('rect')
        .attr('fill', function(d) {
            return colors(d);
        })
        .attr('width', function(d) {
            return xScale.bandwidth();
        })
        .attr('height', function(d) {
            return yScale(d);
        })
        .attr('x', function(d, i) {
            return i * (barWidth + barOffset);
        })
        .attr('y', function(d) {
            return height - yScale(d);
        })
