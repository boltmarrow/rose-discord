const commando = require('discord.js-commando');

const responses = [
    //sunday
    [
        {files: [{
            attachment: './pictures/sailer-sunday.mp4', 
            name: 'sailer-sunday.mp4'
        }]}
    ],
    //monday
    [
        {files: [{
            attachment: './pictures/sailer-monday.mp4', 
            name: 'sailer-monday.mp4'
        }]}
    ],
    //tuesday
    [
        {files: [{
            attachment: './pictures/tactical-toad-tuesday.mp4', 
            name: 'tactical-toad-tuesday.mp4'
        }]}
    ],
    //wednesday
    [
        {files: [{
            attachment: './pictures/sailer-wednesday1.mp4', 
            name: 'sailer-wednesday1.mp4'
        }]},

        {files: [{
            attachment: './pictures/sailer-wednesday2.mp4', 
            name: 'sailer-wednesday2.mp4'
        }]}
    ],
    //thursday
    [
        {content: 'attention sailers, it is now tiny dusa thursday',
        files: [{
             attachment: './pictures/dusa-thursday.gif',
             name: 'dusa-thursday.gif'
        }]}
    ],
    //friday
    [
        {files: [{
            attachment: './pictures/sailer-friday.mp4', 
            name: 'sailer-friday.mp4'
        }]},

        {files: ['https://va.media.tumblr.com/tumblr_qep9sc7Ukp1wwpg7e.mp4']}
    ],
    //saturday
    ['No sailers on saturday.']
];

//non-weekly stuff
const misc_responses = [
    //0 - oh boy 3am
    {files: [{
        attachment: './pictures/3am.mp4', 
        name: '3am.mp4'
    }]},
    //1 - day 15
    {files: [{
        attachment: './pictures/day-15.mp4', 
        name: 'day-15.mp4'
    }]},
    //2 - xmas
    {files: [{
        attachment: './pictures/sailer-xmas.mp4', 
        name: 'sailer-xmas.mp4'
    }]}
];

class SailerCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'sailer',
            group: 'misc',
            memberName: 'sailer',
            description: 'if available, send a sea-shanty-based video of encouragement corresponding to the day of the week',
            aliases: ['sailor', 'sailerday', 'sailorday', 'seashanty', 'congratssailer']
        });
    }
    async run(message, args) {
        //get date
        const date = new Date();

        //if 3am
        if(date.getHours() == 3 && date.getMinutes() == 0) {
            message.say(misc_responses[0]);
        }
        //else if day 15
        else if(date.getDate() == 15) {
            message.say(misc_responses[1]);
        }
        //else if xmas (approximately)
        else if (date.getMonth == 12 && date.getDate >= 25) {
            message.say(misc_responses[2]);
        }
        //else
        else {
            let weekday = date.getDay();
            //get random index
            let i = Math.floor(Math.random() * responses[weekday].length);
            //respond with response at index
            message.say(responses[weekday][i]);
        }
    }
}

module.exports = SailerCommand;