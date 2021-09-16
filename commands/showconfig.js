const { SlashCommandBuilder } = require('@discordjs/builders');
const helpers = require('../helpers.js');

const name = 'showconfig';

module.exports = {
    name: name,
    slashCommand: new SlashCommandBuilder()
        .setName(name)
        .setDescription('Shows the current configuration.'),
    execute: async function(interaction, config, client, rest) {
        let bonkEmojiValue = (config.bonkEmojiId === null || config.bonkEmojiName === null) ? '[Not set]' : `<${config.bonkEmojiName}${config.bonkEmojiId}>`;
        let bonkThresholdValue = (config.bonkThreshold === null) ? '[Not set]' : config.bonkThreshold.toString();
        let sentenceLengthValue = (config.sentenceLength === null) ? '[Not set]' : config.sentenceLength.toString();
        let sentenceUnitOfTimeValue = (config.sentenceUnitOfTime === null) ? '[Not set]' : config.sentenceUnitOfTime;
        let hornyJailRoleValue = (config.hornyJailRoleName === null) ? '[Not set]' : config.hornyJailRoleName;

        let reply = `Bonk Emoji: ${bonkEmojiValue}\nBonk Threshold: ${bonkThresholdValue}\nSentence Length: ${sentenceLengthValue}\nSentence Unit of Time: ${sentenceUnitOfTimeValue}\nHorny Jail Role: ${hornyJailRoleValue}`;
        await interaction.reply(reply);
    }
}
