const { SlashCommandBuilder } = require('@discordjs/builders');

class SetBonkThresholdCommand {
    constructor(configService, client, rest) {
        this.configService = configService;
        this.client = client;
        this.rest = rest;

        this.name = 'setbonkthreshold';
        this.slashCommand = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Sets the bonk threshold.')
            .addIntegerOption(option =>
                option.setName('value')
                    .setDescription('Enter the number of bonks required to be sentenced.')
                    .setRequired(true));
    }

    execute = async (interaction) => {
        const value = interaction.options.getInteger('value');

        if (value < 0) {
            await interaction.reply('Bonk threshold must be a positive number.');
            return;
        }

        this.configService.json.bonkThreshold = value;
        this.configService.save();

        await interaction.reply(`Bonk threshold has been set to ${value}`);
    }
}

module.exports = SetBonkThresholdCommand;
