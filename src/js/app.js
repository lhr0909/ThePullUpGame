var PIXI = require('pixi.js');

var viewportWidth = window.innerWidth;
var viewportHeight = window.innerHeight;

var ticker = PIXI.ticker.shared;
ticker.autoStart = false;
ticker.stop();

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(viewportWidth, viewportHeight, {
    backgroundColor: 0x1099bb
});

var stage = new PIXI.Container();
var interactionManager = renderer.plugins.interaction;

var basicText = new PIXI.Text('Basic text in pixi');
basicText.x = 30;
basicText.y = 90;

stage.addChild(basicText);

var style = {
    font : 'bold italic 36px Arial',
    fill : '#F7EDCA',
    stroke : '#4a1850',
    strokeThickness : 5,
    dropShadow : true,
    dropShadowColor : '#555555',
    dropShadowAngle : Math.PI / 6,
    dropShadowDistance : 6,
    wordWrap : true,
    wordWrapWidth : 440
};

var richText = new PIXI.Text('Rich text with a lot of options and across multiple lines',style);
richText.x = 30;
richText.y = 180;

stage.addChild(richText);

var counter = 0;

console.log(interactionManager);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

ticker.add(function(time) {
    renderer.render(stage);
    //console.log(interactionManager.mouse.global.x + ", " + interactionManager.mouse.global.y);
});

ticker.start();
