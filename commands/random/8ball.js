const commando = require('discord.js-commando');

const fortunes = [['yes', 1], ['no',1], ['maybe',1], ['idk probably',1], ['*l m a o o o o* fuckno',.5], ['i\'ve no fucken clue',.5], ['fuc a nut',.33], ['not if you\'re wearing socks', .15]];
var currentFortune;

class EightBallCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: '8ball',
            group: 'random',
            memberName: '8ball',
            description: 'Answers are always right 100% of the time. No refunds',
            examples: ['<>8ball should I start a fire', '<>8ball am I gay']
        });
    }
    async run(message, args) {
        //console.log(args);
        if(args[0]) {
            while(true) {
                currentFortune = Math.floor(Math.random()*fortunes.length);
                if(Math.random() < fortunes[currentFortune][1]) break;
            }
            message.say((fortunes[currentFortune][0]));
            //message.say("I love it! Also sorry for always swearing at you @Professor Linnea, you're the best");
        }
        else {
            message.channel.send("Ask a question");
        }
    }
}

module.exports = EightBallCommand;