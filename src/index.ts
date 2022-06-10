/*
       .__                         ___.           __   _______________  _______  _______   
  _____|  |____  _  _______    ____\_ |__   _____/  |_/   __   \   _  \ \   _  \ \   _  \  
 /  ___/  |  \ \/ \/ /\__  \  /    \| __ \ /  _ \   __\____    /  /_\  \/  /_\  \/  /_\  \ 
 \___ \|   Y  \     /  / __ \|   |  \ \_\ (  <_> )  |    /    /\  \_/   \  \_/   \  \_/   \
/____  >___|  /\/\_/  (____  /___|  /___  /\____/|__|   /____/  \_____  /\_____  /\_____  /
     \/     \/             \/     \/    \/                            \/       \/       \/ 
    by CybernetixZero
*/

import { Client, Intents, Interaction, MessageReaction, PartialMessageReaction, User, PartialUser } from 'discord.js';
import { REST } from '@discordjs/rest';
import { ConfigService } from './services/config-service';

class App {
     configService?: ConfigService;
     client?: Client;
     rest?: REST;

     run() {
          this.showLogo();

          this.configService = new ConfigService();
          this.configService.load();
          console.log('Configuration has been loaded.');
          console.log(this.configService);

          this.client = new Client({
               intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
               partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER']
          });
          this.client.once('ready', this.onClientReady);
          this.client.on('interactionCreate', this.onClientInteractionCreate);
          this.client.on('messageReactionAdd', this.onClientMessageReactionAdd);
          this.client.on('messageReactionRemove', this.onClientMessageReactionRemove);

          this.rest = new REST({ version: '9' })
               .setToken(this.configService.token);

          //this.client.login(this.configService.token);
          //console.log('Client has logged in.');
     }

     showLogo() {
          console.log('       .__                         ___.           __   _______________  _______  _______   \n  _____|  |____  _  _______    ____\\_ |__   _____/  |_/   __   \\   _  \\ \\   _  \\ \\   _  \\  \n /  ___/  |  \\ \\/ \\/ /\\__  \\  /    \\| __ \\ /  _ \\   __\\____    /  /_\\  \\/  /_\\  \\/  /_\\  \\ \n \\___ \\|   Y  \\     /  / __ \\|   |  \\ \\_\\ (  <_> )  |    /    /\\  \\_/   \\  \\_/   \\  \\_/   \\\n/____  >___|  /\\/\\_/  (____  /___|  /___  /\\____/|__|   /____/  \\_____  /\\_____  /\\_____  /\n     \\/     \\/             \\/     \\/    \\/                            \\/       \\/       \\/ ');
          console.log('    by CybernetixZero and n3rf_herter\n');
     }

     async onClientReady() {
          console.log('ready');
     }

     async onClientInteractionCreate(interaction: Interaction) {
          console.log('interactionCreate');
          console.log(interaction);
     }

     async onClientMessageReactionAdd(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) {
          console.log('messageReactionAdd');
          console.log(reaction);
          console.log(user);
     }

     async onClientMessageReactionRemove(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) {
          console.log('messageReactionRemove');
          console.log(reaction);
          console.log(user);
     }
}

let app = new App();
app.run();