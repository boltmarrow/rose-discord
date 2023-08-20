import type { Message } from 'discord.js';
import { PatternCommand } from '@sapphire/plugin-pattern-commands';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<PatternCommand.Options>({
	aliases: ['rose'],
	chance: 100
})
export class RoseCommand extends PatternCommand {
	public messageRun(message: Message) {
		message.reply(':eyes:');
	}
}