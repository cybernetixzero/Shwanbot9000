/*
       .__                         ___.           __   _______________  _______  _______   
  _____|  |____  _  _______    ____\_ |__   _____/  |_/   __   \   _  \ \   _  \ \   _  \  
 /  ___/  |  \ \/ \/ /\__  \  /    \| __ \ /  _ \   __\____    /  /_\  \/  /_\  \/  /_\  \ 
 \___ \|   Y  \     /  / __ \|   |  \ \_\ (  <_> )  |    /    /\  \_/   \  \_/   \  \_/   \
/____  >___|  /\/\_/  (____  /___|  /___  /\____/|__|   /____/  \_____  /\_____  /\_____  /
     \/     \/             \/     \/    \/                            \/       \/       \/ 

    by CybernetixZero
*/

const { Client, Intents, ThreadChannel } = require('discord.js');
const { REST } = require('@discordjs/rest');

const ConfigService = require('./services/configservice.js');
const DatabaseService = require('./services/databaseservice.js');
const CommandService = require('./services/commandsservice.js');
const HornyJailService = require('./services/hornyjailservice.js');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER']
});

const configService = new ConfigService();

const rest = new REST({ version: '9' })
    .setToken(configService.token);

const databaseService = new DatabaseService();
const commandService = new CommandService(configService, client, rest);
const hornyJailService = new HornyJailService(configService, databaseService);

// Event handler for when it's ready.
client.once('ready', async () => {
    console.log('(ready)');

    await databaseService.bindTables();

    // Register commands with the server.
    await commandService.registerCommands();

    const guild = await client.guilds.fetch(configService.guildId);

    // Initialise and run Horny Jail service.
    hornyJailService.setGuild(guild);
    hornyJailService.startTask();

    // Set bot to online.
    client.user.setStatus("online");
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

    // Call the horny jail service to tell it a reaction has been added.
    await hornyJailService.reactionChanged(reaction, 'Added');
});

// Event handler for when a reaction is removed.
client.on('messageReactionRemove', async (reaction, user) => {
    // Check if it's a partial structure, if so then fetch it.
    if (reaction.partial) {
        try {
            await reaction.fetch();
        }
        catch (error) {
            console.log(`(messageReactionRemove) Couldn\'t fetch the message: ${error}`);
            return;
        }
    }

    // Call the horny jail service to tell it a reaction has been removed.
    await hornyJailService.reactionChanged(reaction, 'Removed');
});

client.login(configService.token);
