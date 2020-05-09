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
        dataArr = valueOccurences(dataArr);
        drawHistogram(dataArr);
    } else {
        console.log('its colorateded');
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

function valueOccurences(array) {
    var a = [],
        b = [],
        prev;

    array.sort();
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== prev) {
            a.push(array[i]);
            b.push(1);
        } else {
            b[b.length - 1]++;
        }
        prev = array[i];
    }
    return b;
}

function drawHistogram(barData) {
    let height = window.innerHeight / 2;
    let width = window.innerWidth / 2;
    const barOffset = 5;
    console.log(barData);
    /*Creates an array with values between x & y, range(0, 3) -> [0, 1, 2, 3]
    Used to create 256 bars with values 0 => 255
    stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp */
    const RANGE = (x, y) =>
        Array.from(
            (function* () {
                while (x <= y) yield x++;
            })()
        );
    const BARS = RANGE(0, 255);

    // "Reset" the bars so they can be readded in a different size on resize
    d3.select('svg').remove('rect');

    if (barData != null) {
        let yScale = d3
            .scaleLinear()
            .domain([0, d3.max(barData) + barOffset])
            .range([0, height]);
        let xScale = d3
            .scaleBand()
            .domain(barData)
            .range([0, width])
            .paddingInner(0.1);

        d3.select('#canvasHistogram')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background', '#C9D7D6')

            .selectAll('rect')
            .data(BARS)
            .enter()
            .append('rect')
            .attr('fill', 'gray')
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
}
