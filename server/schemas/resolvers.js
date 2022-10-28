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
    }
}

module.exports = resolvers;