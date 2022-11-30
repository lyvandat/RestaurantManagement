const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String },
        role: { type: String },
        active: { type: Boolean },
        photo: { type: String },
        
    },
    {
        timestamps: true,
    },
);

// Add plugin

module.exports = mongoose.model('User', UserSchema);