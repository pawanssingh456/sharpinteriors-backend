const MessageModal = require('../../models/message').modal;
const ResUtil = require('../../utils/response');

const JWTUtil = require('../../utils/jwt');

/**
 * Read Single Message
 * @param string request.param.id | message id
 * @return a message
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

  /* Process Request */
  MessageModal.findOne(where).exec((error, data) => {
    if (error) {
      return ResUtil.error(response, error, 'Error getting User');
    }
    return ResUtil.success(response, data);
  });
};
