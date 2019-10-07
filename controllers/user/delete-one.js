const UserModal = require('../../models/user').modal;
const ResUtil = require('../../utils/response');

/**
 * Delete User
 * @param string request.param.id | user id
 * @return message success message
 * @error invalid request
 * @error internal server error
 */
exports['v1'] = (request, response) => {
  let id = request.params.id;

  /* Prepare Request */
  const where = { _id: id };

  /* Process Request */
  UserModal.deleteOne(where).exec((error, data) => {
    if (error) {
      return ResUtil.error(response, error, 'Error deleting user');
    }
    return ResUtil.success(response, 'User Deleted');
  });
};
