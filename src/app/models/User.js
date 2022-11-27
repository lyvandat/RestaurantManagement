const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String },
        status: { type: Boolean },
        image: { type: String },
    },
    {
        timestamps: true,
    },
);

// Add plugin

module.exports = mongoose.model('User', UserSchema);