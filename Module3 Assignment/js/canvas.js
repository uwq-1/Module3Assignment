
var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d");


var radius = canvas.height / 2;

ctx.translate(radius, radius);

radius = radius * 0.90;


// Set up D3 for digital clock display
var d3Container = d3.select("#d3-container");

// Append a text element for the digital clock
var digitalClock = d3Container.append("div")
    .attr("id", "digital-clock")
    .style("font-family", "Arial")
    .style("font-size", "24px")
    .style("color", "blue");


//drawClock();

// Function to design the clock interface
function drawClock()
{
    ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
    updateD3Clock(); // update digital clock
}

// Function to design the clock face 
function drawFace(ctx, radius)
{

    const grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');


    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();


    for (let sec = 0; sec < 60; sec++)
    {
        let ang = (sec * Math.PI) / 30;
        let x1 = (radius * 0.9) * Math.sin(ang);
        let y1 = -(radius * 0.9) * Math.cos(ang);
        let x2, y2;

        if (sec % 5 === 0)
        {
            x2 = (radius * 0.85) * Math.sin(ang);
            y2 = -(radius * 0.85) * Math.cos(ang);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = radius * 0.02;

        }
        else
        {
            x2 = (radius * 0.89) * Math.sin(ang);
            y2 = -(radius * 0.89) * Math.cos(ang);
            ctx.strokeStyle = '#333';
            ctx.lineWidth = radius * 0.02;
        }

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        ctx.stroke();



    }

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();




}

// Function to design the clock numbers 
function drawNumbers(ctx, radius)
{
    ctx.font = radius * 0.17 + "px arial"; // Font size and font family
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "blue";

    // For loop to iterates the numbers from 1 -> 12
    for (let num = 1; num < 13; num++)
    {
        let ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.75);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.75);
        ctx.rotate(-ang);
    }
}

// Function to get the time 
function drawTime(ctx, radius)
{
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();


    // hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07, "#333");

    // minutes
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.71, radius * 0.07, "#333");

    // second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02, "red");

}


function drawHand(ctx, pos, length, width, color)
{
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.strokeStyle = color;
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);

    // Create the center red dot for the second hand of the clock 
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();

}


// Function to update D3 digital clock display
function updateD3Clock()
{
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    digitalClock.text(timeString);
}



// Update the clock every 1 seconds 
setInterval(drawClock, 1000);