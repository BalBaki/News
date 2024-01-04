const mongoose = require('mongoose');

module.exports = new mongoose.Schema(
    {
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
