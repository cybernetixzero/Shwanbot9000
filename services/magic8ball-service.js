const { SlashCommandBuilder } = require('@discordjs/builders');

class Magic8BallService {
    constructor(configProvider, databaseProvider, client) {
        this.configProvider = configProvider;
        this.databaseProvider = databaseProvider;
        this.client = client;

        this.description = 'Magic 8 Ball';

        // Source: https://en.wikipedia.org/wiki/Magic_8-Ball
        this.answers = [
            'It is certain.', 'It is decidedly so.', 'Without a doubt.', 'Yes definitely.', 'You may rely on it.', 'As I see it, yes.',
            'Most likely.', 'Outlook good.', 'Yes.', 'Signs point to yes.', 'Reply hazy, try again.', 'Ask again later.', 'Better not tell you now.',
            'Cannot predict right now.', 'Concentrate and ask again.', 'Don\'t count on it.', 'My reply is no.', 'My sources say no.',
            'Outlook not so good.', 'Very doubtful.'
        ];
    }

    getSlashCommands = () => {
        let slashCommands = new Array();

        let magic8BallSlashCommand = new SlashCommandBuilder()
            .setName('magic 8 ball')
            .setDescription('Ask it a question and discover your destiny.')
            .addStringOption(option =>
                option.setName('question')
                    .setDescription('What do you wish to ask the Magic Eight Ball?')
                    .setRequired(true));

        slashCommands.push(magic8BallSlashCommand);

        return slashCommands;
    }

    executeSlashCommand = async (interaction) => {
        if (interaction.commandName == 'magic 8 ball') {
            const question = interaction.options.getString('question');
            
            const reply = this.performMagic8Ball(question);

            await interaction.reply(reply);
        }
    }

    performMagic8Ball = (question) => {
        const index = Math.floor(Math.random() * this.answers.length);
        return `:question: ${question}\n:8ball: ${this.answers[index]}`;
    }
}

module.exports = Magic8BallService;
