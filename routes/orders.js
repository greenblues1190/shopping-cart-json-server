const { Router } = require('express');
const { bodyParsingHandler, errorHandler } = require('../utils/sharedRoutes');
const toNumber = require('../utils/toNumber');
const createTimestamp = require('../utils/createTimestamp');
const getDB = require('../utils/getDB');

const order = (req, res, next) => {
  const { userId, orderedProducts } = toNumber(req.body, [userId]);
  const db = getDB(req);

  const userLodashObject = db.get('users').find({ userId });
  const user = userLodashObject.value();

  if (!user) {
    res.status(400).jsonp("User doesn't exist");

    return;
  }

  const isValidOrderedProducts = orderedProducts.every(
    ({ productId, quantity }) => {
      const productLodashObject = db.get('products').find({ productId });
      const product = productLodashObject.value();

      return !!product && product.stock >= quantity;
    },
  );

  if (!isValidOrderedProducts) {
    res.status(400).jsonp('Ordered products is invalid');

    return;
  }

  orderedProducts.forEach(({ productId, quantity }) => {
    const productLodashObject = db.get('products').find({ productId });

    productLodashObject.update('stock', (stock) => stock - quantity).value();
  });

  createTimestamp(req);

  next();
};

module.exports = Router()
  .use(bodyParsingHandler)
  .post('/order', order)
  .use(errorHandler);
