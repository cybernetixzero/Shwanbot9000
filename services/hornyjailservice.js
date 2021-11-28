class HornyJailService {
    constructor(configService, client, rest) {
        this.configService = configService;
        this.client = client;
        this.rest = rest;
        // this.database = database;
        
        this.hasStarted = false;
        this.handle = 0;
        this.interval = 3000; // 3 Seconds.
    }

    startTask = () => {
        if (this.hasStarted)
            return;

        this.handle = setInterval(this.runTask, this.interval);
    }

    stopTask = () => {
        if (!this.hasStarted)
            return;

        clearInterval(this.handle);
        this.handle = 0;
    }

    runTask = () => {
        console.log("(hornyJailService) runTask");
    }

    reactionAdded = (reaction, user) => {
        console.log(reaction);
    }

    reactionRemoved = (reaction, user) => {
        console.log(reaction);
    }
}

module.exports = HornyJailService;