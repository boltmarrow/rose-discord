const commando = require('discord.js-commando');

const responses = ['goodnight', 'good night.', 'gn', 'sleep well', 'nighty night motherfucker']

class GoodNightCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'goodnight',
            aliases: ['gn', 'gnight'],
            group: 'basic',
            memberName: 'goodnight',
            description: 'get some sleep, waking up early sometimes is nice'
        });
    }
    async run(message, args) {
            message.channel.sendMessage(responses[Math.floor(Math.random()*responses.length)]);
    }
}

module.exports = GoodNightCommand;