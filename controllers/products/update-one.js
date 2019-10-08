const ProductModal = require('../../models/product').modal;
const Merger = require('../../app/merger');
const ResUtil = require('../../utils/response');

const JWTUtil = require('../../utils/jwt');

/**
 * Update Product
 * The Point of update will be the point until where the key is mentioned in string form.
 * @param string request.param.id | product id
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
  const product = new ProductModal(await Merger.object(ProductModal, id, body));

  /* Validate Payload */
  const error = product.validateSync();
  if (error) {
    return ResUtil.invalidInput(response, error.errors, 'Invalid Payload');
  }

  /* Prepare Request */
  const where = { _id: id };

  const projection = {
    $set: body
  };

  /* Process Request */
  ProductModal.updateOne(where, projection).exec(async (error, data) => {
    if (error) {
      return ResUtil.error(response, error, 'Error updating product');
    }
    return ResUtil.success(response, 'Product Updated');
  });
};
