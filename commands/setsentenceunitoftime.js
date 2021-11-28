const { SlashCommandBuilder } = require('@discordjs/builders');

class SetSentenceUnitOfTimeCommand {
    constructor(configService, client, rest) {
        this.configService = configService;
        this.client = client;
        this.rest = rest;

        this.name = 'setsentenceunitoftime';
        this.slashCommand = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Sets the sentence unit of time.')
            .addStringOption(option =>
                option.setName('selection')
                    .setDescription('Select the sentence unit of time.')
                    .setRequired(true)
                    .addChoice('Days', 'Days')
                    .addChoice('Weeks', 'Weeks')
                    .addChoice('Months', 'Months'));
    }

    execute = async (interaction) => {
        const selection = interaction.options.getString('selection');

        this.configService.json.sentenceUnitOfTime = selection;
        this.configService.save();

        await interaction.reply(`Sentence unit of time has been set to ${selection}`);
    }
}

module.exports = SetSentenceUnitOfTimeCommand;
