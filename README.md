# ModBot - A Discord Bot for Server Management

ModBot is a Discord bot designed for moderation and utility purposes.

## Technologies

- **Node.js**: Backend JavaScript runtime environment.
- **discord.js**: Library for interacting with the Discord API.
- **MongoDB**: NoSQL database for storing persistent data.
- **dotenv**: Module for loading environment variables from a .env file.

## Features

- **Moderation Commands**: Kick, ban/unban, warn/unwarn, mute/unmute users.
- **Utility Commands**: Ping, view user profiles, XP Leveling, help.

## Installation

To run ModBot locally or on your server, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/samehel/ModBot.git
   cd ModBot
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory with the following:

   ```plaintext
    # Bot Info
    TOKEN=your_bot_token
    BOT_ID=your_bot_client_id
    
    # Mongo Settings
    MONGODB_URI=your_mongodb_uri
    
    # Server Settings
    GUILD_ID=your_guild_id
    JOINERS_AND_LEAVERS_LOG_CHANNEL=your_channel_id
    EMBED_COLOR="#your_embed_hex"
    MODERATOR_ROLE_ID=your_mod_role_id
    MUTE_ROLE_ID=your_mute_role_id
    
    # XP Handler Settings
    startingLevel=0;
    minimumMultiplier=1.0;
    maximumMultiplier=5.0;
    XP_PER_MSG=5.0
    XP_PER_LEVEL=100.0
    
    # Warn System Settings
    WARN_KICK=3
    WARN_BAN=5
   ```

4. **Run the Bot**

   ```bash
   npx nodemon index.js
   ```

## Commands

### Moderation Commands

- `/kick @user`: Kick a user from the server.
- `/ban @user reason`: Ban a user from the server.
- `/unban @user`: Unban a user from the server.
- `/mute @user reason`: Mute a user in the server.
- `/unmute @user`: Unmute a user in the server.
- `/warn @user reason`: Warn a user with a reason.
- `/delwarn @user`: Delete the most recent warning from a user.
- `/warnings @user`: View all warnings or a specific user's warnings.

### Utility Commands

- `/ping`: Check the bot's latency.
- `/myprofile @user`: Display information about a user or about yourself.
- `/leaderboard`: View the XP Leaderboard.
- `/help`: View a list of available commands.
