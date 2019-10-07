const bcrypt = require('bcrypt');

const UserModal = require('../../models/user').modal;
const Merger = require('../../app/merger');
const ResUtil = require('../../utils/response');

const saltRounds = 10;

/**
 * Update User
 * The Point of update will be the point until where the key is mentioned in string form.
 * @param string request.param.id | about us id
 * @return message success message
 * @error invalid request
 * @error internal server error
 */
exports['v1'] = async (request, response) => {
  let id = request.params.id;

  let body = request.body;
  /* Convert payload to Modal */
  const user = new UserModal(await Merger.object(UserModal, id, body));

  /* Validate Payload */
  const error = user.validateSync();
  if (error) {
    return ResUtil.invalidInput(response, error.errors, 'Invalid Payload');
  }

  if (body.password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    body.password = bcrypt.hashSync(body.password, salt);
  }

  /* Prepare Request */
  const where = { _id: id };

  const projection = {
    $set: body
  };

  /* Process Request */
  UserModal.updateOne(where, projection).exec(async (error, data) => {
    if (error) {
      return ResUtil.error(response, error, 'Error updating user');
    }
    return ResUtil.success(response, 'User Updated');
  });
};
