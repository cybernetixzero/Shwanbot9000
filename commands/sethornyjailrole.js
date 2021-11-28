const { SlashCommandBuilder } = require('@discordjs/builders');

class SetHornyJailRoleCommand {
    constructor(configService, client, rest) {
        this.configService = configService;
        this.client = client;
        this.rest = rest;

        this.name = 'sethornyjailrole';
        this.slashCommand = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Sets the Horny Jail role.')
            .addRoleOption(option =>
                option.setName('role')
                    .setDescription('Enter the role that will be added to (or removed from) the user for Horny Jail.')
                    .setRequired(true));
    }

    execute = async (interaction) => {
        const role = interaction.options.getRole('role');

        if (role === null) {
            await interaction.reply('Horny jail role cannot be blank.');
            return;
        }

        this.configService.json.hornyJailRoleId = role.id;
        this.configService.json.hornyJailRoleName = role.name;
        this.configService.save();

        await interaction.reply(`Horny jail role has been set to ${role.name}`);
    }
}

module.exports = SetHornyJailRoleCommand;
