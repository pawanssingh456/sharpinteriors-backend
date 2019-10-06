const AboutUsModal = require('../../models/about-us').modal;
const ResUtil = require('../../utils/response');

/**
 * Create About Us
 * @param object request.body | about us payload
 * @return string inserted about us id
 * @error invalid input
 * @error internal server error
 */
exports['v1'] = (request, response) => {
  /* Convert payload to Modal */
  const aboutUs = new AboutUsModal(request.body);

  /* Validate Payload */
  const error = aboutUs.validateSync();
  if (error) {
    return ResUtil.invalidInput(response, error.errors, 'Invalid Payload');
  }

  /* Process Request */
  AboutUsModal.collection.insertOne(aboutUs, (error, data) => {
    if (error) {
      return ResUtil.error(response, error, 'Error Creating About Us');
    }
    return ResUtil.created(response, data.insertedId);
  });
};
