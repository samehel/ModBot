const BadWordsNext = require('bad-words-next');
const en = require('bad-words-next/data/en.json');
const badWords = new BadWordsNext({ data: en });
const { EmbedBuilder } = require('discord.js');
const WarnOps = require('../Database/CRUDOperations/WarnOperations');

module.exports = {
    name: 'PROFANITY_HANDLER',
    run: async(message, settings) => {

        const badWordDetected = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription('Profanity Detected! Message deleted. Please behave yourself, you have been warned.')

        const warnKick = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription(`${message.author} has been kicked for reaching **${settings.WARN_KICK}** warnings!`)

        const warnBan = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription(`${message.author} has been banned for reaching **${settings.WARN_BAN}** warnings!`)


        if(badWords.check(message.content)) {
            await message.delete();
            
            if(await WarnOps.checkWarnData(message.author.id)) {
                let userWarnData = await WarnOps.retrieveWarnData(message.author.id);
                await WarnOps.updateWarnData(message.author.id, { warn_reasons: [...userWarnData.warn_reasons, "Profanity"], $inc: { warn_count: 1 } });
                if(userWarnData.warn_count+1 == settings.WARN_KICK) {
                    await message.member.kick({ reason: 'reached maximum warn count for kick' });
                    return message.channel.send({ embeds: [warnKick] }) 
                } 
                if (userWarnData.warn_count+1 == settings.WARN_BAN) {
                    await message.member.ban({ reason: 'reached maximum warn count for ban' }); 
                    return message.channel.send({ embeds: [warnBan] }) 
                }
            } else {
                await WarnOps.createWarnData(message.author.id, ["Profanity"], 1);
            }

            return message.channel.send({ embeds: [badWordDetected] })
        }
    }
}