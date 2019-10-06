const mongoose = require('mongoose');

const url = process.env.MONGODB_CONNECTION_URL;

module.exports.initialize = result => {
  mongoose
    .connect(url, { useNewUrlParser: true })
    .then(() => {
      result();
    })
    .catch(err => {
      result(err);
    });

  mongoose.Promise = global.Promise;
};
