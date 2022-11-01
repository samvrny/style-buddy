const { Schema } = require('mongoose');

const ImageSchema = new Schema(
    {
<<<<<<< HEAD
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
=======
        imageId: {
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
            type: String,
            required: true
        },
        photographer: {
            type: String,
            required: true
        },
<<<<<<< HEAD
        src: {
=======
        small: {
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
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