const { SlashCommandBuilder } = require('@discordjs/builders');

class Magic8BallCommand {
    constructor(configService, databaseService, hornyJailService, client) {
        this.configService = configService;
        this.databaseService = databaseService;
        this.hornyJailService = hornyJailService;
        this.client = client;

        this.name = 'magic8ball';
        this.slashCommand = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Ask it a question and discover your destiny.')
            .addStringOption(option =>
                option.setName('question')
                    .setDescription('What do you wish to ask the Magic Eight Ball?')
                    .setRequired(true));

        // Source: https://en.wikipedia.org/wiki/Magic_8-Ball
        this.answers = [
            'It is certain.', 'It is decidedly so.', 'Without a doubt.', 'Yes definitely.', 'You may rely on it.', 'As I see it, yes.',
            'Most likely.', 'Outlook good.', 'Yes.', 'Signs point to yes.', 'Reply hazy, try again.', 'Ask again later.', 'Better not tell you now.',
            'Cannot predict right now.', 'Concentrate and ask again.', 'Don\'t count on it.', 'My reply is no.', 'My sources say no.',
            'Outlook not so good.', 'Very doubtful.'
        ];
    }

    execute = async (interaction) => {
        const question = interaction.options.getString('question');

        const index = Math.floor(Math.random() * this.answers.length);
        const reply = `:question: ${question}\n:8ball: ${this.answers[index]}`;

        await interaction.reply(reply);
    }
}

module.exports = Magic8BallCommand;
