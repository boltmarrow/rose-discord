const { Command } = require('@sapphire/framework');

const responses = [
    //sunday
    [
        {files: [{
            attachment: './media/sailer-sunday.mp4', 
            name: 'sailer-sunday.mp4'
        }]}
    ],
    //monday
    [
        {files: [{
            attachment: './media/sailer-monday.mp4', 
            name: 'sailer-monday.mp4'
        }]}
    ],
    //tuesday
    [
        {files: [{
            attachment: './media/tactical-toad-tuesday.mp4', 
            name: 'tactical-toad-tuesday.mp4'
        }]}
    ],
    //wednesday
    [
        {files: [{
            attachment: './media/sailer-wednesday1.mp4', 
            name: 'sailer-wednesday1.mp4'
        }]},

        {files: [{
            attachment: './media/sailer-wednesday2.mp4', 
            name: 'sailer-wednesday2.mp4'
        }]}
    ],
    //thursday
    [
        {content: 'attention sailers, it is now tiny dusa thursday',
        files: [{
             attachment: './media/dusa-thursday.gif',
             name: 'dusa-thursday.gif'
        }]}
    ],
    //friday
    [
        {files: [{
            attachment: './media/sailer-friday.mp4', 
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
        attachment: './media/3am.mp4', 
        name: '3am.mp4'
    }]},
    //1 - day 15
    {files: [{
        attachment: './media/day-15.mp4', 
        name: 'day-15.mp4'
    }]},
    //2 - xmas
    {files: [{
        attachment: './media/sailer-xmas.mp4', 
        name: 'sailer-xmas.mp4'
    }]}
];

class SailerCommand extends Command {
    constructor(context, options) {
        super(context, {
            name: 'sailer',
            group: 'misc',
            memberName: 'sailer',
            description: 'if available, send a sea-shanty-based video of encouragement corresponding to the day of the week',
            aliases: ['sailor', 'sailerday', 'sailorday', 'seashanty', 'congratssailer']
        });
    }
    async messageRun(message, args) {
        //get date
        const date = new Date();
        let response;

        //if 3:00 AM
        if(date.getHours() == 3 && date.getMinutes() == 0) {
            response = (misc_responses[0]);
        }
        //else if day 15
        else if(date.getDate() == 15) {
            response = (misc_responses[1]);
        }
        //else if xmas (approximately)
        else if (date.getMonth == 12 && date.getDate >= 25) {
            response = (misc_responses[2]);
        }
        //else
        else {
            let weekday = date.getDay();
            //get random index
            let i = Math.floor(Math.random() * responses[weekday].length);
            //respond with response at index
            response = (responses[weekday][i]);
        }

        message.channel.send(response);
    }
}

module.exports = { SailerCommand };