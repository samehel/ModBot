const mongoose = require('mongoose');

const WarnDataSchema = new mongoose.Schema({
    user_id: { type: String },
    warn_reasons: { type: [String] },
    warn_count: { type: Number, default: 0 },
});

module.exports = mongoose.model('WarnData', WarnDataSchema);