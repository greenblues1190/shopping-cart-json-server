const { Router, json, urlencoded } = require('express');
const toNumber = require('../utils/toNumber');
const createTimestamp = require('../utils/createTimestamp');
const getDB = require('../utils/getDB');

const bodyParsingHandler = [
  json({ limit: '10mb' }),
  urlencoded({ extended: false }),
];

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).jsonp(err.message);
};

const insert = (req, res, next) => {
  createTimestamp(req);

  next();
};

const purchase = (req, res, next) => {
  const { id, quantity } = toNumber(req.body, ['id', 'quantity']);
  const db = getDB(req);

  if (!quantity || quantity < 1 || !Number.isInteger(quantity)) {
    res.status(400).jsonp('Purchasing quantity is invalid');

    return;
  }

  const productLodashObject = db.get('products').find({ id });
  const product = productLodashObject.value();

  if (!product) {
    res.status(400).jsonp("Product doesn't exist");

    return;
  }

  if (product.stock < quantity) {
    res.status(400).jsonp('Not enough stock');

    return;
  }

  try {
    const purchasedProduct = productLodashObject
      .update('stock', (stock) => stock - quantity)
      .value();

    res.status(200).jsonp({ purchasedProduct });
  } catch (error) {
    throw Error('error');
  }
};

module.exports = Router()
  .use(bodyParsingHandler)
  .post('/products', insert)
  .post('/purchase', purchase)
  .use(errorHandler);
