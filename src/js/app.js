var PIXI = require('pixi.js');
var setUpDeviceOrientationListener = require('./components/device_orientation_listener.js');
var WorldObjects = require('./components/world_objects.js');
var Timer = require('./components/timer.js');

var listener = setUpDeviceOrientationListener(window, 25);

var viewportWidth = window.innerWidth;
var viewportHeight = window.innerHeight;

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(viewportWidth, viewportHeight, {
    backgroundColor: 0x1e3395
});

var timer;
var worldObjects;
var gameStarted = false;

var initGame = function(e) {
    worldObjects = new WorldObjects(viewportWidth, viewportHeight, worldObjectsRenderer);
    timer = new Timer();
    timerText.interactive = false;
    gameStarted = true;
};

var mainGameScreen = new PIXI.Container();
var worldObjectsRenderer = new PIXI.Graphics();
mainGameScreen.addChild(worldObjectsRenderer);

var timerText = new PIXI.Text(0, {
    font: "20px Helvetica",
    fill: 0xbf2317
});
timerText.x = 50;
timerText.y = 50;
timerText.interactive = false;
mainGameScreen.addChild(timerText);

// add the renderer view element to the DOM
document.body.removeChild(document.getElementById("loading"));
document.body.appendChild(renderer.view);

var ticker = PIXI.ticker.shared;
ticker.autoStart = false;
ticker.stop();

ticker.add(function(timeStep) {
    if (gameStarted) {
        timer.updateTime(function(timerTime) {
            timerText.text = timerTime;
            timerText.interactive = false;
        });

        worldObjects.step(listener.getCurrentVector(), timeStep, function() {
            timerText.text += " Game Over, tap here to restart";
            timerText.interactive = true;
            timerText.on("click", initGame).on("tap", initGame);
            gameStarted = false;
        });
        worldObjects.render();
    }

    renderer.render(mainGameScreen);
    // console.log(renderer.plugins.interaction.mouse.global.x + ", " + renderer.plugins.interaction.mouse.global.y);
});

initGame();
ticker.start();
