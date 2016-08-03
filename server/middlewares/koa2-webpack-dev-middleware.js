'use strict';var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var expressMiddleware = require('webpack-dev-middleware');

function middleware(doIt, req, res) {
  var originalEnd = res.end;

  return function (done) {
    res.end = function () {
      originalEnd.apply(this, arguments);
      done(null, 0);
    };
    doIt(req, res, function () {
      done(null, 1);
    });
  };
}

module.exports = function (compiler, option) {
  var doIt = expressMiddleware(compiler, option);
  return function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {var req, runNext;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              ctx = this;
              req = this.req;_context.next = 4;return (
                middleware(doIt, req, {
                  end: function end(content) {
                    ctx.body = content;
                  },
                  setHeader: function setHeader() {
                    ctx.set.apply(ctx, arguments);
                  } }));case 4:runNext = _context.sent;if (!

              runNext) {_context.next = 8;break;}_context.next = 8;return (
                next());case 8:case 'end':return _context.stop();}}}, _callee, this);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}();


};
//# sourceMappingURL=koa2-webpack-dev-middleware.js.map