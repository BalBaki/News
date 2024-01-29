const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        filterSettings: Object,
        favorites: Array,
    },
    {
        versionKey: false,
        minimize: false,
    }
);
