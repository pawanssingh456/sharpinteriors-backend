const AboutUsModal = require('../../models/about-us').modal;
const ResUtil = require('../../utils/response');

const JWTUtil = require('../../utils/jwt');

/**
 * Delete About Us
 * @param string request.param.id | about us id
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

  /* Process Request */
  AboutUsModal.deleteOne(where).exec((error, data) => {
    if (error) {
      return ResUtil.error(response, error, 'Error deleting about us');
    }
    return ResUtil.success(response, 'About us Deleted');
  });
};
