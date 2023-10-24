const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        full_name: { type: String},
        email: { type: String},
        password: { type: String },
        role: {type: String}
    },
    {
        collection: 'user-data'
    }
);

const User = mongoose.model('UserData', userSchema);

User.on('error', (err) => {
    console.error('Mongoose User Model Error:', err);
});

module.exports = User;
