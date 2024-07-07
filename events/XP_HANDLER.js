const XPOps = require('../Database/CRUDOperations/XPOperations');

module.exports = {
    name: 'XP_HANDLER',
    run: async(message, settings) => {

        let user_id = message.author.id;
        let startingLevel = 0;
        let minimumMultiplier = 1.0;
        let maximumMultiplier = 5.0;

        if(await XPOps.checkXPData(user_id)) {
            const userXPData = await XPOps.retrieveXPData(user_id);

            if(message.member.roles.cache.some(role => role.name === 'Server Booster') && userXPData.multiplier == 1.0) {
                let multiplier = Math.floor(Math.random() * (maximumMultiplier - minimumMultiplier + 1) + minimumMultiplier);
                await XPOps.updateXPData(user_id, { multiplier });
            }
            
            let level = Math.floor(((userXPData.xp_amount + (settings.XP_PER_MSG * userXPData.multiplier)) / settings.XP_PER_LEVEL)) 
            await XPOps.updateXPData(user_id, { level, $inc: { xp_amount: settings.XP_PER_MSG * userXPData.multiplier } });
        } else {
            // If they are boosting the server, give them the chance to have a higher mutliplier
            // randomly generated
            if(message.member.roles.cache.some(role => role.name === 'Server Booster')) {
                let multiplier = Math.floor(Math.random() * (maximumMultiplier - minimumMultiplier + 1) + minimumMultiplier);
                return await XPOps.createXPData(user_id, startingLevel, settings.XP_PER_MSG * multiplier, multiplier);
            }

            await XPOps.createXPData(user_id);
        }
    }
}