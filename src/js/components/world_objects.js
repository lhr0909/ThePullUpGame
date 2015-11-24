var worldObjects = function(viewportWidth, viewportHeight, pixiGraphics) {
    this.friction = 0.03;
    this.mainObjectSize = 30;
    this.bulletSize = 5;

    this.viewport = {
        width: viewportWidth,
        height: viewportHeight
    };

    this.mainObject = {
        position: {
            x: this.viewport.width / 2,
            y: this.viewport.height / 2
        },
        velocity: {
            x: 0,
            y: 0
        }
    };

    this.bullets = [];

    var gfx = pixiGraphics;
    this.render = function() {
        gfx.clear();
        gfx.lineStyle(0);
        gfx.beginFill(0xfff440, 1.0);
        gfx.drawCircle(
            this.mainObject.position.x,
            this.mainObject.position.y,
            this.mainObjectSize
        );
        gfx.endFill();
    };
};

worldObjects.prototype.step = function(mainAccleration, timeStep, gameOverCallback) {
    if (!mainAccleration.x) {
        mainAccleration.x = 0;
    }

    if (!mainAccleration.y) {
        mainAccleration.y = 0;
    }

    var frictionForce = {
        x: -this.friction * this.mainObject.velocity.x,
        y: -this.friction * this.mainObject.velocity.y
    };

    var newV = {
        x: this.mainObject.velocity.x + (mainAccleration.x + frictionForce.x) * timeStep,
        y: this.mainObject.velocity.y + (mainAccleration.y + frictionForce.y) * timeStep
    };

    this.mainObject.velocity = newV;

    var newPos = {
        x: this.mainObject.position.x + this.mainObject.velocity.x * timeStep,
        y: this.mainObject.position.y + this.mainObject.velocity.y * timeStep
    };

    this.mainObject.position = newPos;

    if (this.mainObject.position.x > this.viewport.width ||
        this.mainObject.position.x < 0 ||
        this.mainObject.position.y > this.viewport.height ||
        this.mainObject.position.y < 0) {

        gameOverCallback();
    }
};

module.exports = worldObjects;
