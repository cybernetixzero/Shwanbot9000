const { SlashCommandBuilder } = require('@discordjs/builders');
const helpers = require('../helpers.js');

const name = 'shout';

module.exports = {
    name: name,
    slashCommand: new SlashCommandBuilder()
        .setName(name)
        .setDescription('You know what it does.'),
    execute: async function(interaction, config, client, rest) {
        await interaction.reply('SHAWN');
    }
}
