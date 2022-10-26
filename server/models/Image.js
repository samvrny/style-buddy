const { Schema } = require('mongoose');

const ImageSchema = new Schema(
    {
        image: {
            type: String,
            unique: true
        }
    }
);

module.exports = ImageSchema;