const { SlashCommandBuilder } = require('discord.js');

const slashCommands = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping the bot'),
    new SlashCommandBuilder()
        .setName('addxp')
        .setDescription('Add xp to a user')
        .addIntegerOption(addxp => 
            addxp.setName('amount')
                 .setDescription('Amount of xp you want to add')
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
                 .setDescription('Amount of xp you want to remove')
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
        .setDescription('View your profile'),
    new SlashCommandBuilder()
        .setName('help')
        .setDescription('View a list of available commands'),
    new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user')
        .addUserOption(user => 
            user.setName('user')
                .setDescription('user you want to ban')
                .setRequired(true)
        )
        .addStringOption(reason => 
            reason.setName('reason')
                  .setDescription('The reason for banning them')
                  .setRequired(false)
        ),
    new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban a user')
        .addStringOption(userid => 
            userid.setName('userid')
                   .setDescription('ID of user you are trying to unban')
                   .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('kick')
        .setDescription('kick a user')
        .addUserOption(user => 
            user.setName('user')
                .setDescription('user you want to kick')
                .setRequired(true)
        )
        .addStringOption(reason => 
            reason.setName('reason')
                  .setDescription('The reason for kicking them')
                  .setRequired(false)
        ),
    new SlashCommandBuilder()
        .setName('mute')
        .setDescription('mute a user')
        .addUserOption(user => 
            user.setName('user')
                .setDescription('user you want to mute')
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('unmute a user')
        .addUserOption(user => 
            user.setName('user')
                .setDescription('user you want to unmute')
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('warn')
        .setDescription('warn a user')
        .addUserOption(user => 
            user.setName('user')
                .setDescription('user you want to warn')
                .setRequired(true)
        )
        .addStringOption(reason => 
            reason.setName('reason')
                  .setDescription('The reason for warning them')
                  .setRequired(true)
        ),
];

module.exports = slashCommands;

