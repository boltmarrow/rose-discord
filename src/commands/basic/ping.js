const { Command } = require('@sapphire/framework');
const { isMessageInstance } = require('@sapphire/discord.js-utilities');

class PingCommand extends Command {
    constructor(context, options) {
        super(context, {
            name: 'ping',
            group: '',
            memberName: '',
            description: 'ping pong'
        });
    }

    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => builder.setName(this.name).setDescription(this.description));
    }

    async messageRun(message) {
        const msg = await message.channel.send('ping...');

        const content = `pong! bot latency: ${Math.round(this.container.client.ws.ping)}ms. `
            + `api latency: ${msg.createdTimestamp - message.createdTimestamp}ms.`

        return msg.edit(content);
    }

    async chatInputRun(interaction) {
        console.log('aaa');
        const msg = await interaction.reply({ content: `ping...`, ephemeral: true, fetchReply: true });

        if (isMessageInstance(msg)) {
            const diff = msg.createdTimestamp - interaction.createdTimestamp;
            const content = `pong! bot latency: ${Math.round(this.container.client.ws.ping)}ms. api latency: ${diff}ms.`

            return msg.edit(content);
        }
    }
}

module.exports = { PingCommand };