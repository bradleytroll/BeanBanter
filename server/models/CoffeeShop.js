
const { Schema, model } = require('mongoose');

const coffeeShopSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  review: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const CoffeeShop = model('CoffeeShop', coffeeShopSchema);

module.exports = CoffeeShop;
