const UserModal = require('../../models/user').modal;
const ResUtil = require('../../utils/response');

/**
 * Read Single User
 * @param string request.param.id | user id
 * @return a user
 * @error invalid request
 * @error internal server error
 */
exports['v1'] = (request, response) => {
  let id = request.params.id;

  /* Prepare Request */
  const where = { _id: id };

  /* Process Request */
  UserModal.findOne(where).exec((error, data) => {
    if (error) {
      return ResUtil.error(response, error, 'Error getting User');
    }
    return ResUtil.success(response, data);
  });
};
