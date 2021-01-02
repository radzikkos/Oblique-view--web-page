var readyToDraw = true;

function mouseOver() {
    document.getElementById("canvas").style.background = "#eebfbf";
}

function mouseOut() {
    document.getElementById("canvas").style.background = "#ffffff";
}

function validate() {
    //Dorobić sprawdzanie czy podano liczby
    // if ((!Number.isInteger(document.getElementById("angle").value)) || (!Number.isInteger(document.getElementById("velocity").value)) ||
    //     (!Number.isInteger(document.getElementById("height").value))) {
    //     alert("Wartości muszą być liczbami");
    //     readyToDraw = false;
    //     return false;
    // }
    if ((document.getElementById("angle").value > 91) || (document.getElementById("angle").value < 0)) {
        alert("Wartość kąta może być pomiędzy 0 - 90");
        readyToDraw = false;
        return false;
    }
    if ((document.getElementById("velocity").value > 100) || (document.getElementById("velocity").value < 0)) {
        alert("Wartość prędkości może być pomiędzy 0 - 100");
        readyToDraw = false;
        return false;
    }
    if ((document.getElementById("height").value > 200) || (document.getElementById("velocity").value < 0)) {
        alert("Wysokość początkowa może być pomiędzy 0 - 200");
        readyToDraw = false;
        return false;
    }

    readyToDraw = true;
    return false;
}

function draw() {
    drawGrid();
    drawAxes();
}

function drawGrid() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.strokeStyle = "#ddd";

    for (var x = 0; x < 600; x += 10) {
        context.moveTo(x, 0);
        context.lineTo(x, 400);
    }
    for (var y = 0; y < 400; y += 10) {
        context.moveTo(0, y);
        context.lineTo(600, y);
    }

    context.stroke();
}




function drawAxes() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    // context.strokeStyle = "#ddd";
    context.beginPath();
    context.moveTo(50, 350);
    context.lineTo(550, 350);

    context.moveTo(545, 330);
    context.lineTo(550, 350);
    context.lineTo(545, 370);

    context.moveTo(50, 350);
    context.lineTo(50, 20);

    context.moveTo(55, 30);
    context.lineTo(50, 20);
    context.lineTo(45, 30);

    context.font = "10px Arial";
    var number = 10;
    for (var x = 70; x <= 530; x += 20) {
        context.moveTo(x, 350);
        context.lineTo(x, 345);
        context.lineTo(x, 355);
        context.fillText(number, x - 7, 370);
        number += 10;
    }
    number = 10;

    for (var y = 20; y <= 330; y += 20) {
        context.moveTo(50, 350 - y);
        context.lineTo(45, 350 - y);
        context.lineTo(55, 350 - y);
        context.fillText(number, 20, 350 - y + 5);
        number += 10;
    }

    context.strokeStyle = "#00A";
    context.stroke();
}
var ball = {
    xStart: 50,
    yStart: 350,
    v0: 60,
    alpha: 45,
    g: 9.81,
    getActualX: function(time) {
        var radians = this.alpha * (Math.PI / 180);
        var vOX = this.v0 * Math.cos(radians);
        return vOX * time + this.xStart;
    },
    getActualY: function(time) {
        var radians = this.alpha * (Math.PI / 180);
        var vOY = this.v0 * Math.sin(radians);
        return this.yStart - (vOY * time - this.g / 2 * time * time);
    }

}


function drawThrow() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // drawGrid();
    // drawAxes();
    draw();
    if (!readyToDraw) { return; }
    ball.alpha = document.getElementById("angle").value;
    ball.v0 = document.getElementById("velocity").value;
    ball.yStart = 350 - document.getElementById("height").value;


    ctx.beginPath();
    var time = 0;
    while (true) {

        var tempX = ball.getActualX(time);
        var tempY = ball.getActualY(time);
        if ((time != 0) && (tempY > 350)) break;
        ctx.moveTo(tempX, tempY);
        ctx.arc(tempX, tempY, 5, 0, 2 * Math.PI);
        time++;
    }

    ctx.fill();
}