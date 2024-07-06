const mongoose = require('mongoose');

const XPDataSchema = new mongoose.Schema({
    user_id: { type: String },
    level: { type: Number, default: 0 },
    xp_amount: { type: Number, default: 5 },
    multiplier: { type: Number, default: 1.0 }
});

module.exports = mongoose.model('XPData', XPDataSchema);