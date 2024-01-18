const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
    {
        value: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        baseUrl: {
            type: String,
            required: true,
        },
        searchUrlPart: {
            type: String,
            required: true,
        },
        filters: {
            type: Array,
            required: true,
        },
    },
    {
        versionKey: false,
    }
);
