const XPData = require('../Models/XP_DATA');

// Create
async function createXPData(user_id, level, xp_amount, multiplier) {
    try {
        const newXPData = new XPData({ user_id, level, xp_amount, multiplier });
        await newXPData.save();
        return newXPData;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

// Retrieve
async function retrieveXPData(user_id) {
    try {
        const userXPData = await XPData.findOne({ user_id });
        return userXPData;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

// Retrieve All
async function retrieveAllXPData() {
    try {
        const allXPData = await XPData.find();
        return allXPData;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

// Check if data exists 
async function checkXPData(user_id) {
    const checkUserXPData = await XPData.findOne({ user_id });
    return checkUserXPData !== null;
}

// Update
async function updateXPData(user_id, newXPData) {
    try {
        const updateXPData = await XPData.findOneAndUpdate({ user_id }, newXPData, { new: true })
        return updateXPData;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

// Delete
async function deleteXPDate(user_id) {
    try {
        const deleteXPData = await XPData.findOneAndDelete({ user_id });
        return deleteXPData;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

module.exports = {
    createXPData,
    retrieveXPData,
    retrieveAllXPData,
    checkXPData,
    updateXPData,
    deleteXPDate
}