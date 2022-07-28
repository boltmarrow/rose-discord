const commando = require('discord.js-commando');

var num;
var die;
var total;
var max;
var min;
var xSum;
var sSum;

class DiceRollCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'random',
            memberName: 'roll',
            description: 'Rolls a specified number of a specific die',
            examples: ['<>roll d20 + 2d8 + 2', '<>roll 3d6']
        });
        
    }
    async run(message, args) {
        total = 0;
        max = 0;
        min = 0;
        sSum = '';

        var XArr = message.content.split('+');
        XArr.forEach(function(x) {
            if(!/d/.test(x)) {
                xSum = parseInt(/[0-9]{1,}/.exec(x));
                max += xSum;
                min += xSum;
            } else {
                xSum = 0;

                num = parseInt(/[0-9]{1,}\s*(?=d)/.exec(x));
                if(isNaN(num)) num = 1;

                die = parseInt(/(?<=d)\s*[0-9]{1,}/.exec(x));
                if(isNaN(die)) die = 6;

                for(var i=0; i<num; i++) xSum += Math.ceil(Math.random()*die);
                max += num * die;
                min += num;
            }
            sSum += (String(xSum) + ' + ');
            total += xSum;
        });
        message.say(/.*(?=\+ $)/.exec(sSum)[0] + '= **' + total 
            + '** (' + Math.round(total/max*100) + '% of possible max ' + max + ', '
            + Math.round((total-min)/(max-min)*100) + 'th percentile of possible rolls)');
    }
}

module.exports = DiceRollCommand;