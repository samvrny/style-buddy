const { Schema } = require('mongoose');

const FontSchema = new Schema(
    {
        font: {
            type: String,
        }
    }
);

module.exports = FontSchema;