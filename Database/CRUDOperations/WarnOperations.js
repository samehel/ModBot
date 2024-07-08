const WarnData = require('../Models/WARN_DATA');

// Create
async function createWarnData(user_id, warn_reasons, warn_count) {
    try {
        const newWarnData = new WarnData({ user_id, warn_reasons, warn_count });
        await newWarnData.save();
        return newWarnData;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

// Retrieve
async function retrieveWarnData(user_id) {
    try {
        const userWarnData = await WarnData.findOne({ user_id });
        return userWarnData;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

// Retrieve All
async function retrieveAllWarnData() {
    try {
        const allWarnData = await WarnData.find();
        return allWarnData;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

// Check if data exists 
async function checkWarnData(user_id) {
    const checkUserWarnData = await WarnData.findOne({ user_id });
    return checkUserWarnData !== null;
}

// Update
async function updateWarnData(user_id, newWarnData) {
    try {
        const updateWarnData = await WarnData.findOneAndUpdate({ user_id }, newWarnData, { new: true })
        return updateWarnData;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

// Delete
async function deleteWarnData(user_id) {
    try {
        const deleteWarnData = await WarnData.findOneAndDelete({ user_id });
        return deleteWarnData;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

module.exports = {
    createWarnData,
    retrieveWarnData,
    retrieveAllWarnData,
    checkWarnData,
    updateWarnData,
    deleteWarnData
}