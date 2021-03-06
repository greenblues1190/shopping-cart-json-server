const jsonServer = require('json-server');
const customRouter = require('./customRouter');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000;

server.db = router.db;

server.use(middlewares);
server.use(customRouter);
server.use(router);
server.listen(port, () => {
  console.log('JSON Server is running');
});
