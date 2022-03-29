const { SlashCommandBuilder } = require('@discordjs/builders');

class ShowSentencesCommand {
    constructor(configService, databaseService, hornyJailService, client) {
        this.configService = configService;
        this.databaseService = databaseService;
        this.hornyJailService = hornyJailService;
        this.client = client;

        this.name = 'showsentences';
        this.slashCommand = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Shows all the members who are currently in horny jail.');
    }

    execute = async (interaction) => {
        const date = new Date();

        const sentences = await this.databaseService.getActiveSentences();

        let reply = '```';
        if (sentences.length == 1)
            reply += 'There is currently 1 member in horny jail.\n\n';
        else
            reply += `There are currently ${sentences.length} members in horny jail.\n\n`;

        reply += 'B: Bonks, D: Days, DL: Days Left\n\n';

        reply += ' User                      | Days | Left \n';
        reply += '-----------------------------------------\n';

        for (const sentence of sentences) {
            const timeDifference = (sentence.expiresAt.getTime() - date.getTime());
            const releaseDays = Math.ceil((timeDifference / (1000 * 3600 * 24)));

            const sentenceDaysPlural = this.hornyJailService.getDaysPlural(sentence.days);
            const releaseDaysPlural = this.hornyJailService.getDaysPlural(releaseDays);
            const bonksPlural = this.hornyJailService.getTimesPlural(sentence.bonks);

            "".padEnd()

            reply += `<@${sentence.userId}> has been bonked ${bonksPlural} and is sentenced for ${sentenceDaysPlural}. Due for release in ${releaseDaysPlural}.`;
        }

        reply += '```';

        await interaction.reply(reply);
    }
}

module.exports = ShowSentencesCommand;
