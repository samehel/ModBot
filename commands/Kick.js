const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'kick',
    run: async (client, interaction, settings) => {

        const invalidPerms = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription('You do not have sufficient permissions to do that!');

        if(!interaction.member.roles.cache.some(role => role.id === settings.MODERATOR_ROLE_ID))
            return interaction.reply({ embeds: [invalidPerms] });

        const user = interaction.options.getUser('user');

        const member = interaction.guild.members.cache.get(user.id);
        const reason = interaction.options.getString('reason') || "";

        const kickResult = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setTitle('Kick')
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()

        if(member) {
            kickResult.setDescription(`${interaction.user} has kicked ${user} (${user.id}) ${reason === "" ? "" : `for **${reason}**`}`)
            await member.kick({ reason: reason || "" });
        } else {
            kickResult.setDescription('The member you are trying to kick does not exist.')
        }

        return interaction.reply({ embeds: [kickResult] })
    }
}