const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'unban',
    run: async (client, interaction, settings) => {

        const invalidPerms = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription('You do not have sufficient permissions to do that!');

        if(!interaction.member.roles.cache.some(role => role.id === settings.MODERATOR_ROLE_ID))
            return interaction.reply({ embeds: [invalidPerms] });

        const userID = interaction.options.getString('userid');

        const unbanResult = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setTitle('Unban')
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()

        try {
            await interaction.guild.members.unban(userID);
            unbanResult.setDescription(`${interaction.user} has unbanned user with ID ${userID}`)
        } catch (e) {
            unbanResult.setDescription('The member you are trying to unban does not exist.')
        }

        return interaction.reply({ embeds: [unbanResult] })
    }
}