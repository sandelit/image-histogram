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
            const imgData = ctx.getImageData(0, 0, img.width, img.height);
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
    let red = loopData(0, data);
    let green = loopData(1, data);
    let blue = loopData(2, data);

    if (isBlackWhite(red, green, blue)) {
        let dataArr = red;
        console.log('its black and white');
        bw = valueFrequency(dataArr);
        drawHistogram({ bw });
    } else {
        console.log('its colorateded');
        red = valueFrequency(red);
        green = valueFrequency(green);
        blue = valueFrequency(blue);
        drawHistogram({ red, green, blue });
    }
}

function loopData(startIndex, imgData) {
    let colorArr = [];
    for (i = startIndex; i < imgData.data.length; i += 4) {
        colorArr.push(imgData.data[i]);
    }
    return colorArr;
}

function isBlackWhite(red, green, blue) {
    red = red.toString();
    green = green.toString();
    blue = blue.toString();
    if (red == green && red == blue && red != null) return true;
    else return false;
}

function valueFrequency(array) {
    let b = [],
        prev;

    array.sort();
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== prev) {
            b.push(1);
        } else {
            b[b.length - 1]++;
        }
        prev = array[i];
    }
    return b;
}

function drawHistogram(data) {
    d3.select('svg').remove('rect');

    if (data != null) {
        if (data.bw != null) {
            drawSVG();
            drawBars(data.bw, 'black');
        } else {
            drawSVG();
            drawBars(data.red, 'red');
            drawBars(data.green, 'green');
            drawBars(data.blue, 'blue');
        }
    }
}

function drawSVG() {
    const height = window.innerHeight / 2;
    const width = window.innerWidth / 2;
    d3.select('#canvasHistogram')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background', 'lightgray');
}

function drawBars(data, colour) {
    const height = window.innerHeight / 2;
    const width = window.innerWidth / 2;
    console.log(colour + ' bars should be drawn');
    const barOffset = 5,
        yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data) + barOffset])
            .range([0, height]),
        xScale = d3.scaleBand().domain(data).range([0, width]);

    d3.select('svg')
        .selectAll('rect-' + colour)
        .data(data)
        .enter()
        .append('rect')
        .attr('fill', colour)
        .attr('opacity', 0.3)
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
            });*/
