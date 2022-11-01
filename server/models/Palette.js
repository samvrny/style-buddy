const { Schema } = require('mongoose');

const PaletteSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
<<<<<<< HEAD
            unique: true
=======
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
        },
        color1: {
            type: String,
            required: true
        },
        color2: {
            type: String,
            required: true
        },
        color3: {
            type: String,
            required: true
        }    
    }
);

module.exports = PaletteSchema; 
