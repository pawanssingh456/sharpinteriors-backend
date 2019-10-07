const bcrypt = require('bcrypt');

const UserModal = require('../../models/user').modal;
const ResUtil = require('../../utils/response');
const JWTUtil = require('../../utils/jwt');

exports['v1'] = (request, response) => {
  const email = request.query.email;
  const password = request.query.password;

  /* Prepare Request */
  const where = { email: email };

  /* Process Request */
  UserModal.findOne(where).exec(async (error, data) => {
    if (error) {
      return ResUtil.error(response, error, 'Error Logging in');
    }

    const validate = bcrypt.compareSync(password, data.password);

    if (validate) {
      /* Generate JWT token */
      const token = await JWTUtil.generate(data._id);
      return ResUtil.success(response, token);
    } else {
      return ResUtil.invalidRequest(
        response,
        'Invalid Email or Password',
        'Invalid Email or Password'
      );
    }
  });
};
