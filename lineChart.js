function drawChart() {
    
    // En array med våra x och y kordinater för cassiopeia
    var dataArray = [{x:5, y:5}, {x:10, y:15}, {x:20, y:7}, {x:30, y:18}, {x:40, y:10}];

    let width = 500;
    let height = 300;

    // Skata ett ritunderlag
    let canvas = d3.select('body').append('svg').attr('width', width).attr('height', height);

    //d3.line() är en generator som genererar d="m x y ... "
    let line = d3.line()
        .x(function(data) { return data.x * 5 })
        .y(function(data) { return data.y * 5 })
        .curve(d3.curveCardinal);


    // Rita en linje (path - inte svg line)
    canvas.append('path')
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('d', line(dataArray));

}