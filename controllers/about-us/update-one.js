const AboutUsModal = require('../../models/about-us').modal;
const Merger = require('../../app/merger');
const ResUtil = require('../../utils/response');

const JWTUtil = require('../../utils/jwt');

/**
 * Update About Us
 * The Point of update will be the point until where the key is mentioned in string form.
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

  /* Convert payload to Modal */
  const body = request.body;
  const aboutUs = new AboutUsModal(await Merger.object(AboutUsModal, id, body));

  /* Validate Payload */
  const error = aboutUs.validateSync();
  if (error) {
    return ResUtil.invalidInput(response, error.errors, 'Invalid Payload');
  }

  /* Prepare Request */
  const where = { _id: id };

  const projection = {
    $set: body
  };

  /* Process Request */
  AboutUsModal.updateOne(where, projection).exec(async (error, data) => {
    if (error) {
      return ResUtil.error(response, error, 'Error updating about us');
    }
    return ResUtil.success(response, 'About Us Updated');
  });
};
