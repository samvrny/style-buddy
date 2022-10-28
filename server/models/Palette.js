const { Schema } = require('mongoose');

const PaletteSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
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
