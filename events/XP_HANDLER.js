const XPOps = require('../Database/CRUDOperations/XPOperations');

module.exports = {
    name: 'XP_HANDLER',
    run: async(message) => {

        let user_id = message.author.id;
        if(await XPOps.checkXPData(user_id)) {
            const userXPData = await XPOps.retrieveXPData(user_id);

            if(message.member.roles.cache.some(role => role.name === 'Server Booster') && userXPData.multiplier == 1.0) {
                let multiplier = Math.floor(Math.random() * (5.0 - 1.1 + 1) + 1.1);
                await XPOps.updateXPData(user_id, { multiplier });
            }
            
            await XPOps.updateXPData(user_id, { $inc: { xp_amount: 5 * userXPData.multiplier } });
        } else {
            // If they are boosting the server, give them the chance to have a higher mutliplier
            // randomly generated
            if(message.member.roles.cache.some(role => role.name === 'Server Booster')) {
                let multiplier = Math.floor(Math.random() * (5.0 - 1.1 + 1) + 1.1);
                return await XPOps.createXPData(user_id, 5 * multiplier, multiplier);
            }

            await XPOps.createXPData(user_id);
        }
    }
}