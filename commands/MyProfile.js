const XPOps = require('../Database/CRUDOperations/XPOperations');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'myprofile',
    run: async (client, interaction, settings) => {

        const user = interaction.options.getUser('user');
        let fetchedUser;
        if(!user)
            fetchedUser = await client.users.fetch(interaction.user.id);
        else
            fetchedUser = await client.users.fetch(user.id);

        console.log(fetchedUser)
        const { globalName, username, id } = fetchedUser;
        const { level, xp_amount, multiplier } = await XPOps.retrieveXPData(id);

        const myProfile = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setTitle(`${globalName}'s Profile`)
        .addFields({ name: 'Global Name:', value: globalName, inline: false})
        .addFields({ name: 'Username:', value: username, inline: false})
        .addFields({ name: 'ID:', value: id, inline: false})
        .addFields({ name: 'Level:', value: `${level}`, inline: false})
        .addFields({ name: 'XP:', value: `${xp_amount}`, inline: false})
        .addFields({ name: 'multiplier:', value: `${multiplier}x`, inline: false})
        .addFields({ name: 'Is Server Boosting?', value: `${multiplier > 1 ? 'Yes' : 'No'}`, inline: false})
        .setThumbnail(fetchedUser.displayAvatarURL({dynamic : true}))
        .setTimestamp();

        return interaction.reply({ embeds: [myProfile] });
    }
}