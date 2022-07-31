const { Command } = require('@sapphire/framework');

class CleanseCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'cleanse',
            aliases: ['clean'],
            group: 'basic',
            memberName: 'cleanse',
            description: 'Used to clean the channel up after some shit goes down'
        });
    }
    messageRun(message, args) {

        return message.channel.send({
            content: "Here are some sponges, gamers. Drag them around to clean up the channel and renounce whatever degeneracy just got posted",
            files: [
                {
                    attachment: './media/bluesponge.png', 
                    name: 'bluesponge.png'
                },
                {
                    attachment: './media/yellowsponge.png', 
                    name: 'yellowsponge.png'
                }
            ]
        });
    }
}

module.exports = { CleanseCommand };