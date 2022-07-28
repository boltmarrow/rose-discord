const commando = require('discord.js-commando');

class TestCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'test',
            group: 'basic',
            memberName: 'test',
            description: 'test command',
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like the bot to say?',
                    type: 'string'
                }
            ]
        });
    }
    async run(message, args) {
        message.say(args['text']);
    }
}

//module.exports = TestCommand;
//disabled because its boring