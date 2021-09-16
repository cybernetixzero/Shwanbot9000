const { SlashCommandBuilder } = require('@discordjs/builders');
const helpers = require('../helpers.js');

const name = 'magic8ball';

// Source: https://en.wikipedia.org/wiki/Magic_8-Ball
const answers = [
    'It is certain.', 'It is decidedly so.', 'Without a doubt.', 'Yes definitely.', 'You may rely on it.', 'As I see it, yes.',
    'Most likely.', 'Outlook good.', 'Yes.', 'Signs point to yes.', 'Reply hazy, try again.', 'Ask again later.', 'Better not tell you now.',
    'Cannot predict right now.', 'Concentrate and ask again.', 'Don\'t count on it.', 'My reply is no.', 'My sources say no.',
    'Outlook not so good.', 'Very doubtful.'
];

module.exports = {
    name: name,
    slashCommand: new SlashCommandBuilder()
        .setName(name)
        .setDescription('Ask it a question and discover your destiny.')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('What do you wish to ask the Magic Eight Ball?')
                .setRequired(true)),
    execute: async function(interaction, config, client, rest) {
        const question = interaction.options.getString('question');

        const index = Math.floor(Math.random() * answers.length);
        const reply = `:question: ${question}\n:8ball: ${answers[index]}`;

        await interaction.reply(reply);
    }
}
