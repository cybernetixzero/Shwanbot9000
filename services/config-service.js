const { SlashCommandBuilder } = require('@discordjs/builders');

class ConfigService {
    constructor(configProvider, databaseProvider, client) {
        this.configProvider = configProvider;
        this.databaseProvider = databaseProvider;
        this.client = client;

        this.description = 'Config';
    }

    getSlashCommands = () => {
        let slashCommands = new Array();

        let setBonkEmojiSlashCommand = new SlashCommandBuilder()
            .setName('set bonk emoji')
            .setDescription('Sets the bonk emoji.')
            .addStringOption(option =>
                option.setName('emoji')
                    .setDescription('Enter the emoji that represents \"bonk\".')
                    .setRequired(true));

        slashCommands.push(setBonkEmojiSlashCommand);

        let setBonkThresholdSlashCommand = new SlashCommandBuilder()
            .setName('set bonk threshold')
            .setDescription('Sets the bonk threshold.')
            .addIntegerOption(option =>
                option.setName('value')
                    .setDescription('Enter the number of bonks required to be sentenced.')
                    .setRequired(true));

        slashCommands.push(setBonkThresholdSlashCommand);

        let setHornyJailRoleSlashCommand = new SlashCommandBuilder()
            .setName('set horny jail role')
            .setDescription('Sets the Horny Jail role.')
            .addRoleOption(option =>
                option.setName('role')
                    .setDescription('Enter the role that will be added to (or removed from) the user for Horny Jail.')
                    .setRequired(true));

        slashCommands.push(setHornyJailRoleSlashCommand);

        let setSentenceLengthSlashCommand = new SlashCommandBuilder()
            .setName('set sentence length')
            .setDescription('Sets the sentence length.')
            .addIntegerOption(option =>
                option.setName('value')
                    .setDescription('Enter the sentence length accrued for each bonk (relative to unit of time).')
                    .setRequired(true));

        slashCommands.push(setSentenceLengthSlashCommand);

        let setSentenceUnitOfTimeSlashCommand = new SlashCommandBuilder()
            .setName('set sentence unit of time')
            .setDescription('Sets the sentence unit of time.')
            .addStringOption(option =>
                option.setName('selection')
                    .setDescription('Select the sentence unit of time.')
                    .setRequired(true)
                    .addChoice('Days', 'Days')
                    .addChoice('Weeks', 'Weeks')
                    .addChoice('Months', 'Months'));

        slashCommands.push(setSentenceUnitOfTimeSlashCommand);

        let showConfigSlashCommand = new SlashCommandBuilder()
            .setName('show config')
            .setDescription('Shows the current configuration.');
        
        slashCommands.push(showConfigSlashCommand);

        return slashCommands;
    }

    executeSlashCommand = async (interaction) => {
        if (interaction.commandName === 'set bonk emoji') {
            const emoji = interaction.options.getString('emoji');
            
            const reply = this.performSetBonkEmoji(emoji);

            await interaction.reply(reply);
        }
        else if (interaction.commandName === 'set bonk threshold') {
            const value = interaction.options.getInteger('value');

            const reply = this.performSetBonkThreshold(value);

            await interaction.reply(reply);
        }
        else if (interaction.commandName === 'set horny jail role') {
            const role = interaction.options.getRole('role');

            const reply = this.performSetHornyJailRole(role);

            await interaction.reply(reply);
        }
        else if (interaction.commandName === 'set sentence length') {
            const value = interaction.options.getInteger('value');

            const reply = this.performSetSentenceLength(value);

            await interaction.reply(reply);
        }
        else if (interaction.commandName === 'set sentence unit of time') {
            const selection = interaction.options.getString('selection');

            const reply = this.performSetSentenceUnitOfTime(selection);

            await interaction.reply(reply);
        }
        else if (interaction.commandName === 'show config') {
            const reply = this.performShowConfig();

            await interaction.reply(reply);
        }
    }

    performSetBonkEmoji = (emoji) => {
        if (emoji === null || emoji === '')
            return 'Bonk emoji cannot be blank.';

        if (emoji.length > 0 && emoji.length <= 2) {
            this.configProvider.bonkEmojiName = emoji;
            this.configProvider.bonkEmojiId = null;
            this.configProvider.isBonkEmojiCustom = false;
        }
        else if (emoji.length > 2) {
            // Parse <:bonk:875363537374031892>
            // Parse <a:sadparrot:785328806504300585>
            const pattern = '<a?:(\\w{1,}):(\\d{1,})>';
            const match = emoji.match(pattern);
            
            if (match === null)
                return 'Bonk emoji was not recognised.';
            
            this.configProvider.bonkEmojiName = match[1];
            this.configProvider.bonkEmojiId = match[2];
            this.configProvider.isBonkEmojiCustom = true;
        }

        this.configProvider.save();

        return `Bonk emoji has been set to ${emoji}`;
    }

    performSetBonkThreshold = (value) => {
        if (value < 0)
            return 'Bonk threshold must be a positive number.';

        this.configProvider.bonkThreshold = value;
        this.configProvider.save();

        return `Bonk threshold has been set to ${value}`;
    }

    performSetHornyJailRole = (role) => {
        if (role === null)
            return 'Horny jail role cannot be blank.';

        this.configProvider.hornyJailRoleId = role.id;
        this.configProvider.hornyJailRoleName = role.name;
        this.configProvider.save();

        return `Horny jail role has been set to ${role.name}`;
    }

    performSetSentenceLength = (value) => {
        if (value < 0)
            return 'Sentence length must be a positive number.';

        this.configProvider.sentenceLength = value;
        this.configProvider.save();

        return `Sentence length has been set to ${value}`;
    }

    performSetSentenceUnitOfTime = (selection) => {
        if (selection === null)
            return 'Sentence unit of time cannot be blank.';

        this.configProvider.sentenceUnitOfTime = selection;
        this.configProvider.save();

        return `Sentence unit of time has been set to ${selection}`;
    }

    performShowConfig = () => {
        let bonkEmojiValue = '[Not set]';
        if (this.configProvider.bonkEmojiName !== null) {
            if (this.configProvider.isBonkEmojiCustom)
                bonkEmojiValue = `<:${this.configProvider.bonkEmojiName}:${this.configProvider.bonkEmojiId}>`;
            else
                bonkEmojiValue = this.configProvider.bonkEmojiName;
        }

        const bonkThresholdValue = (this.configProvider.bonkThreshold === null) ? '[Not set]' : this.configProvider.bonkThreshold.toString();
        const sentenceLengthValue = (this.configProvider.sentenceLength === null) ? '[Not set]' : this.configProvider.sentenceLength.toString();
        const sentenceUnitOfTimeValue = (this.configProvider.sentenceUnitOfTime === null) ? '[Not set]' : this.configProvider.sentenceUnitOfTime;
        const hornyJailRoleValue = (this.configProvider.hornyJailRoleName === null) ? '[Not set]' : this.configProvider.hornyJailRoleName;

        return `Bonk Emoji: ${bonkEmojiValue}\nBonk Threshold: ${bonkThresholdValue}\nSentence Length: ${sentenceLengthValue}\nSentence Unit of Time: ${sentenceUnitOfTimeValue}\nHorny Jail Role: ${hornyJailRoleValue}`;
    }
}

module.exports = ConfigService;
