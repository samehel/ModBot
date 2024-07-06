const { EmbedBuilder } = require('discord.js');
const XPOps = require('../Database/CRUDOperations/XPOperations');

module.exports = {
    name: 'deletexp',
    run: async (_, interaction, settings) => {

        const invalidPerms = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription('You do not have sufficient permissions to do that!');

        const invalidXPRange = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription('Please provide a valid amount of XP.');

        const invalidUser = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription('You cannot remove XP from a bot. Please mention a valid user!')

        const invalidUserXPData = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription('This user has never spoken in the server before, they need to be active first.');

        if(!interaction.member.roles.cache.some(role => role.id === settings.MODERATOR_ROLE_ID))
            return interaction.reply({ embeds: [invalidPerms] });

        let xp_amount = interaction.options.getInteger('amount');
        const user = interaction.options.getUser('user');

        if(xp_amount <= 0)
            return interaction.reply({ embeds: [invalidXPRange] });

        if(user.bot)
            return interaction.reply({ embeds: [invalidUser] });

        if(!await XPOps.checkXPData(user.id)) 
            return interaction.reply({ embeds: [invalidUserXPData] })

        const deleteXP_success = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription(`Successfully removed ${xp_amount} from ${user}!`)

        let userXPData = await XPOps.retrieveXPData(user.id);
        let level = Math.floor((userXPData.xp_amount - xp_amount) / settings.XP_PER_LEVEL) 

        xp_amount = -xp_amount;
        await XPOps.updateXPData(user.id, { level, $inc: { xp_amount } });
        return interaction.reply({ embeds: [deleteXP_success] })
    }
}