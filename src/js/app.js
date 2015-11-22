var PIXI = require('pixi.js');
var setUpDeviceOrientationListener = require('./listener.js');

var listener = setUpDeviceOrientationListener(window, 25);

var viewportWidth = window.innerWidth;
var viewportHeight = window.innerHeight;

console.log({
    width: viewportWidth,
    height: viewportHeight
});

var ticker = PIXI.ticker.shared;
ticker.autoStart = false;
ticker.stop();

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(viewportWidth, viewportHeight, {
    backgroundColor: 0x1099bb
});

var stage = new PIXI.Container();

var circle = new PIXI.Graphics();

stage.addChild(circle);

var circlePos = {
    x: viewportWidth / 2,
    y: viewportHeight / 2
};

var circleV = {
    x: 0,
    y: 0
};

var startTime = Date.now();

var timerText = new PIXI.Text(0);
timerText.x = 50;
timerText.y = 50;
stage.addChild(timerText);

function updateTime() {
    timerText.text = (Date.now() - startTime) / 1000;
}

function moveCircle(accel, circle, time) {
    if (!accel.x) {
        accel.x = 0;
    }

    if (!accel.y) {
        accel.y = 0;
    }

    var friction = 0.01;

    var friction_accel = {
        x: -friction * circleV.x,
        y: -friction * circleV.y
    };

    var newV = {
        x: circleV.x + (accel.x + friction_accel.x) * time,
        y: circleV.y + (accel.y + friction_accel.y) * time
    };

    circleV = newV;

    var newPos = {
        x: circlePos.x + circleV.x * time,
        y: circlePos.y + circleV.y * time
    };

    circlePos = newPos;

    circle.clear();
    circle.lineStyle(0);
    circle.beginFill(0xff0000, 0.5);
    circle.drawCircle(circlePos.x, circlePos.y, 30);
    circle.endFill();

    if (circlePos.x > viewportWidth || circlePos.x < 0 || circlePos.y > viewportHeight || circlePos.y < 0) {
        timerText.text += " Game over! Tap here to restart!";
        ticker.stop();
    }
    // console.log(circlePos);
}

// add the renderer view element to the DOM
document.body.removeChild(document.getElementById("loading"));
document.body.appendChild(renderer.view);

ticker.add(function(time) {
    // console.log(time);
    updateTime();
    moveCircle(listener.getCurrentVector(), circle, time);
    renderer.render(stage);
    // console.log(renderer.plugins.interaction.mouse.global.x + ", " + renderer.plugins.interaction.mouse.global.y);
});

ticker.start();
