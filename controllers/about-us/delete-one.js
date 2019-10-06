const AboutUsModal = require('../../models/about-us').modal;
const ResUtil = require('../../utils/response');

/**
 * Delete About Us
 * @param string request.param.id | about us id
 * @return message success message
 * @error invalid request
 * @error internal server error
 */
exports['v1'] = (request, response) => {
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
