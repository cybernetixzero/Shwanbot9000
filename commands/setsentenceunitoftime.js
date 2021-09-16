const { SlashCommandBuilder } = require('@discordjs/builders');
const helpers = require('../helpers.js');

const name = 'setsentenceunitoftime';

module.exports = {
    name: name,
    slashCommand: new SlashCommandBuilder()
        .setName(name)
        .setDescription('Sets the sentence unit of time.')
        .addStringOption(option =>
            option.setName('selection')
                .setDescription('Select the sentence unit of time.')
                .setRequired(true)
                .addChoice('Days', 'Days')
                .addChoice('Weeks', 'Weeks')
                .addChoice('Months', 'Months')),
    execute: async function(interaction, config, client, rest) {
        const selection = interaction.options.getString('selection');

        config.sentenceUnitOfTime = selection;

        helpers.saveConfigToDisk(config);

        await interaction.reply(`Sentence Unit of Time has been set to ${selection}`);
    }
}
