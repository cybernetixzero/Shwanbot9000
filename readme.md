# shwanbot9000
*Written by CybernetixZero*

I was inspired by discussion in `#beep-boop` to establish a Discord bot for any purpose on Artemis server. It caught me at a great time as I'm learning Node.js and this was a reasonable project to learn more about it and also adopt Discord.js.

## Prerequisites
You will need to install Node.js + npm. Docker is optional.

## Installation
1. Unzip the archive containing the code into a folder (preferably ./shwanbot9000).
2. Fire up your favourite terminal / command line.
3. Navigate to the folder.
4. Run `node install`

## Configuration
The bot requires a config.json file located in the ./data directory. The redacted properties will be shared within #beep-boop.

```json
{
    "token": "<REDACTED>",
    "clientId": "<REDACTED>",
    "guildId": "<REDACTED>",
    "bonkEmojiId": "875363537374031892",
    "bonkEmojiName": ":bonk:",
    "bonkThreshold": 2,
    "sentenceLength": 1,
    "sentenceUnitOfTime": "Weeks",
    "hornyJailRoleId": "848255708481978449",
    "hornyJailRoleName": "hORNY-jAIL"
}
```

## Running (Terminal)
1. Fire up your favourite terminal / command line.
2. Navigate to the folder.
3. Run `node .`

## Running (Docker)
**TODO: Write Docker instructions.**

## Writing Commands
Taking inspiration from the Discord.js guide, I created a structure that makes it straightforward to build and plug-in commands.
Commands are enumerated during app boot up, any changes will require the app to restart.
All commands are implemented in separate *.js files located in the ./commands directory.

```js
const { SlashCommandBuilder } = require('@discordjs/builders');
const helpers = require('../helpers.js');

// The command name that will be typed in Discord.
const name = 'createblackhole';

module.exports = {
    // 'name': Pass in the command name const.
    name: name, 
    // 'slashCommand': Takes a SlashCommandBuilder object that tells Discord how to interpret the command.
    slashCommand: new SlashCommandBuilder()
        .setName(name) // Pass in the command name const.
        .setDescription('Grab onto something, this will create a black hole.'), // Specify a description for the command.
    // 'execute': The event handler in index.js will call this when your command gets invoked. It will pass in instances of interaction, config, client and rest objects.
    execute: async function(interaction, config, client, rest) {
        // Do all the code things that create a black hole.
        await interaction.reply('Hello I''m a black hole that is only slightly denser than Donald Trump.');
    }
}
```

## Contributions
You are more than welcome to make any modifications you like but please share it with the server as it's an awesome learning exercise and it helps improve the bot over time.

Feel free to `git clone` and submit pull requests on https://github.com/cybernetixzero/Shwanbot9000.

## Resources
- https://discord.js.org/#/docs/main/stable/general/welcome
- https://discordjs.guide/#before-you-begin
- https://github.com/AnIdiotsGuide/discordjs-bot-guide
