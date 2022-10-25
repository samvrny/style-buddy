const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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
        palettes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Palette'
            }
        ],
        images: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Image'
            }
        ],
        fonts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Font'
            }
        ]
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
UserSchema.methods.isPasswordCorrect = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', UserSchema);

module.exports = User;