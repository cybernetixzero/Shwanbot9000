const { SlashCommandBuilder } = require('@discordjs/builders');

class ShoutCommand {
    constructor(configService, databaseService, hornyJailService, client) {
        this.configService = configService;
        this.databaseService = databaseService;
        this.hornyJailService = hornyJailService;
        this.client = client;

        this.name = 'shout';
        this.slashCommand = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('You know what it does.');
    }

    execute = async (interaction) => {
        await interaction.reply('SHAWN!!!');
    }
}

module.exports = ShoutCommand;
