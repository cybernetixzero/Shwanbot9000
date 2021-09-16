const { SlashCommandBuilder } = require('@discordjs/builders');
const helpers = require('../helpers.js');

const name = 'setsentencelength';

module.exports = {
    name: name,
    slashCommand: new SlashCommandBuilder()
        .setName(name)
        .setDescription('Sets the sentence length.')
        .addIntegerOption(option =>
            option.setName('value')
                .setDescription('Enter the sentence length accrued for each bonk (relative to unit of time).')
                .setRequired(true)),
    execute: async function(interaction, config, client, rest) {
        const value = interaction.options.getInteger('value');

        if (value < 0) {
            await interaction.reply('Sentence Length must be a positive number.');
            return;
        }

        config.sentenceLength = value;

        helpers.saveConfigToDisk(config);

        await interaction.reply(`Sentence Length has been set to ${value}`);
    }
}
