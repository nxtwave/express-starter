const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// get API routes
const api = require('./server/routes/api');

// initialize app
const app = express();

// configure parsers for post data:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// point static path to dist:
app.use(express.static(path.join(__dirname, 'dist')));

// set up api routes:
app.use('/api', api);

// catch all other routes and direct to index.html:
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// get port from env and store in app:
const port = process.env.PORT || 3000;
app.set('port', port);

// create HTTP Server
const server = http.createServer(app);

// listen on specified port:
server.listen(port, () => console.log(`API listening on localhost:${port}`));
