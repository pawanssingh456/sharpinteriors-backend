const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const aboutUsSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, 'Type is Required']
    },
    title: {
      type: String,
      required: [true, 'Title is Required']
    },
    image: {
      type: String
    }
  },
  { timestamps: true },
  { strict: true }
);

aboutUsSchema.index({ type: 1, title: 1 }, { unique: true });

exports.modal = mongoose.model('AboutUs', aboutUsSchema);
