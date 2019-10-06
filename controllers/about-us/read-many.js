const AboutUsModal = require('../../models/about-us').modal;
const ResUtil = require('../../utils/response');

/**
 * Read Multiple About Us
 * @return [about] an array of About Us
 * @error invalid request
 * @error internal server error
 */
exports['v1'] = (request, response) => {
  /* Process Request */
  AboutUsModal.find().exec((error, data) => {
    if (error) {
      return ResUtil.error(response, error, 'Error getting Options');
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
