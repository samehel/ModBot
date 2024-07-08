const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'unmute',
    run: async (client, interaction, settings) => {

        const invalidPerms = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription('You do not have sufficient permissions to do that!');

        if(!interaction.member.roles.cache.some(role => role.id === settings.MODERATOR_ROLE_ID))
            return interaction.reply({ embeds: [invalidPerms] });

        const user = interaction.options.getUser('user');

        const member = interaction.guild.members.cache.get(user.id);

        const unmuteResult = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setTitle('Kick')
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()

        if(member) {
            const muteRole = interaction.guild.roles.cache.find(role => role.id === settings.MUTE_ROLE_ID);
            if(member.roles.cache.has(muteRole.id)) {
                unmuteResult.setDescription(`${interaction.user} has unmuted ${user} (${user.id})`)
                await member.roles.remove(muteRole);
            } else {
                unmuteResult.setDescription(`User is not muted!`)
            }
        } else {
            unmuteResult.setDescription('The member you are trying to unmute does not exist.')
        }

        return interaction.reply({ embeds: [unmuteResult] })
    }
}