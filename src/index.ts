/*
       .__                         ___.           __   _______________  _______  _______   
  _____|  |____  _  _______    ____\_ |__   _____/  |_/   __   \   _  \ \   _  \ \   _  \  
 /  ___/  |  \ \/ \/ /\__  \  /    \| __ \ /  _ \   __\____    /  /_\  \/  /_\  \/  /_\  \ 
 \___ \|   Y  \     /  / __ \|   |  \ \_\ (  <_> )  |    /    /\  \_/   \  \_/   \  \_/   \
/____  >___|  /\/\_/  (____  /___|  /___  /\____/|__|   /____/  \_____  /\_____  /\_____  /
     \/     \/             \/     \/    \/                            \/       \/       \/ 
    by CybernetixZero
*/

import { Client, Intents } from 'discord.js';
//import { REST } from '@discordjs/rest';

import { ConfigService } from './services/config-service';

const configService = new ConfigService();
configService.load();

const client = new Client({
     intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
     partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER']
});

/* const rest = new REST({ version: '9' })
     .setToken(configService.token); */

client.once('ready', async () => {
     printLogo();
     console.log('ready');
});

client.on('interactionCreate', async (interaction) => {
     console.log(interaction);
});

client.on('messageReactionAdd', async (reaction, user) => {
     console.log(reaction);
     console.log(user);
});

client.on('messageReactionRemove', async (reaction, user) => {
     console.log(reaction);
     console.log(user);
});

//client.login(configService.token);

const printLogo = () => {
     console.log('       .__                         ___.           __   _______________  _______  _______   \n  _____|  |____  _  _______    ____\\_ |__   _____/  |_/   __   \\   _  \\ \\   _  \\ \\   _  \\  \n /  ___/  |  \\ \\/ \\/ /\\__  \\  /    \\| __ \\ /  _ \\   __\\____    /  /_\\  \\/  /_\\  \\/  /_\\  \\ \n \\___ \\|   Y  \\     /  / __ \\|   |  \\ \\_\\ (  <_> )  |    /    /\\  \\_/   \\  \\_/   \\  \\_/   \\\n/____  >___|  /\\/\\_/  (____  /___|  /___  /\\____/|__|   /____/  \\_____  /\\_____  /\\_____  /\n     \\/     \\/             \\/     \\/    \\/                            \\/       \\/       \\/ ');
     console.log('    by CybernetixZero\n');
};

printLogo();
console.log(configService);