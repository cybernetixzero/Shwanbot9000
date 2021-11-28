const { SlashCommandBuilder } = require('@discordjs/builders');

class ShoutCommand {
    constructor(configService, client, rest) {
        this.configService = configService;
        this.client = client;
        this.rest = rest;

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
