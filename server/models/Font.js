const { Schema } = require('mongoose');

const FontSchema = new Schema(
    {
        chosenFont: {
            type: String,
        }
    }
);

module.exports = FontSchema;