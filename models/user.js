// import { model } from 'mongoose';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        // validate: {
        //     validator: async function (x) {

        //         const user = await models.User.findOne({ username: x });
        //         return !user;
        //     },
        //     message: 'Username already exists'
        // }
    },
    password: {
        type: String,
        required: true,
        // validate: {
        //     validator: function (v) {

        //         return /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9]).{8,}$/.test(v);
        //     },
        //     message: 'Password must contain at least one special character and have a minimum length of 8 characters'
        // }
    },
    role: {
        type: String,
        enum: ['Admin', 'Normal', 'SuperAdmin'],
        default:'Normal'
    }
});

userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    })
})

const user = mongoose.model('user', userSchema);

module.exports = user;