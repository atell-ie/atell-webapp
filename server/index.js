const path = require('path');
const cors = require('cors');
const express = require('express');
const compression = require('compression');

const PORT = process.env.PORT || 3000;
const publicPath = path.resolve('./public');
const server = express();

server.use(compression());
server.use(express.static(publicPath, { index: false }));

server.get('*', (req, res) => {
  res.sendFile(`${publicPath}/index.html`);
});
server.get('/static/*', cors(), (req, res, next) => {
  next();
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
