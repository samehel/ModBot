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
        )
];

module.exports = slashCommands;

