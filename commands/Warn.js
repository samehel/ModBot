const { EmbedBuilder } = require('discord.js');
const WarnOps = require('../Database/CRUDOperations/WarnOperations');

module.exports = {
    name: 'warn',
    run: async (client, interaction, settings) => {

        const invalidPerms = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription('You do not have sufficient permissions to do that!');

        if(!interaction.member.roles.cache.some(role => role.id === settings.MODERATOR_ROLE_ID))
            return interaction.reply({ embeds: [invalidPerms] });

        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);
        const reason = interaction.options.getString('reason');

        const warnResult = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setTitle('Warning Given')
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()

        if(member) {
            warnResult.setDescription(`${interaction.user} has warned ${user} (${user.id}) for **${reason}**`)
            if(await WarnOps.checkWarnData(user.id)) {
                let userWarnData = await WarnOps.retrieveWarnData(user.id);
                await WarnOps.updateWarnData(user.id, { warn_reasons: [...userWarnData.warn_reasons, reason], $inc: { warn_count: 1 } });
                if(userWarnData.warn_count+1 === settings.WARN_KICK)
                    await member.kick({ reason: 'reached maximum warn count for kick' });
                else if (userWarnData.warn_count+1 === settings.WARN_BAN)
                    await member.ban({ reason: 'reached maximum warn count for ban' });
            } else {
                await WarnOps.createWarnData(user.id, [reason], 1);
            }
        } else {
            warnResult.setDescription('The member you are trying to warn does not exist.')
        }

        return interaction.reply({ embeds: [warnResult] })
    }
}