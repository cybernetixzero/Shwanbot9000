const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

class CommandService {
    constructor(configService, databaseService, hornyJailService, client, rest) {
        this.configService = configService;
        this.databaseService = databaseService;
        this.hornyJailService = hornyJailService;
        this.client = client;
        this.rest = rest;

        this.bindCommands();
    }

    bindCommands = () => {
        this.commands = new Array();

        const commandFiles = fs
            .readdirSync('./commands')
            .filter(file => file.endsWith('.js'));

        for (const commandFile of commandFiles) {
            const commandClass = require(`../commands/${commandFile}`);
            if (commandClass !== null) {
                const command = new commandClass(this.configService, this.databaseService, this.hornyJailService, this.client);
                this.commands.push(command);
            }
        }

        this.slashCommandsJson = this.commands.map(command => command.slashCommand.toJSON());
    }

    registerCommands = async () => {
        if (this.configService.clientId === null) {
            console.log('(registerCommands) ClientId is null.');
            return;
        }
    
        if (this.configService.guildId === null) {
            console.log('(registerCommands) GuildId is null.');
            return;
        }
    
        try {
            await this.rest.put(Routes.applicationGuildCommands(this.configService.clientId, this.configService.guildId), { body: this.slashCommandsJson });
        }
        catch (error) {
            console.log(`(registerCommands) ApplicationGuildCommands REST call failed: ${error}`);
        }
    }

    performCommand = async (interaction) => {
        // Check if there are any commands bound.
        if (this.commands === null || this.commands.length == 0) {
            console.error('(performCommand) There are no commands available.');
            return;
        }

        // Get the specified command.
        const command = this.commands.find(command => command.name == interaction.commandName);
        
        // Make sure it's a recognised command.
        if (command === null) {
            console.log(`(performCommand) Unknown command ${interaction.commandName}`);
            return;
        }

        try {
            // Execute the command.
            await command.execute(interaction);
        }
        catch (error) {
            console.error(error);

            await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
        }
    }
}

module.exports = CommandService;
