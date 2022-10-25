const { Schema } = require('mongoose');

const FontSchema = new Schema(
    {
        font: {
            type: String,
            unique: true
        }
    }
);

module.exports = FontSchema;