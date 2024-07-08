const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'mute',
    run: async (client, interaction, settings) => {

        const invalidPerms = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription('You do not have sufficient permissions to do that!');

        if(!interaction.member.roles.cache.some(role => role.id === settings.MODERATOR_ROLE_ID))
            return interaction.reply({ embeds: [invalidPerms] });

        const user = interaction.options.getUser('user');

        const member = interaction.guild.members.cache.get(user.id);

        const muteResult = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setTitle('Kick')
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()

        if(member) {
            const muteRole = interaction.guild.roles.cache.find(role => role.id === settings.MUTE_ROLE_ID);
            if(muteRole) {
                if(!member.roles.cache.has(muteRole.id)) {
                    muteResult.setDescription(`${interaction.user} has muted ${user} (${user.id})`)
                    await member.roles.add(muteRole);
                } else {
                    muteResult.setDescription(`User is already muted!`)
                }
            } else {
                muteResult.setDescription(`Mute role does not exist. Make sure the role has been created and the bot configured correctly.`)
            }
        } else {
            muteResult.setDescription('The member you are trying to mute does not exist.')
        }

        return interaction.reply({ embeds: [muteResult] })
    }
}