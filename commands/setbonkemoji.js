const { SlashCommandBuilder } = require('@discordjs/builders');
const helpers = require('../helpers.js');

const name = 'setbonkemoji';

module.exports = {
    name: name,
    slashCommand: new SlashCommandBuilder()
        .setName(name)
        .setDescription('Sets the bonk emoji.')
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('Enter the emoji that represents \"bonk\".')
                .setRequired(true)),
    execute: async function(interaction, config, client, rest) {
        const emoji = interaction.options.getString('emoji');

        console.log(emoji);

        if (emoji === null || emoji === '') {
            await interaction.reply('Bonk Emoji cannot be blank.');
            return;
        }

        // Parse <:bonk:875363537374031892>
        // Parse <a:sadparrot:785328806504300585>
        const pattern = '<(a?:\\w{1,}:)(\\d{1,})>';
        const match = emoji.match(pattern);
        
        console.log(match);

        if (match === null) {
            await interaction.reply('Bonk Emoji was not recognised.');
            return;
        }
        
        config.bonkEmojiName = match[1];
        config.bonkEmojiId = match[2];

        helpers.saveConfigToDisk(config);

        await interaction.reply(`Bonk Emoji has been set to ${emoji}`);
    }
}
