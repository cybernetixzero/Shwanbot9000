class HornyJailService {
    constructor(configService, databaseService, client) {
        this.configService = configService;
        this.databaseService = databaseService;
        this.client = client;
        
        this.hasStarted = false;
        this.handle = 0;
        this.interval = 60000; // 60 seconds
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

    runTask = async () => {
        const date = new Date();
        
        const role = await this.guild.roles.fetch(this.configService.hornyJailRoleId);
        
        const sentences = await this.databaseService.getActiveSentences();

        for (let i = 0; i < sentences.length; i++) {
            const sentence = sentences[i];

            if (sentence.expiresAt <= date) {
                sentence.isActive = false;
                this.databaseService.updateSentenceFromEntity(sentence);

                const member = await this.guild.members.fetch(sentence.userId);

                if (role !== null && member !== null) {
                    member.roles.remove(role);

                    console.log(`${sentence.userName} has been removed from horny jail (sentence expired).`);
                }
            }
        }
    }

    setGuild = (guild) => {
        this.guild = guild;
    }

    reactionChanged = async (reaction, action) => {
        if (reaction === null)
            return;

        // Check for the bonk emoji, bail if it's not.
        if (reaction._emoji.name !== this.configService.bonkEmojiName)
            return;

        // Check if the author is a bot, bail if it is.
        if (reaction.message.author.bot)
            return;

        const userId = reaction.message.author.id;
        const userName = reaction.message.author.username;

        let sentence = await this.databaseService.getCurrentSentence(userId);

        if (action === 'Added' && sentence === null) {
            sentence = {
                id: 0,
                userId: userId,
                userName: userName,
                bonks: 0,
                commencesAt: new Date(),
                expiresAt: new Date(),
                days: 0,
                isActive: false
            };
        }
        else if (action === 'Removed' && sentence === null)
            return;

        const adjustment = (action === 'Added' ? 1 : (action == 'Removed' ? -1 : 0));

        const isActiveBefore = sentence.isActive;

        this.calculateSentence(sentence, adjustment);

        const isActiveAfter = sentence.isActive;
        const isActiveChanged = (isActiveBefore !== isActiveAfter);

        if (action === 'Added' && sentence.id === 0)
            await this.databaseService.createSentenceFromEntity(sentence);
        else if (sentence.id > 0)
            await this.databaseService.updateSentenceFromEntity(sentence);

        if (isActiveChanged) {
            const role = await this.guild.roles.fetch(this.configService.hornyJailRoleId);
            const member = await this.guild.members.fetch(userId);
            
            if (role !== null && member !== null) {
                if (sentence.isActive) {
                    member.roles.add(role);

                    console.log(`${sentence.userName} has been added to horny jail (>= bonk threshold).`);

                    const channel = await this.client.channels.fetch(reaction.message.channelId);
                    if (channel !== null) {
                        const message = this.generateActiveMessage(sentence);
                        channel.send(message);
                    }
                }
                else {
                    member.roles.remove(role);

                    console.log(`${sentence.userName} has been removed from horny jail (< bonk threshold).`);
                }
            }
        }
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
        if (sentence.bonks >= this.configService.bonkThreshold)
            sentence.isActive = true;
        else
            sentence.isActive = false;

        // Calculate the sentence expiry.
        let days = 0;
        switch (this.configService.sentenceUnitOfTime) {
            case 'Days':
                days = this.configService.sentenceLength * sentence.bonks;
                break;
            case 'Weeks':
                days = this.configService.sentenceLength * sentence.bonks * 7;
                break;
            case 'Months':
                days = this.configService.sentenceLength * sentence.bonks * 28;
                break;
        }

        sentence.days = days;
        sentence.expiresAt = new Date(sentence.commencesAt.getTime());
        sentence.expiresAt.setDate(sentence.expiresAt.getDate() + days);
    }

    generateActiveMessage = (sentence) => {
        const dayPlural = (sentence.days == 1 ? 'day' : 'days');

        const messages = [
            `Oooff! <@${sentence.userId}> just scored ${sentence.days} ${dayPlural} in hornitary confinement.`,
            `Bonk me sideways! It looks like <@${sentence.userId}> can't keep their hand off it and scored themselves ${sentence.days} ${dayPlural} in the slammer.`,
            `I sentence <@${sentence.userId}> to kiss my ass and ${sentence.days} ${dayPlural} in horny jail.`,
            `<@${sentence.userId}> you're under arrest for excessive bonkage. You are sentenced to horny jail for ${sentence.days} ${dayPlural}.`,
            `Bonk Alert! To prevent <@${sentence.userId}> from going blind they are being sentenced to horny jail for a period of ${sentence.days} ${dayPlural}.`,
            `<@${sentence.userId}> is heading to the horny place to frolic with their kind for ${sentence.days} ${dayPlural}.`,
            `It looks like <@${sentence.userId}> is going bonkers! You'll be safe in horny jail for ${sentence.days} ${dayPlural}.`,
            `Oh my! *clutches pearls* <@${sentence.userId}> is way too horny. Off to the sin bin you go for ${sentence.days} ${dayPlural}.`
        ];

        const index = Math.floor(Math.random() * messages.length);
        return messages[index];
    }
}

module.exports = HornyJailService;
