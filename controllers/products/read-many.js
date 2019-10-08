const ProductModal = require('../../models/product').modal;
const ResUtil = require('../../utils/response');

/**
 * Read Multiple Prodcuts
 * @return [product] an array ofproducts
 * @error invalid request
 * @error internal server error
 */
exports['v1'] = (request, response) => {
  /* Process Request */
  ProductModal.find().exec((error, data) => {
    if (error) {
      return ResUtil.error(response, error, 'Error getting Products');
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
