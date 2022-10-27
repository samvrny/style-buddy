const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

//import subdocument schemas for Palette, Font, and Image
const PaletteSchema = require('./Palette');
const ImageSchema = require('./Image');
const FontSchema = require('./Font');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'You must enter a valid email address! Example: john@email.com']
        },
        password: {
            type: String,
            required: true,
            minLength: 8
        },
        savedPalettes: [PaletteSchema],
        savedImages: [ImageSchema],
        savedFonts: [FontSchema]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

//hash the password 
UserSchema.pre('save', async function(next) {
    if(this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});

//compare an incoming password to it's hashed version
UserSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', UserSchema);

module.exports = User;
