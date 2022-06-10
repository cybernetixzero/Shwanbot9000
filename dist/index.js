"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_service_1 = require("./services/config-service");
const configService = new config_service_1.ConfigService();
configService.load();
const client = new discord_js_1.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES, discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER']
});
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
const printLogo = () => {
    console.log('       .__                         ___.           __   _______________  _______  _______   \n  _____|  |____  _  _______    ____\\_ |__   _____/  |_/   __   \\   _  \\ \\   _  \\ \\   _  \\  \n /  ___/  |  \\ \\/ \\/ /\\__  \\  /    \\| __ \\ /  _ \\   __\\____    /  /_\\  \\/  /_\\  \\/  /_\\  \\ \n \\___ \\|   Y  \\     /  / __ \\|   |  \\ \\_\\ (  <_> )  |    /    /\\  \\_/   \\  \\_/   \\  \\_/   \\\n/____  >___|  /\\/\\_/  (____  /___|  /___  /\\____/|__|   /____/  \\_____  /\\_____  /\\_____  /\n     \\/     \\/             \\/     \\/    \\/                            \\/       \\/       \\/ ');
    console.log('    by CybernetixZero\n');
};
printLogo();
console.log(configService);
//# sourceMappingURL=index.js.map