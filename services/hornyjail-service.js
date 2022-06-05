const { SlashCommandBuilder } = require('@discordjs/builders');

class HornyJailService {
    constructor(configProvider, databaseProvider, client) {
        this.configProvider = configProvider;
        this.databaseProvider = databaseProvider;
        this.client = client;

        this.description = 'Horny Jail';
    }
}
