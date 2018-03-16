const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const proxyMiddleware = require('http-proxy-middleware')
const Free = require('./server/routes/book')
const app = new express();
app.use('/static', express.static(__dirname + '/dist/static'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
  // res.json({a:1})
  res.sendfile('./dist/index.html');
})

require('./server/middleware/database');

const proxySet = require('./src/servers/proxy');
app.use(proxyMiddleware(proxySet.context, proxySet.options));

//需要cookie获取的信息
var cookieApi = require('./src/servers/api');
app.get('/book/read', cookieApi.read)
app.get('/api/free', cookieApi.free)
app.get('/api/searchpage', cookieApi.searchpage)
app.get('/free/book/:id', Free.fetchFreeBook)
app.get('/free/read', Free.fetchFreeRead)
app.listen(3000);
