class HornyJailService {
    constructor(configService, databaseService) {
        this.configService = configService;
        this.databaseService = databaseService;
        
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

    reactionAdded = async (reaction) => {
        // Check for the bonk emoji, bail if it's not.
        if (reaction._emoji.name !== this.configService.json.bonkEmojiName)
            return;

        // Check if the author is a bot, bail if it is.
        if (reaction.message.author.bot)
            return;

        const userId = reaction.message.author.id;
        const userName = reaction.message.author.username;

        let sentence = await this.databaseService.getCurrentSentence(userId);
        if (sentence === null) {
            sentence = {
                id: 0,
                userId: userId,
                userName: userName,
                bonks: 0,
                commencesAt: new Date(),
                expiresAt: new Date(),
                isActive: false
            };
        }
        
        this.calculateSentence(sentence, 1);

        if (sentence.id === 0)
            await this.databaseService.createSentenceFromEntity(sentence);
        else
            await this.databaseService.updateSentenceFromEntity(sentence);

        console.log('Bonk Added!');
    }

    reactionRemoved = async (reaction) => {
        // Check for the bonk emoji, bail if it's not.
        if (reaction._emoji.name !== this.configService.json.bonkEmojiName)
            return;

        // Check if the author is a bot, bail if it is.
        if (reaction.message.author.bot)
            return;

        const userId = reaction.message.author.id;
        const userName = reaction.message.author.username;

        let sentence = await this.databaseService.getCurrentSentence(userId);
        if (sentence === null)
            return;
        
        this.calculateSentence(sentence, -1);

        await this.databaseService.updateSentenceFromEntity(sentence);

        console.log('Bonk Removed!');
    }

    calculateSentence = (sentence, adjustment) => {
        // Update bonks by the adjustment value.
        sentence.bonks += adjustment;

        // Expire sentence if bonks is zero or less.
        if (sentence.bonks <= 0) {
            sentence.bonks = 0;
            sentence.expiresAt = new Date(sentence.commencesAt.getTime());
            sentence.isActive = false;
            return;
        }

        // Activate the sentence if bonks reaches the threshold.
        if (sentence.bonks >= this.configService.json.bonkThreshold)
            sentence.isActive = true;
        else
            sentence.isActive = false;

        // Calculate the sentence expiry.
        let days = 0;
        switch (this.configService.json.sentenceUnitOfTime) {
            case 'Days':
                days = this.configService.json.sentenceLength * sentence.bonks;
                break;
            case 'Weeks':
                days = this.configService.json.sentenceLength * sentence.bonks * 7;
                break;
            case 'Months':
                days = this.configService.json.sentenceLength * sentence.bonks * 28;
                break;
        }
        sentence.expiresAt = new Date(sentence.commencesAt.getTime());
        sentence.expiresAt.setDate(sentence.expiresAt.getDate() + days);
    }
}

module.exports = HornyJailService;
