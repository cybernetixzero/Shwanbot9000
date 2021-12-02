const { SlashCommandBuilder } = require('@discordjs/builders');

class ShowConfigCommand {
    constructor(configService, client, rest) {
        this.configService = configService;
        this.client = client;
        this.rest = rest;

        this.name = 'showconfig';
        this.slashCommand = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Shows the current configuration.');
    }

    execute = async (interaction) => {
        let bonkEmojiValue = '[Not set]';
        if (this.configService.bonkEmojiName !== null) {
            if (this.configService.isBonkEmojiCustom)
                bonkEmojiValue = `<:${this.configService.bonkEmojiName}:${this.configService.bonkEmojiId}>`;
            else
                bonkEmojiValue = this.configService.bonkEmojiName;
        }

        const bonkThresholdValue = (this.configService.bonkThreshold === null) ? '[Not set]' : this.configService.bonkThreshold.toString();
        const sentenceLengthValue = (this.configService.sentenceLength === null) ? '[Not set]' : this.configService.sentenceLength.toString();
        const sentenceUnitOfTimeValue = (this.configService.sentenceUnitOfTime === null) ? '[Not set]' : this.configService.sentenceUnitOfTime;
        const hornyJailRoleValue = (this.configService.hornyJailRoleName === null) ? '[Not set]' : this.configService.hornyJailRoleName;

        const reply = `Bonk Emoji: ${bonkEmojiValue}\nBonk Threshold: ${bonkThresholdValue}\nSentence Length: ${sentenceLengthValue}\nSentence Unit of Time: ${sentenceUnitOfTimeValue}\nHorny Jail Role: ${hornyJailRoleValue}`;
        
        await interaction.reply(reply);
    }
}

module.exports = ShowConfigCommand;
