
//Rita grafen när fönstret ändrar storlek
window.onload = reDraw();
window.onresize = reDraw;

function reDraw() {
    let barData = [20, 30, 45, 15, 67, 99, 126, 32, 60, 43, 80];
    const height = window.innerHeight / 2,
        width = window.innerWidth / 2,//600,//window.innerWidth / 2,
        barWidth = 50,
        barOffset = 5;
    const colorArr = ["#29D414", "#FF0000"];

    //Ta bort tidigare grafer
    d3.select('svg').remove('rect');

    let yScale = d3.scaleLinear()
        .domain([0, d3.max(barData) + barOffset])
        .range([0, height])

    //Bandscale är praktiskt då man har flera grejer att 
    //rita brevid varandra med ett visst mellanrum
    let xScale = d3.scaleBand()
        .domain(barData)
        .range([0, width])
        .paddingInner(.1)

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
                return xScale(d);
            })
            .attr('y', function(d) {
                return height - yScale(d);
            })
}
