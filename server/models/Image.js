const { Schema } = require('mongoose');

const ImageSchema = new Schema(
    {
        imageId: {
            type: String,
            required: true
        },
        photographer: {
            type: String,
            required: true
        },
        small: {
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