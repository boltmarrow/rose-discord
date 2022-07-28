const commando = require('discord.js-commando');

var output;

class EmojCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'emoj',
            aliases: ['emojify'],
            group: 'misc',
            memberName: 'emoj',
            description: "Turns text into discord emojis. Doesn't do anything to actual emojis, numbers, etc"
        });
    }
    async run(message, args) {
        if(args[0]){
            output = '';
            args.toLowerCase().split('').forEach(function(x) {
                if (/[a-z]/.test(x))
                    output += `:regional_indicator_${x}: `;
                else output += `${x} `;
            });
            message.channel.send(output);
        }
    }
}

module.exports = EmojCommand;