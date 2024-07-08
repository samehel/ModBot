const BadWordsNext = require('bad-words-next');
const en = require('bad-words-next/data/en.json');
const badWords = new BadWordsNext({ data: en });
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'PROFANITY_HANDLER',
    run: async(message, settings) => {

        const badWordDetected = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription('Profanity Detected! Message deleted. Please behave yourself.')

        if(badWords.check(message.content)) {
            await message.delete();
            return message.channel.send({ embeds: [badWordDetected] })
        }
    }
}