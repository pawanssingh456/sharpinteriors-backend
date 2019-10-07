const UserModal = require('../../models/user').modal;
const ResUtil = require('../../utils/response');

/**
 * Read Multiple User
 * @return [string] an array of users
 * @error invalid request
 * @error internal server error
 */
exports['v1'] = (request, response) => {
  /* Process Request */
  UserModal.find().exec((error, data) => {
    if (error) {
      return ResUtil.error(response, error, 'Error getting Users');
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
