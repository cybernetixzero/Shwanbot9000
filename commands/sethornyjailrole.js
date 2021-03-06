const { SlashCommandBuilder } = require('@discordjs/builders');

class SetHornyJailRoleCommand {
    constructor(configService, databaseService, hornyJailService, client) {
        this.configService = configService;
        this.databaseService = databaseService;
        this.hornyJailService = hornyJailService;
        this.client = client;

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

        this.configService.hornyJailRoleId = role.id;
        this.configService.hornyJailRoleName = role.name;
        this.configService.save();

        await interaction.reply(`Horny jail role has been set to ${role.name}`);
    }
}

module.exports = SetHornyJailRoleCommand;
