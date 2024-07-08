const { EmbedBuilder } = require('discord.js');
const WarnOps = require('../Database/CRUDOperations/WarnOperations');

module.exports = {
    name: 'warnings',
    run: async (client, interaction, settings) => {

        const invalidPerms = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription('You do not have sufficient permissions to do that!');

        if(!interaction.member.roles.cache.some(role => role.id === settings.MODERATOR_ROLE_ID))
            return interaction.reply({ embeds: [invalidPerms] });

        const user = interaction.options.getUser('user');

        const warnResult = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()

        if(user) {
            warnResult.setTitle(`${user.globalName}'s Warnings`)
            if(await WarnOps.checkWarnData(user.id)) {
                let userWarnData = await WarnOps.retrieveWarnData(user.id);
                userWarnData.warn_reasons.forEach((warn, i) => {
                    warnResult.addFields({ name: `Warning ${i+1}`, value: warn, inline: true})
                });
            } else {
                warnResult.setDescription('This user has no warnings.')
            }
        } else {
            warnResult.setTitle('All Warnings')
            let allWarnData = await WarnOps.retrieveAllWarnData();
            allWarnData.forEach(userWarnData => {
                userWarnData.warn_reasons.forEach((warn, i) => {
                    const member = interaction.guild.members.cache.get(userWarnData.user_id);
                    warnResult.addFields({ name: `${member.user.globalName}'s Warning ${i+1}`, value: warn, inline: true})
                });
            })
        }

        return interaction.reply({ embeds: [warnResult] })
    }
}