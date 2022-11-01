const { Schema } = require('mongoose');

const FontSchema = new Schema(
    {
<<<<<<< HEAD
        font: {
            type: String,
            unique: true
=======
        chosenFont: {
            type: String,
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
        }
    }
);

module.exports = FontSchema;