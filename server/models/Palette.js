const { Schema } = require('mongoose');

const PaletteSchema = new Schema(
    {
        colors: [
            {
                type: String
            }
        ],
        icons: [
            {
                type: String
            }
        ]
    }
);

module.exports = PaletteSchema; 
