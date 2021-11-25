//const Sequelize = require('sequelize');

let backgroundTaskParams = {
    hasStarted: false,
    handle: 0,
    //interval: 300000 // 5 Minutes
    interval: 3000 // 3 Seconds
};

module.exports = {
    startBackgroundTask: function() {
        if (backgroundTaskParams.hasStarted)
            return;

        backgroundTaskParams.handle = setInterval(this.performBackgroundTask, backgroundTaskParams.interval);
    },
    stopBackgroundTask: function() {
        if (!backgroundTaskParams.hasStarted)
            return;

        clearInterval(backgroundTaskParams.intervalHandle);
        backgroundTaskParams.handle = 0;
    },
    performBackgroundTask: function () {
        console.log("backgroundTaskTick");
    },
    bonkReactionAdded: function () {
        
    },
    bonkReactionRemoved: function () {

    }
}
