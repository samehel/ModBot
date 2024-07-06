require('dotenv').config();

const discord = require('discord.js');
const client = new discord.Client({ partials: ["CHANNEL"], intents: [
        discord.GatewayIntentBits.DirectMessageReactions,
        discord.GatewayIntentBits.DirectMessageTyping,
        discord.GatewayIntentBits.DirectMessages,
        discord.GatewayIntentBits.GuildModeration,
        discord.GatewayIntentBits.GuildEmojisAndStickers,
        discord.GatewayIntentBits.GuildIntegrations,
        discord.GatewayIntentBits.GuildInvites,
        discord.GatewayIntentBits.GuildMembers,
        discord.GatewayIntentBits.GuildMessageReactions,
        discord.GatewayIntentBits.GuildMessageTyping,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.GuildPresences,
        discord.GatewayIntentBits.GuildScheduledEvents,
        discord.GatewayIntentBits.GuildVoiceStates,
        discord.GatewayIntentBits.GuildWebhooks,
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.MessageContent
    ] 
});
const fs = require('fs');
const slashCommands = require('./Assets/SlashCommandBuilder');

const connectDB = require('./Database/Connection');
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));

const settings = process.env;

client.commands = new discord.Collection();
client.events = new discord.Collection();

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

for(const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.events.set(event.name, event);
}

const commands = slashCommands.map(
    command => command.toJSON()
);

const rest = new discord.REST({ version: '10' }).setToken(settings.TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			discord.Routes.applicationGuildCommands(settings.BOT_ID, settings.GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();

connectDB();

client.on('ready', () => {
    console.log("ModBot is online!");
});

client.on('guildMemberAdd', async (guildMember) => {
    client.channels.cache.get(JOINERS_AND_LEAVERS_LOG_CHANNEL).send(`${guildMember.user}(${guildMember.id}) has joined.`);
});

client.on('guildMemberRemove', async (guildMember) => {
    client.channels.cache.get(JOINERS_AND_LEAVERS_LOG_CHANNEL).send(`${guildMember.user}(${guildMember.id}) has left.`);
});

client.on('interactionCreate', async interaction => {

    if(!interaction.isChatInputCommand()) return;

    const err = new discord.EmbedBuilder()
        .setColor(settings.EMBED_COLOR)
        .setDescription("This command does **not** exist. Use \`/help\` for the list of commands.")

    const { commandName } = interaction

    try {
        client.commands.get(commandName).run(client, interaction, settings)
    } catch(e) {
        interaction.reply({ embeds: [err] });
        console.log("Err:", e);
    }
});

client.on('messageCreate', async message => {
    if(message.author.bot) return;

    client.events.get('XP_HANDLER').run(message);
})

client.login(settings.TOKEN);