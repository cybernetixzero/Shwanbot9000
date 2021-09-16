const { SlashCommandBuilder } = require('@discordjs/builders');
const helpers = require('../helpers.js');

const name = 'sethornyjailrole';

module.exports = {
    name: name,
    slashCommand: new SlashCommandBuilder()
        .setName(name)
        .setDescription('Sets the Horny Jail role.')
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('Enter the role that will be added to (or removed from) the user for Horny Jail.')
                .setRequired(true)),
    execute: async function(interaction, config, client, rest) {
        const role = interaction.options.getRole('role');

        if (role === null) {
            await interaction.reply('Horny Jail Role cannot be blank.');
            return;
        }

        config.hornyJailRoleId = role.id;
        config.hornyJailRoleName = role.name;
        
        helpers.saveConfigToDisk(config);

        await interaction.reply(`Horny Jail Role has been set to ${role.name}`);
    }
}
