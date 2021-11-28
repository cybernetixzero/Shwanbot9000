const { SlashCommandBuilder } = require('@discordjs/builders');

class SetSentenceLengthCommand {
    constructor(configService, client, rest) {
        this.configService = configService;
        this.client = client;
        this.rest = rest;

        this.name = 'setsentencelength';
        this.slashCommand = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Sets the sentence length.')
            .addIntegerOption(option =>
                option.setName('value')
                    .setDescription('Enter the sentence length accrued for each bonk (relative to unit of time).')
                    .setRequired(true));
    }

    execute = async (interaction) => {
        const value = interaction.options.getInteger('value');

        if (value < 0) {
            await interaction.reply('Sentence length must be a positive number.');
            return;
        }

        this.configService.json.sentenceLength = value;
        this.configService.save();

        await interaction.reply(`Sentence length has been set to ${value}`);
    }
}

module.exports = SetSentenceLengthCommand;
