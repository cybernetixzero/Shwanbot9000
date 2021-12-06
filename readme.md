# shwanbot9000
*Written by CybernetixZero*

I was inspired by discussion in `#beep-boop` to establish a Discord bot for any purpose on Artemis server. It caught me at a great time as I'm learning Node.js and this was a reasonable project to learn more about it and also adopt Discord.js.

## Prerequisites
You will need to install Node.js + npm. Docker is optional.

## Installation
1. Unzip the archive containing the code into a folder (preferably ./shwanbot9000).
2. Fire up your favourite terminal / command line.
3. Navigate to the folder.
4. Run `npm install`

## Configuration
The bot requires a config.json file located in the ./data directory. The redacted properties will be shared within #beep-boop.

```json
{
    "token": "<REDACTED>",
    "clientId": "<REDACTED>",
    "guildId": "<REDACTED>",
    "isBonkEmojiCustom": true,
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

## Installing (Docker)
1. Fire up your favourite terminal / command line on a system running Docker.
2. Navigate to the folder where containers are kept.
3. Run the following commands:
```
mkdir shwanbot9000
cd shwanbot9000
wget https://raw.githubusercontent.com/cybernetixzero/Shwanbot9000/main/Dockerfile
wget https://raw.githubusercontent.com/cybernetixzero/Shwanbot9000/main/docker-compose.yml
mkdir data
cd data
touch config.json
cd ..
```
4. PM @CybernetixZero to get the latest config.json and replace in ./data folder.

## Running (Docker)
1. Fire up your favourite terminal / command line on a system running Docker.
2. Navigate to the shwanbot9000 container folder.
3. Run the following commands:
```
docker-compose up -d
```

## Writing Commands
Taking inspiration from the Discord.js guide, I created a structure that makes it straightforward to build and plug-in commands.
Commands are enumerated during app boot up, any changes will require the app to restart.
All commands are implemented in separate *.js files located in the ./commands directory.

```js
const { SlashCommandBuilder } = require('@discordjs/builders');

class CreateBlackHoleCommand {
    constructor(configService, client, rest) {
        this.configService = configService;
        this.client = client;
        this.rest = rest;

        // The command name that will be typed in Discord.
        this.name = 'createblackhole';
        this.slashCommand = new SlashCommandBuilder()
            .setName(this.name) // Pass in the command name property.
            .setDescription('Grab onto something, this will create a black hole.'), // Specify a description for the command.
    }

    // execute(interaction): The event handler in index.js will call this when your command gets invoked. It will pass in an interaction instance that contains all the context about the command.
    execute = async (interaction) => {
        // Do all the code things that create a black hole.
        await interaction.reply('Hello I''m a black hole that is only slightly denser than Donald Trump.');
    }
}

module.exports = CreateBlackHoleCommand;
```

## Contributions
You are more than welcome to make any modifications you like but please share it with the server as it's an awesome learning exercise and it helps improve the bot over time.

Feel free to `git clone` and submit pull requests on https://github.com/cybernetixzero/Shwanbot9000.

## Resources
- https://discord.js.org/#/docs/main/stable/general/welcome
- https://discordjs.guide/#before-you-begin
- https://github.com/AnIdiotsGuide/discordjs-bot-guide
