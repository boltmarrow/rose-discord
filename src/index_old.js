//console.log('Hello world!');

import { SapphireClient } from '@sapphire/framework';
import { token } from '../config.json';

const client = new SapphireClient({
    defaultPrefix: '<>',
    intents: ['GUILDS', 'GUILD_MESSAGES']/*,
    owner: '268905918446567425',
    invite: 'https://discord.gg/qYYvarbZMX'*/
});

client.login(token);

const sqlite = require('sqlite');

//declaring default commands and where the custom commands are located
client.registry
    .registerGroups([
        ['basic', 'Basic commands'],
        ['random', 'Randomizer commands'],
        ['msghas', 'regex pattern recognition and response'],
        ['misc', 'Misc']
    ])
    .registerDefaults()
    .registerCommandsIn(__dirname + '/commands');

/** 
 * keeps track of prefix and settings and stuff between resets
 * mostly obsolete but sqlite is a dependency already so fuck it
 * ignored by git because only the one most recently used for real will be up to date
 */
client.setProvider(
    sqlite.open(__dirname + '/settings.sqlite3').then(db => new commando.SQLiteProvider(db))
).catch(console.error);

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


/**
 * Login as given instance
 * NOTE: you must supply the secret token of your instance yourself in ./secret_token.txt
 */

// prints date & time in YYYY-MM-DD HH:MM:SS format
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