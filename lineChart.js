function drawChart() {
    let width = 500;
    let height = 300;

    //Skata ett ritunderlag
    let canvas = d3.select('body').append('svg').attr('width', width).attr('height', height)

    //Rita en linje (path - inte svg line)
    canvas.append('path')
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('d', "M30 20 L60 60 L120 28 L180 72 L240 40");



}