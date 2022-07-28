const commando = require('discord.js-commando');

MArr = {
    cmd: [
        /<>yee/,
        /<>agh/,
        /<>bluescluesthisbitch/,
        /<>itdoesntsuck/,
        /<>itdoessuck/,
        /<>outline/
    ],
    resp: [
        'https://www.youtube.com/watch?v=q6EoRBvdVPQ&list=PLlU7rdULKdfAqhBsf5BhFgB0gIWfPSHLP',
        'https://www.youtube.com/watch?v=Bkq1PAyGuZY',
        'it\'s mitchell',
        '<@332249585546166284> ultimate frisbee doesn\'t suck',
        '<@190267405317046272> ultimate frisbee does suck',
        'do it yourself nerd'
    ]
};

class ClassicCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'classic',
            aliases: ['yee', 'agh', 'bluescluesthisbitch', 'itdoesntsuck', 'itdoessuck', 'outline', 'femalecount'],
            group: 'basic',
            memberName: 'classic',
            description: 'all the old simple commands from Gnomebot that rarely get used'
        });
    }
    async run(message, args) {
        for(var x in MArr['cmd']) {
            if(MArr['cmd'][x].test(message.content)) {
                message.say(MArr['resp'][x])
            }
        }
    }
}

module.exports = ClassicCommand;