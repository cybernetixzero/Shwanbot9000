const { SlashCommandBuilder } = require('@discordjs/builders');

class SetBonkEmojiCommand {
    constructor(configService, databaseService, hornyJailService, client) {
        this.configService = configService;
        this.databaseService = databaseService;
        this.hornyJailService = hornyJailService;
        this.client = client;

        this.name = 'setbonkemoji';
        this.slashCommand = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Sets the bonk emoji.')
            .addStringOption(option =>
                option.setName('emoji')
                    .setDescription('Enter the emoji that represents \"bonk\".')
                    .setRequired(true));
    }

    execute = async (interaction) => {
        const emoji = interaction.options.getString('emoji');

        if (emoji === null || emoji === '') {
            await interaction.reply('Bonk emoji cannot be blank.');
            return;
        }

        if (emoji.length > 0 && emoji.length <= 2) {
            this.configService.bonkEmojiName = emoji;
            this.configService.bonkEmojiId = null;
            this.configService.isBonkEmojiCustom = false;
        }
        else if (emoji.length > 2) {
            // Parse <:bonk:875363537374031892>
            // Parse <a:sadparrot:785328806504300585>
            const pattern = '<a?:(\\w{1,}):(\\d{1,})>';
            const match = emoji.match(pattern);
            
            if (match === null) {
                await interaction.reply('Bonk emoji was not recognised.');
                return;
            }
            
            this.configService.bonkEmojiName = match[1];
            this.configService.bonkEmojiId = match[2];
            this.configService.isBonkEmojiCustom = true;
        }

        this.configService.save();

        await interaction.reply(`Bonk emoji has been set to ${emoji}`);
    }
}

module.exports = SetBonkEmojiCommand;
