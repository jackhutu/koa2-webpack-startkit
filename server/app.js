'use strict';exports.__esModule = true;var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _koa = require('koa');var _koa2 = _interopRequireDefault(_koa);
var _koaRouter = require('koa-router');var _koaRouter2 = _interopRequireDefault(_koaRouter);
var _koaBodyparser = require('koa-bodyparser');var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);
var _koaViews = require('koa-views');var _koaViews2 = _interopRequireDefault(_koaViews);
var _koaStatic = require('koa-static');var _koaStatic2 = _interopRequireDefault(_koaStatic);
var _koaConvert = require('koa-convert');var _koaConvert2 = _interopRequireDefault(_koaConvert);
var _koaJson = require('koa-json');var _koaJson2 = _interopRequireDefault(_koaJson);
var _koaLogger = require('koa-logger');var _koaLogger2 = _interopRequireDefault(_koaLogger);
var _index = require('./routes/index');var _index2 = _interopRequireDefault(_index);
var _about = require('./routes/about');var _about2 = _interopRequireDefault(_about);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var app = new _koa2.default();
var router = new _koaRouter2.default();

//middlewares
app.use((0, _koaBodyparser2.default)());
app.use((0, _koaJson2.default)());
app.use((0, _koaLogger2.default)());

// static
app.use((0, _koaStatic2.default)(_path2.default.join(__dirname, '../client')));

// views
app.use((0, _koaViews2.default)(_path2.default.join(__dirname, '../views'), {
  extension: 'jade' }));


// webpack config
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (app.env === 'development') {
  var webpack = require('webpack');
  var devConfig = require('../webpack.config.dev');
  var compiler = webpack(devConfig);
  var webpackDevMiddleware = require("koa-webpack-dev-middleware");
  var webpackHotMiddleware = require("koa-webpack-hot-middleware");
  app.use((0, _koaConvert2.default)(webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: devConfig.output.publicPath,
    stats: {
      colors: true } })));


  app.use((0, _koaConvert2.default)(webpackHotMiddleware(compiler)));
}

// response
app.use(function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.prev = 0;_context.next = 3;return (

              next());case 3:_context.next = 8;break;case 5:_context.prev = 5;_context.t0 = _context['catch'](0);

            if (_context.t0.status === 401) {
              ctx.body = { message: 'Unauthorized access.' };
              ctx.status = 401;
            } else {
              ctx.body = { message: _context.t0.message };
              ctx.status = _context.t0.status || 500;
            }case 8:case 'end':return _context.stop();}}}, _callee, undefined, [[0, 5]]);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());



//router
router.use('/', _index2.default.routes(), _index2.default.allowedMethods());
router.use('/about', _about2.default.routes(), _about2.default.allowedMethods());

app.use(router.routes());

app.on('error', function (err, ctx) {
  console.log(err);
  _koaLogger2.default.error('server error', err, ctx);
});

app.listen(3000, function () {return console.log('server started 3000');});exports.default =

app;module.exports = exports['default'];
//# sourceMappingURL=app.js.map