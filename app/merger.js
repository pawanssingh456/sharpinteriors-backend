const ObjectUtil = require('../utils/object');

exports.object = async function(modal, id, body) {
  const where = { _id: id };

  /* Getting Data */
  let data = await modal.findOne(where);
  return ObjectUtil.mergeDeep(data.toObject(), body);
};
