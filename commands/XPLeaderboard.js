const { EmbedBuilder } = require('discord.js')
const XPOps = require('../Database/CRUDOperations/XPOperations');

async function createLeaderboard(client, XPUserData) {
    XPUserData.sort((a, b) => b.xp_amount - a.xp_amount);

    let leaderboard = '';
    for (const [index, user] of XPUserData.entries()) {
        try {
            const fetchedUser = await client.users.fetch(user.user_id);
            leaderboard += `${index + 1}. ${fetchedUser.globalName} - Level ${user.level} (${user.xp_amount} XP)\n`;
        } catch (error) {
            console.error(`Failed to fetch user with ID: ${user.user_id}`, error);
            leaderboard += `${index + 1}. Unknown User - Level ${user.level}(${user.xp_amount} XP)\n`;
        }
    }

    return leaderboard;
}

module.exports = {
    name: 'leaderboard',
    run: async (client, interaction, settings) => {

        const XPUserData = await XPOps.retrieveAllXPData();

        let leaderboardData = await createLeaderboard(client, XPUserData)

        const leaderboard = new EmbedBuilder()
        .setTitle('XP Leaderboard')
        .setColor(settings.EMBED_COLOR)
        .setDescription(leaderboardData);

        return interaction.reply({ embeds: [leaderboard] });
    }
}