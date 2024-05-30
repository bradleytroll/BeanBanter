const { User, CoffeeShop } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id).populate('coffeeShops');
      }
      throw new AuthenticationError('Not logged in');
    },
    coffeeShops: async () => {
      return CoffeeShop.find().populate('user');
    },
    coffeeShop: async (parent, { id }) => {
      return CoffeeShop.findById(id).populate('user');
    },
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
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    addCoffeeShop: async (parent, args, context) => {
        if (context.user) {
          const coffeeShop = await CoffeeShop.create({ ...args, user: context.user._id });
          await User.findByIdAndUpdate(context.user._id, { $push: { coffeeShops: coffeeShop._id } });
          return coffeeShop;
        }
        throw new AuthenticationError('Not logged in');
    },
    updateCoffeeShop: async (parent, { id, ...args }, context) => {
      if (context.user) {
        return CoffeeShop.findByIdAndUpdate(id, args, { new: true });
      }
      throw new AuthenticationError('Not logged in');
    },
    deleteCoffeeShop: async (parent, { id }, context) => {
      if (context.user) {
        return CoffeeShop.findByIdAndDelete(id);
      }
      throw new AuthenticationError('Not logged in');
    },
    deleteuser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
