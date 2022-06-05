const { SlashCommandBuilder } = require('@discordjs/builders');

class ShoutService {
    constructor(configProvider, databaseProvider, client) {
        this.configProvider = configProvider;
        this.databaseProvider = databaseProvider;
        this.client = client;

        this.description = 'Shout';
    }

    getSlashCommands = () => {
        let slashCommands = new Array();

        let shoutSlashCommand = new SlashCommandBuilder()
            .setName('shout')
            .setDescription('You know what it does.');

        slashCommands.push(shoutSlashCommand);

        return slashCommands;
    }

    executeSlashCommand = async (interaction) => {
        if (interaction.commandName == 'shout') {
            const reply = this.performShout();

            await interaction.reply(reply);
        }
    }

    performShout = () => {
        return 'SHAWN!!!';
    }
}

module.exports = ShoutService;
