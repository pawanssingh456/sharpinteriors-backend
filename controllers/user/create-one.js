const bcrypt = require('bcrypt');

const UserModal = require('../../models/user').modal;
const ResUtil = require('../../utils/response');

const saltRounds = 10;

/**
 * Create User
 * @param object request.body | User payload
 * @return string inserted User id
 * @error invalid input
 * @error internal server error
 */
exports['v1'] = (request, response) => {
  /* Convert payload to Modal */
  let user = new UserModal(request.body);

  /* Validate Payload */
  const error = user.validateSync();
  if (error) {
    return ResUtil.invalidInput(response, error.errors, 'Invalid Payload');
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  user.password = bcrypt.hashSync(user.password, salt);

  /* Process Request */
  UserModal.collection.insertOne(user, (error, data) => {
    if (error) {
      return ResUtil.error(response, error, 'Error Creating User');
    }
    return ResUtil.created(response, data.insertedId);
  });
};
