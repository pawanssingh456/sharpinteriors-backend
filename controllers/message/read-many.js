const MessageModal = require('../../models/message').modal;
const ResUtil = require('../../utils/response');

const JWTUtil = require('../../utils/jwt');

/**
 * Read Multiple Message
 * @return [message] an array of Messages
 * @error invalid request
 * @error internal server error
 */
exports['v1'] = async (request, response) => {
  const [jwtError, user] = await JWTUtil.verifyAndGetData(request.headers);

  if (jwtError) {
    return ResUtil.unauthorizedRequest(response);
  }

  /* Process Request */
  MessageModal.find().exec((error, data) => {
    if (error) {
      return ResUtil.error(response, error, 'Error getting Messages');
    }

    /* Get Manipulated data */
    // const manipulatedData = manipulateData(data);

    return ResUtil.success(response, data);
  });
};

/**
 * Get manipulated data | name as key and values as value
 * @data {string}
 * @returns Manipulated data
 */
function manipulateData(data) {
  let manipulatedData = {};
  for (const key in data) {
    manipulatedData[data[key].name] = data[key].values;
  }
  return manipulatedData;
}
