const commando = require('discord.js-commando');

const pattern = [
    /\bcrimes?\b/i,
    /\bfeels ?bad ?man\b/i,
    /\bfeels ?vlad ?man\b/i,
    /\bfeels ?dad ?man\b/i,
    /\bfeels ?bea ?man\b/i,
    /\bfeels ?taj ?man\b/i,
    /\bsmugbob\b/i,
    /\bbut do (yo)?u really know\b/i,
    /\bswang\b/i,
    /\bpapa ?smoke\b/i,
    /\bg(o+d)? ?m+(orning+)?\b/i,
    /\bg(o+d)? ?n+(ight+)?\b/i,
    /\bslap ?snake\b/i,
    /\bhmm+\b/i,
    /\bleeks?\b/i,
    /\bdavai\b/i,
    /\bit (just )?(really )?(just )?(b|be|:b:) like that\b/i,
    /\boh ?fuck\b/i,
    /\bspo+(k|p)y?\b/i,
    /\b👍 👁 👅 👁 👍\b/i,
    /\bextra ?thic(c|k)+\b/i,
    /\brose(\.demo)?\b/i,
    /\bthat dog(!+)?\b/i,
    /\b(oh,? ?)?you ?know(\W+)?$/i
];
//measured in minutes
const cooldown = [
    1, //crimes
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    120, //good morning
    120, //good night
    0,
    10, //hmm
    0,
    0,
    0, //it b like that sometimes
    60, //ohfuck
    0,
    0,
    1, //extrathicc
    60, //rose
    1, //that dog
    0 //you know
];

const response = [
    {files: [{
        attachment: './pictures/gregg.jpg', 
        name: 'gregg.jpg'
    }]},
    {files: [{
        attachment: './pictures/feelsbadman.png', 
        name: 'feelsbadman.png'
    }]},
    {files: [{
        attachment: './pictures/feelsvladman.jpg', 
        name: 'feelsvladman.jpg'
    }]},
    {files: [{
        attachment: './pictures/feelsdadman.png', 
        name: 'feelsdadman.png'
    }]},
    {files: [{
        attachment: './pictures/feelsbeaman.png', 
        name: 'feelsbeaman.png'
    }]},
    {files: [{
        attachment: './pictures/feelstajman.png', 
        name: 'feelstajman.png'
    }]},
    {files: [{
        attachment: './pictures/smugbob.jpg', 
        name: 'smugbob.jpg'
    }]},
    {files: [{
        attachment: './pictures/butdoyoureallyknow.gif', 
        name: 'butdoyoureallyknow.gif'
    }]},
    {files: [{
        attachment: './pictures/swang.gif', 
        name: 'swang.gif'
    }]},
    {files: [{
        attachment: './pictures/papasmoke.jpg', 
        name: 'papasmoke.jpg'
    }]},
    [
        'Goodmorning yall!', 'G\'morning!', 'goooooood morning!', 'goodmorning.', 'gm!', 'gOOOOOOOD MORNINGGGGGGG VIETNAM', 'Good morning! :D', 'Good morning everyone!',
        {files: [{
            attachment: './pictures/goodmorningsluts.png', 
            name: 'goodmorningsluts.png'
        }]}
    ],
    [
        'goodnight!', 'nighty night', 'g\'night :D', 'gn.', 'Sleep well!', 'goodnight :D', 'good night!', 'gnight',
        'Goodnight! Did you know the Chernobyl nuclear meltdown is blamed in part on the engineers being sleep deprived? :D', 
        'Goodnight! Did you know sleeping less that five hours a night triples your risk of a heart attack? :D',
        {files: [{
            attachment: './pictures/gn-sailer.png', 
            name: 'gn-sailer.png'
        }]}
    ],
    'https://www.youtube.com/watch?v=Bxc_55ur-J4',
    {files: [{
        attachment: './pictures/concern.jpg', 
        name: 'concern.jpg'
    }]},
    {files: [{
        attachment: './pictures/leeks.jpg', 
        name: 'leeks.jpg'
    }]},
    {files: [{
        attachment: './pictures/davai.png', 
        name: 'davai.png'
    }]},
    'it really do',
    {files: [{
        attachment: './pictures/ohfuck.png', 
        name: 'ohfuck.png'
    }]},
    {files: [{
        attachment: './pictures/spookyboi.gif', 
        name: 'spookyboi.gif'
    }]},
    ':thumbsup: :eye: :tongue: :eye: :thumbsup:',
    '乇乂ㄒ尺卂 ㄒ卄丨匚匚',
    ':eyes:',
    '(that dog!)',
    {files: [{
        attachment: './pictures/youknow.jpg', 
        name: 'you know.jpg'
    }]}
];

var activeCooldowns = new Set();

class MsgHasCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'msghas',
            group: 'msghas',
            memberName: 'msghas',
            description: 'Listens for specific words (not commands) and responds to them',
            hidden: true,
            patterns: pattern
        });
    }
    async run(message, args) {
        //ignore commands
        if(/^<>/.test(args['input'])) return null;

        //for every word/regex, try matching
        for(var x in pattern) {

            //if input matches current word/regex
            if(pattern[x].test(args['input'])) {
                
                const cooldownToken = `${x.toString()} ${message.guild.id.toString()}`;

                //only run if cooldown is finished
                if(!activeCooldowns.has(cooldownToken)) {

                    //if array of responses
                    if(Array.isArray(response[x])) {
                        //get random index
                        let i = Math.floor(Math.random()*response[x].length);
                        //respond with response at index
                        message.say(response[x][i]);
                    }
                    else message.say(response[x]);
                    
                    //start cooldown process
                    //if cooldown exists for given target
                    if(cooldown[x] > 0) {
                        //add it to cooldown set
                        activeCooldowns.add(cooldownToken);
                        //delete it in listed number of minutes
                        setTimeout(() => {
                            activeCooldowns.delete(cooldownToken);
                        }, (cooldown[x]*60000));
                    }
                }

                //change presence on goodmorning/goodnight
                if(x == 10 || x == 11) {
                    //current time (24h)
                    let hrs = new Date().getHours();
                    //console.log(`hrs: ${hrs}, x: ${x}`);
                    //if goodmorning and it's not night
                    if(x == 10 && hrs >= 7 && hrs <= 21) {
                        //console.log(`woke up at ${hrs}.`);
                        this.client.user.setPresence({
                            activity: {name: `${this.client.guilds.cache.size} servers`, type: 'WATCHING'},
                            status: 'online'
                        });
                    //if goodnight and it's not day
                    } else if(x == 11 && (hrs <= 6 || hrs >= 21)) {
                        //console.log(`sleeping at ${hrs}...`);
                        this.client.user.setPresence({
                            activity: {name: 'with electric sheep 💤', type: 'PLAYING'},
                            status: 'idle'
                        });
                    }
                }
            }
        }
    }
}

module.exports = MsgHasCommand;