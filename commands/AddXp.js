const { EmbedBuilder } = require('discord.js');
const XPOps = require('../Database/CRUDOperations/XPOperations');

module.exports = {
    name: 'addxp',
    run: async (_, interaction, settings) => {

        const invalidPerms = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription('You do not have sufficient permissions to do that!');

        const invalidXPRange = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription('Please provide a valid amount of XP.');

        const invalidUser = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription('You cannot add XP to a bot. Please mention a valid user!')

        const invalidUserXPData = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription('This user has never spoken in the server before, they need to be active first.');

        if(!interaction.member.roles.cache.some(role => role.id === settings.MODERATOR_ROLE_ID))
            return interaction.reply({ embeds: [invalidPerms] });

        const xp_amount = interaction.options.getInteger('amount');
        const user = interaction.options.getUser('user');

        if(xp_amount <= 0)
            return interaction.reply({ embeds: [invalidXPRange] });

        if(user.bot)
            return interaction.reply({ embeds: [invalidUser] });

        if(!await XPOps.checkXPData(user.id)) 
            return interaction.reply({ embeds: [invalidUserXPData] })

        const addXP_success = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription(`Successfully added ${xp_amount} to ${user}!`)

        await XPOps.updateXPData(user.id, { $inc: { xp_amount } });
        return interaction.reply({ embeds: [addXP_success] })
    }
}