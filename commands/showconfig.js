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
        let bonkEmojiValue = (this.configService.json.bonkEmojiId === null || this.configService.json.bonkEmojiName === null) ? '[Not set]' : `<${this.configService.json.bonkEmojiName}${this.configService.json.bonkEmojiId}>`;
        let bonkThresholdValue = (this.configService.json.bonkThreshold === null) ? '[Not set]' : this.configService.json.bonkThreshold.toString();
        let sentenceLengthValue = (this.configService.json.sentenceLength === null) ? '[Not set]' : this.configService.json.sentenceLength.toString();
        let sentenceUnitOfTimeValue = (this.configService.json.sentenceUnitOfTime === null) ? '[Not set]' : this.configService.json.sentenceUnitOfTime;
        let hornyJailRoleValue = (this.configService.json.hornyJailRoleName === null) ? '[Not set]' : this.configService.json.hornyJailRoleName;

        let reply = `Bonk Emoji: ${bonkEmojiValue}\nBonk Threshold: ${bonkThresholdValue}\nSentence Length: ${sentenceLengthValue}\nSentence Unit of Time: ${sentenceUnitOfTimeValue}\nHorny Jail Role: ${hornyJailRoleValue}`;
        await interaction.reply(reply);
    }
}

module.exports = ShowConfigCommand;
