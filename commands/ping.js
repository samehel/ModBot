module.exports = {
    name: 'ping',
    run: (client, interaction, _) => {
        interaction.reply(`**Ping** is \`${Math.abs(Date.now() - interaction.createdTimestamp)}ms\`\n**API Ping** is \`${Math.abs(Math.round(client.ws.ping))}ms\``);
    }
}