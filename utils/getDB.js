const getDB = (req) => {
  console.log(req.app);

  const { db } = req.app;

  if (!db) {
    throw Error('You must bind the router db to the app');
  }

  return db;
};

module.exports = getDB;
