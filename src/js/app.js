var PIXI = require('pixi.js');

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
var interactionManager = renderer.plugins.interaction;

var basicText = new PIXI.Text('Basic text in pixi', {
    font: "50px Helvetica",
    stroke: "#4a1850"
});
basicText.x = 30;
basicText.y = 90;
basicText.interactive = true;

var counter = 0;

var textOnClick =  function(e) {
    basicText.text = "You have clicked " + (++counter) + " times.";
};

basicText.on('click', textOnClick)
         .on('tap', textOnClick);

stage.addChild(basicText);

// add the renderer view element to the DOM
document.body.removeChild(document.getElementById("loading"));
document.body.appendChild(renderer.view);

ticker.add(function(time) {
    renderer.render(stage);
    // console.log(renderer.plugins.interaction.mouse.global.x + ", " + renderer.plugins.interaction.mouse.global.y);
});

ticker.start();
