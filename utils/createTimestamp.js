const createTimestamp = (req) => {
  req.body.createdAt = Date.now();
};

module.exports = createTimestamp;
