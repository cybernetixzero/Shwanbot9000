const { Client, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');

const ConfigService = require('./services/configservice.js');
const CommandService = require('./services/commandsservice.js');
const HornyJailService = require('./services/hornyjailservice.js');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

const configService = new ConfigService();

const rest = new REST({ version: '9' })
    .setToken(configService.json.token);

const commandService = new CommandService(configService, client, rest);
const hornyJailService = new HornyJailService(configService, client, rest);

// Event handler for when it's ready.
client.once('ready', async () => {
    console.log('(ready)');

    // Set bot to online.
    client.user.setStatus("online");

    // Register commands with the server.
    await commandService.registerCommands();

    // Start the Horny Jail service task;
    hornyJailService.startTask();
});

// Event handler for when a command is invoked.
client.on('interactionCreate', async (interaction) => {
    // Check if the interaction is a command.
    if (!interaction.isCommand())
        return;

    // Call the command service to perform the command.
    await commandService.performCommand(interaction);
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

    console.log('(reactionAdded)');

    // Call the horny jail service to tell it a reaction has been added.
    hornyJailService.reactionAdded(reaction, user);
});

// Event handler for when a reaction is removed.
client.on('messageReactionRemove', async (reaction, user) => {
    console.log('(reactionRemoved)');

    // Call the horny jail service to tell it a reaction has been removed.
    hornyJailService.reactionRemoved(reaction, user);
});

client.login(configService.json.token);
