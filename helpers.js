const { Collection } = require('discord.js');
const fs = require('fs');

module.exports = {
    saveConfigToDisk: function(config) {
        const json = JSON.stringify(config, null, 4);
        fs.writeFileSync('./data/config.json', json);
    },
    getCommands: function() {
        const commands = new Collection();
        const commandFiles = fs.readdirSync('./commands')
            .filter(file => file.endsWith('.js'));

        for (const commandFile of commandFiles) {
            const command = require(`./commands/${commandFile}`);
            if (command !== null)
                commands.set(command.name, command);
        }

        return commands;
    }
}
