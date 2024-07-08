const { EmbedBuilder } = require('discord.js');
const WarnOps = require('../Database/CRUDOperations/WarnOperations');

module.exports = {
    name: 'delwarn',
    run: async (client, interaction, settings) => {

        const invalidPerms = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription('You do not have sufficient permissions to do that!');

        if(!interaction.member.roles.cache.some(role => role.id === settings.MODERATOR_ROLE_ID))
            return interaction.reply({ embeds: [invalidPerms] });

        const user = interaction.options.getUser('user');

        const warnResult = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setTitle('Warning Removed')
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()

        if(user) {
            if(await WarnOps.checkWarnData(user.id)) {
                let userWarnData = await WarnOps.retrieveWarnData(user.id);
                warnResult.setDescription(`${interaction.user} has removed a warning from ${user} (${user.id})`)
                await WarnOps.updateWarnData(user.id, { warn_reasons: userWarnData.warn_reasons.splice(0, userWarnData.warn_reasons.length - 1), $inc: { warn_count: -1 } });
                
                if(userWarnData.warn_count-1 == 0)
                    await WarnOps.deleteWarnData(user.id);

            } else {
                warnResult.setDescription(`Failed to remove warning from ${user}. They do not have any.`);
            }
        } else {
            warnResult.setDescription('The member you are trying to remove a warn from does not exist.')
        }

        return interaction.reply({ embeds: [warnResult] })
    }
}