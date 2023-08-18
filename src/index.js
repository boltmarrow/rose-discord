//console.log('Hello world!');

const { SapphireClient } = require('@sapphire/framework');
const { GatewayIntentBits } = require('discord.js'); // will calling it this break stuff?
const { token } = require('../config.json');

const client = new SapphireClient({
    defaultPrefix: '<>', // keeping this ig
    intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages], // necessary to read messages or something idk
    loadMessageCommandListeners: true/*, // also for message commands
    owner: '268905918446567425',
    invite: 'https://discord.gg/qYYvarbZMX'*/
});

client.login(token);

//setup on restart
client
    .on('ready', () => {
        //log some debug info to console
        console.log(`Connected as ${client.user.tag} to ${client.guilds.cache.size} servers:`);
        client.guilds.cache.forEach((guild) => {
            console.log(` - ${guild.name}`);
        });
        console.log(`current time: ${getTimestamp()}`);

        //set activity to watching servers, changed by msghas
        client.user.setPresence({
            activity: {name: `${client.guilds.cache.size} servers`, type: 'WATCHING'},
            status: 'online'
        });
    })
    .on('error', (error) => {
        console.log(`caught error at ${getTimestamp()}: ${error.name}`);
    });

/* prints date & time in YYYY-MM-DD HH:MM:SS format */
function getTimestamp() {
    let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
}