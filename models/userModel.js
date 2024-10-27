const mongoose = require('mongoose');

// Define User Schema with unique index on email
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please provide a username']
        },
        email: {
            type: String,
            unique: true, // Ensure unique index is set
            required: [true, 'Please provide an email']
        },
        password: {
            type: String,
            required: [true, 'Please provide a password']
        }
    },
    {
        timestamps: true
    }
);

// Apply unique index for email field
UserSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema);
