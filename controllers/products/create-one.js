const ProductModal = require('../../models/product').modal;
const ResUtil = require('../../utils/response');

const JWTUtil = require('../../utils/jwt');

/**
 * Create Product
 * @param object request.body | product payload
 * @return string inserted product id
 * @error invalid input
 * @error internal server error
 */
exports['v1'] = async (request, response) => {
  const [jwtError, user] = await JWTUtil.verifyAndGetData(request.headers);

  if (jwtError) {
    return ResUtil.unauthorizedRequest(response);
  }

  /* Convert payload to Modal */
  const product = new ProductModal(request.body);

  /* Validate Payload */
  const error = product.validateSync();
  if (error) {
    return ResUtil.invalidInput(response, error.errors, 'Invalid Payload');
  }

  /* Process Request */
  ProductModal.collection.insertOne(product, (error, data) => {
    if (error) {
      return ResUtil.error(response, error, 'Error Creating Product');
    }
    return ResUtil.created(response, data.insertedId);
  });
};
