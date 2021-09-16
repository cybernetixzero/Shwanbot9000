const { SlashCommandBuilder } = require('@discordjs/builders');
const helpers = require('../helpers.js');

const name = 'setbonkthreshold';

module.exports = {
    name: name,
    slashCommand: new SlashCommandBuilder()
        .setName(name)
        .setDescription('Sets the bonk threshold.')
        .addIntegerOption(option =>
            option.setName('value')
                .setDescription('Enter the number of bonks required to be sentenced.')
                .setRequired(true)),
    execute: async function(interaction, config, client, rest) {
        const value = interaction.options.getInteger('value');

        if (value < 0) {
            await interaction.reply('Bonk Threshold must be a positive number.');
            return;
        }

        config.bonkThreshold = value;

        helpers.saveConfigToDisk(config);

        await interaction.reply(`Bonk Threshold has been set to ${value}`);
    }
}
