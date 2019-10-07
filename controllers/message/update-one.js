const MessageModal = require('../../models/message').modal;
const ResUtil = require('../../utils/response');

const JWTUtil = require('../../utils/jwt');

/**
 * Update Message
 * The Point of update will be the point until where the key is mentioned in string form.
 * @param string request.param.id | message id
 * @return message success message
 * @error invalid request
 * @error internal server error
 */
exports['v1'] = async (request, response) => {
  const [jwtError, user] = await JWTUtil.verifyAndGetData(request.headers);

  if (jwtError) {
    return ResUtil.unauthorizedRequest(response);
  }

  let id = request.params.id;

  /* Prepare Request */
  const where = { _id: id };

  const projection = {
    $set: { status: true }
  };

  /* Process Request */
  MessageModal.updateOne(where, projection).exec(async (error, data) => {
    if (error) {
      return ResUtil.error(response, error, 'Error updating status');
    }
    return ResUtil.success(response, 'Message Updated');
  });
};
