import '../../styles/about.css'

var common = require('../common')
require.ensure(['../common/shared'], function(require) {
  var shared = require('../common/shared')
  shared('This is page B')
})


if(module.hot) {
  module.hot.accept()
}