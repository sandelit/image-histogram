window.onload = drawHistogram();
// Creates canvas and checks for file input
const inputImage = document.getElementById('imageInput');
const canvas = document.getElementById('canvasImage');
const ctx = canvas.getContext('2d');
inputImage.addEventListener('change', handleImage, false);

function handleImage(e) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imgData = ctx.getImageData(0, 0, img.width, img.height).data;
            d3.select('canvas').attr('id', 'border');
            handleData(imgData);
            window.onresize = (e) => {
                handleData(imgData);
            };
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}

function handleData(data) {
    let red = {},
        green = {},
        blue = {};

    for (let i = 0; i < 256; i++) {
        red[i] = 0;
        green[i] = 0;
        blue[i] = 0;
    }
    for (let i = 0; i < data.length; i += 4) {
        red[data[i]]++;
        green[data[i + 1]]++;
        blue[data[i + 2]]++;
    }
    drawHistogram({ red, green, blue });
}

function isBlackWhite(data) {
    if (
        JSON.stringify(data.red) === JSON.stringify(data.green) &&
        JSON.stringify(data.red) === JSON.stringify(data.blue)
    ) {
        return true;
    } else {
        return false;
    }
}

function drawHistogram(data) {
    d3.select('svg').remove('rect');
    drawSVG();
    if (data != null) {
        if (isBlackWhite(data)) {
            drawBars(data.red, 'gray');
            drawBars(data.green, 'gray');
            drawBars(data.blue, 'gray');
        } else {
            drawBars(data.red, 'red');
            drawBars(data.green, 'green');
            drawBars(data.blue, 'blue');
        }
    }
}

function drawSVG() {
    const height = window.innerHeight / 2,
        width = window.innerWidth / 2;
    d3.select('#canvasHistogram')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background', '#FFFFFF')
        .attr('style', 'outline: 2px solid black')
        .attr('id', 'shadow');
}

function drawBars(data, color) {
    let dataArr = [];
    dataArr = Object.values(data);
    const height = window.innerHeight / 2,
        width = window.innerWidth / 2,
        barOffset = 5;

    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataArr) + barOffset])
        .range([0, height]);
    const xScale = d3.scaleBand().domain(dataArr).range([0, width]);

    switch (color) {
        case 'red':
            colorRange = ['#8A0808', '#8A0808']; //F6CECE
            break;
        case 'green':
            colorRange = ['#088A08', '#088A08']; //CEF6CE
            break;
        case 'blue':
            colorRange = ['#08088A', '#08088A']; //CECEF6
            break;
        case 'gray':
            colorRange = ['#000000', '#CCCCCC'];
            break;
    }
    let colors = d3.scaleLinear().domain([0, 255]).range(colorRange);
    let tempColor;
    let tooltip = d3
        .select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    let chart = d3
        .select('svg')
        .append('g')
        .selectAll('rect-' + color)
        .data(dataArr)
        .enter()
        .append('rect')
        .style('opacity', 0.33)
        .attr('fill', function (d, i) {
            return colors(i);
        })
        .attr('width', function (d) {
            return xScale.bandwidth();
        })
        .attr('height', 0)
        .attr('x', function (d, i) {
            return xScale(d);
        })

        .on('mouseover', function (d) {
            tooltip.transition().duration(200).style('opacity', 0.9);
            tooltip
                .html(Math.round(d))
                .style('left', d3.event.pageX + 'px')
                .style('top', d3.event.pageY - 28 + 'px');

            tempColor = this.style.fill;
            d3.select(this).style('fill', 'yellow');
        })
        .on('mouseout', function (d) {
            d3.select(this).style('fill', tempColor);
            tooltip.transition().duration(500).style('opacity', 0);
        });

    chart
        .transition()
        .attr('height', function (d) {
            return yScale(d);
        })
        .attr('y', function (d) {
            return height - yScale(d);
        })
        .delay(function (d, i) {
            return i * 5;
        })
        .ease(d3.easeBounceOut);
}

/*.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('fill', 'gray')
            .style('stroke-opacity', 0.3)
            .attr('width', function (d) {
                return xScale.bandwidth();
            })
            .attr('height', function (d) {
                return yScale(d);
            })
            .attr('x', function (d, i) {
                return xScale(d);
            })
            .attr('y', function (d) {
                return height - yScale(d);
            });
            
            
            
         
            
    
    let colours = d3.scaleLinear().domain([0, 255]).range(colourRange);
    
    
    */
/*
    if (isBlackWhite(red, green, blue)) {
        console.log('greyscale');
        let bw = red;
        luminosity = valueFrequency(bw);
        drawHistogram(luminosity);
    } else {
        console.log('colored');
        red = valueFrequency(red);
        green = valueFrequency(green);
        blue = valueFrequency(blue);
        luminosity = calculateLuminosity(red, green, blue);
        drawHistogram(luminosity);
    }*/
/*let colorRange = [];
    switch (color) {
        case 'red':
            colorRange = ['#C40105', '#E52D30'];
            break;
        case 'green':
            colorRange = ['#04A307', '#2BB52D'];
            break;
        case 'blue':
            colorRange = ['#031C99', '#3045B2'];
            break;
        case 'dark':
            colorRange = ['#939393', '#FFFFFF']; //#939393
            break;
    }*/
/*let red = [],
        green = [],
        blue = [];

    for (i = 0; i < data.data.length; i += 4) {
        red.push(data.data[i]);
        green.push(data.data[i + 1]);
        blue.push(data.data[i + 2]);
    }
    red = valueFrequency(red);
    green = valueFrequency(green);
    blue = valueFrequency(blue);

    let luminosity = calculateLuminosity(red, green, blue);
    drawHistogram(luminosity);*/
