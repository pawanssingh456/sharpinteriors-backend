const MessageModal = require('../../models/message').modal;
const ResUtil = require('../../utils/response');

/**
 * Create Message
 * @param object request.body | message payload
 * @return string inserted message id
 * @error invalid input
 * @error internal server error
 */
exports['v1'] = async (request, response) => {
  /* Convert payload to Modal */
  const message = new MessageModal(request.body);

  /* Validate Payload */
  const error = message.validateSync();
  if (error) {
    return ResUtil.invalidInput(response, error.errors, 'Invalid Payload');
  }

  /* Process Request */
  MessageModal.collection.insertOne(message, (error, data) => {
    if (error) {
      return ResUtil.error(response, error, 'Error Creating Message');
    }
    return ResUtil.created(response, data.insertedId);
  });
};
