const { Client, Intents, Collection } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const helpers = require('./helpers.js');
const config = require('./data/config.json');

const hornyJailService = require('./services/hornyjailservice.js');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

const rest = new REST({ version: '9' })
    .setToken(config.token);

const commands = helpers.getCommands();
const slashCommandsJson = commands.map(command => command.slashCommand.toJSON());

// Event handler for when it's ready.
client.once('ready', async () => {
    console.log('(ready)');

    // Set bot to online.
    client.user.setStatus("online");

    // Register commands with the server. (Temporary)
    await registerCommands();

    // Start the Horny Jail service background task.
    hornyJailService.startBackgroundTask();
});

// Event handler for when a command is invoked.
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand())
        return;

    // Fetch the command by name from the array.
    const command = commands.get(interaction.commandName);

    // Make sure it's a recognised command.
    if (command === null) {
        console.log(`(interactionCreate) Unknown command ${interaction.commandName}`);
        return;
    }
    
    try {
        await command.execute(interaction, config, client, rest);
    }
    catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
    }
});

// Event handler for when a reaction is added.
client.on('messageReactionAdd', async (reaction, user) => {
    // Check if it's a partial structure, if so then fetch it.
    if (reaction.partial) {
        try {
            await reaction.fetch();
        }
        catch (error) {
            console.log(`(messageReactionAdd) Couldn\'t fetch the message: ${error}`);
            return;
        }
    }

    console.log('(messageReactionAdd)');
    console.log(reaction);
});

// Event handler for when a reaction is removed.
client.on('messageReactionRemove', async (reaction, user) => {
    console.log('(messageReactionRemove)');
    console.log(reaction);
});

client.login(config.token);

// Register commands with the Discord server.
// This will be deprecated once the commands have been firmed up.
// They will be replaced with global commands. [https://discordjs.guide/interactions/registering-slash-commands.html#global-commands]
async function registerCommands() {
    if (config.clientId === null) {
        console.log('(registerCommands) ClientId is null.');
        return;
    }

    if (config.guildId === null) {
        console.log('(registerCommands) GuildId is null.');
        return;
    }

    try {
        await rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: slashCommandsJson });
    }
    catch (error) {
        console.log(`(registerCommands) ApplicationGuildCommands REST call failed: ${error}`);
    }
}
