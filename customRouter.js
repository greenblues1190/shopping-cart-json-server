const fs = require('fs');

const customRouter = fs
  .readdirSync('./routes/')
  .filter((f) => f.endsWith('.js'))
  .map((file) => {
    const route = require(`./routes/${file}`);

    return route;
  });

module.exports = customRouter;
