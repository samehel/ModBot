const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ban',
    run: async (client, interaction, settings) => {

        const invalidPerms = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription('You do not have sufficient permissions to do that!');

        if(!interaction.member.roles.cache.some(role => role.id === settings.MODERATOR_ROLE_ID))
            return interaction.reply({ embeds: [invalidPerms] });

        const user = interaction.options.getUser('user');

        const member = interaction.guild.members.cache.get(user.id);
        const reason = interaction.options.getString('reason') || "";

        if(member) {
            const banSuccess = new EmbedBuilder()
            .setColor(settings.EMBED_COLOR)
            .setTitle('Ban Hammer')
            .setDescription(`${interaction.user} has banned ${user} (${user.id}) ${reason === "" ? "" : `for **${reason}**`}`)
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()

            await member.ban({ reason: reason || "" });
            return interaction.reply({ embeds: [banSuccess] })
        } else {
            const banFailure = new EmbedBuilder()
            .setColor(settings.EMBED_COLOR)
            .setTitle('Ban Hammer')
            .setDescription('The member you are trying to ban does not exist.')
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()
            return interaction.reply({ embeds: [banFailure] })
        }

    }
}