const ProuctModal = require('../../models/product').modal;
const ResUtil = require('../../utils/response');

const JWTUtil = require('../../utils/jwt');

/**
 * Delete Product
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

  /* Prepare Request */
  const where = { _id: id };

  /* Process Request */
  ProuctModal.deleteOne(where).exec((error, data) => {
    if (error) {
      return ResUtil.error(response, error, 'Error deleting product');
    }
    return ResUtil.success(response, 'Product Deleted');
  });
};
