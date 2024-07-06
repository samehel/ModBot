const { SlashCommandBuilder } = require('discord.js');

const slashCommands = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('ping the bot'),
    new SlashCommandBuilder()
        .setName('addxp')
        .setDescription('add xp to a user')
        .addIntegerOption(addxp => 
            addxp.setName('amount')
                 .setDescription('amount of xp you want to add')
                 .setRequired(true)
        )
        .addUserOption(user => 
            user.setName('user')
                .setDescription('User to add XP to')
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('deletexp')
        .setDescription('remove xp from a user')
        .addIntegerOption(addxp => 
            addxp.setName('amount')
                 .setDescription('amount of xp you want to remove')
                 .setRequired(true)
        )
        .addUserOption(user => 
            user.setName('user')
                .setDescription('User to remove XP from')
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('View the XP Leaderboard'),
    new SlashCommandBuilder()
        .setName('myprofile')
        .setDescription('View your profile')
];

module.exports = slashCommands;

