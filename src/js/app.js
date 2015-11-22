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

var debugText = new PIXI.Text(circlePos.x + ", " + circlePos.y);
debugText.x = 50;
debugText.y = 50;
stage.addChild(debugText);

function moveCircle(accel, circle, time) {
    if (!accel.x) {
        accel.x = 0;
    }

    if (!accel.y) {
        accel.y = 0;
    }

    var newV = {
        x: circleV.x + accel.x * time,
        y: circleV.y + accel.y * time
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

    debugText.text = accel.x + ", " + accel.y;

    // console.log(circlePos);
}

// add the renderer view element to the DOM
document.body.removeChild(document.getElementById("loading"));
document.body.appendChild(renderer.view);

ticker.add(function(time) {
    // console.log(time);
    moveCircle(listener.getCurrentVector(), circle, time);
    renderer.render(stage);
    // console.log(renderer.plugins.interaction.mouse.global.x + ", " + renderer.plugins.interaction.mouse.global.y);
});

ticker.start();
