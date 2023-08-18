const { Command } = require('@sapphire/framework');

class PingCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'ping',
            group: '',
            memberName: '',
            description: 'ping pong'
        });
    }

    async messageRun(message) {
        const msg = await message.channel.send('ping...');

        const content = `pong! bot latency: ${Math.round(this.container.client.ws.ping)}ms. `
            + `api latency: ${msg.createdTimestamp - message.createdTimestamp}ms.`

        return msg.edit(content);
    }

}

module.exports = { PingCommand };