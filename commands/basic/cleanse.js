const commando = require('discord.js-commando');

class CleanseCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'cleanse',
            aliases: ['clean'],
            group: 'basic',
            memberName: 'cleanse',
            description: 'Used to clean the channel up after some shit goes down'
        });
    }
    async run(message, args) {
        message.say(
            "Here are some sponges, gamers. Drag them around to clean up the channel and renounce whatever degeneracy just got posted", {
            files: [
                {
                    attachment: './pictures/bluesponge.png', 
                    name: 'bluesponge.png'
                },
                {
                    attachment: './pictures/yellowsponge.png', 
                    name: 'yellowsponge.png'
                }
            ]
        });
    }
}

module.exports = CleanseCommand;