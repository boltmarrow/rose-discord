const { Command } = require('@sapphire/framework');

var output;

class EmojCommand extends Command {
    constructor(context, options) {
        super(context, {
            name: 'emoj',
            aliases: ['emojify'],
            group: 'misc',
            memberName: 'emoj',
            description: "Turns text into discord emojis. Doesn't do anything to actual emojis, numbers, etc"
        });
    }
    async messageRun(message, args) {

        var output = '';
        var currentWord;

        //repeat until end of message
        while(currentWord = args.next()){
            //go one word at a time
            currentWord.toLowerCase().split('').forEach(function(x) {
                //if current char is a letter 
                if (/[a-z]/.test(x))
                    //make it into corresponding emoji
                    output += `:regional_indicator_${x}: `;
                //else just add it raw (add more emojis here later)
                else output += `${x} `;
            });
            //space between words
            output += '  ';
        }
        //send reply
        message.channel.send(output.trim());
    }
}

module.exports = { EmojCommand };