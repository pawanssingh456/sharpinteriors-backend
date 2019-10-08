const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    category: {
      type: String,
      required: [true, 'Category is Required']
    },
    name: {
      type: String
    },
    image: {
      type: String,
      required: [true, 'Image is Required']
    },
    description: {
      type: String
    }
  },
  { timestamps: true },
  { strict: true }
);

exports.modal = mongoose.model('Product', productSchema);
