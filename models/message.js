const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is Required']
    },
    mobile: {
      type: String,
      required: [true, 'Mobile is Required']
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address'
      ]
    },
    message: {
      type: String,
      required: [true, 'Message is Required']
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true },
  { strict: true }
);

exports.modal = mongoose.model('Message', messageSchema);
