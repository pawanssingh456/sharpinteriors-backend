const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
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
      unique: [true, 'Email already exist'],
      required: [true, 'Email is Required'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is Required']
    }
  },
  { timestamps: true },
  { strict: true }
);

exports.modal = mongoose.model('User', userSchema);
