const { Schema } = require('mongoose');

const ImageSchema = new Schema(
    {
        id: {
            type: String,
            unique: true,
            required: true
        },
        width: {
            type: String,
            required: true
        },
        height: {
            type: String,
            required: true
        },
        photographer: {
            type: String,
            required: true
        },
        src: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            required: true
        }   
    }
);

module.exports = ImageSchema;