const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.generate = async (id, result) => {
  const encapsulateUserData = {
    id: id
  };

  const token = await jwt.sign(encapsulateUserData, JWT_SECRET, {});
  return token;
};

exports.verify = (token, result) => {
  jwt.verify(token, JWT_SECRET, (error, data) => {
    if (error) {
      return result(error);
    }
    return result(null, data);
  });
};
