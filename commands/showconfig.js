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
        if (this.configService.json.bonkEmojiName !== null) {
            if (this.configService.json.isBonkEmojiCustom)
                bonkEmojiValue = `<:${this.configService.json.bonkEmojiName}:${this.configService.json.bonkEmojiId}>`;
            else
                bonkEmojiValue = this.configService.json.bonkEmojiName;
        }

        const bonkThresholdValue = (this.configService.json.bonkThreshold === null) ? '[Not set]' : this.configService.json.bonkThreshold.toString();
        const sentenceLengthValue = (this.configService.json.sentenceLength === null) ? '[Not set]' : this.configService.json.sentenceLength.toString();
        const sentenceUnitOfTimeValue = (this.configService.json.sentenceUnitOfTime === null) ? '[Not set]' : this.configService.json.sentenceUnitOfTime;
        const hornyJailRoleValue = (this.configService.json.hornyJailRoleName === null) ? '[Not set]' : this.configService.json.hornyJailRoleName;

        const reply = `Bonk Emoji: ${bonkEmojiValue}\nBonk Threshold: ${bonkThresholdValue}\nSentence Length: ${sentenceLengthValue}\nSentence Unit of Time: ${sentenceUnitOfTimeValue}\nHorny Jail Role: ${hornyJailRoleValue}`;
        
        await interaction.reply(reply);
    }
}

module.exports = ShowConfigCommand;
