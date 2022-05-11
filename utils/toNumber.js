const toNumber = (object, keysToBeConverted) => {
  const typecastedObject = {};

  Object.entries(object).forEach(([key, value]) => {
    typecastedObject[key] = keysToBeConverted.includes(key)
      ? Number(value)
      : value;
  });

  return typecastedObject;
};

module.exports = toNumber;
