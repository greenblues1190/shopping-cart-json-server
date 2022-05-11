const { json, urlencoded } = require('express');

const bodyParsingHandler = [
  json({ limit: '10mb' }),
  urlencoded({ extended: false }),
];

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).jsonp(err.message);
};

module.exports = {
  bodyParsingHandler,
  errorHandler,
};
