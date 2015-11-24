var timer = function() {
    this.startTime = Date.now();
};

timer.prototype.updateTime = function(updateTimeCallback) {
    // returns time in seconds, and feeds into the callback
    updateTimeCallback((Date.now() - this.startTime) / 1000);
};

module.exports = timer;
