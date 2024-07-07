const slashCommands = require('../Assets/SlashCommandBuilder');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    run: (_, interaction, settings) => {
        
        const help = new EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setTitle('Commands')
        .setDescription('A list of available commands')
        
        slashCommands.forEach(cmd => {
            help.addFields({ name: `/${cmd.name}`, value: cmd.description, inline: true });
        })

        return interaction.reply({ embeds: [help] })
    }
}