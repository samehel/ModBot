const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MANGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

module.exports = connectDB;

