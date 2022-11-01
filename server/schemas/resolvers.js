const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {

        me: async (parent, args, context) => {

            if (context.user) {

                const userData = await User.findOne({

                    _id: context.user._id
                })
                    .select('-__v -password')
                    .populate('palettes')
                    .populate('images')
                    .populate('fonts');

                return userData;

            }

            throw new AuthenticationError('You\'re not logged in');
        }
    },

    Mutation: {

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Credentials are incorrect');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Credentials are incorrect');
            }
            const token = signToken(user);
            return { token, user };
        },

        savePalette: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedPalettes: args } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('Please log in first');
        },

        saveFont: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedFonts: args } },
                    { new: true }
                )
                return updatedUser;
            }
            throw new AuthenticationError('Please log in first')
        },

        saveImage: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedImages: args } },
                    { new: true }
                )
                return updatedUser;
            }
            throw new AuthenticationError('Please log in first')
        },

        removeFont: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedFonts: { chosenFont: args.chosenFont } } },
                    { new: true }

                );
                return updatedUser;
            }
            throw new AuthenticationError('Please log in first');
        },

        removePalette: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedPalettes: { id: args.id } } },
                    { new: true }

                );
                return updatedUser;
            }
            throw new AuthenticationError('Please log in first');
        },

        removeImage: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedImages: { imageId: args.imageId } } },
                    { new: true }
                )
                return updatedUser;
            }
            throw new AuthenticationError('Please log in first');
        }

    }
}

module.exports = resolvers;