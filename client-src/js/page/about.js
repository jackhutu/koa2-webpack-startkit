import '../../styles/about.css'

var common = require('../common')
require.ensure(['../common/shared'], function(require) {
  var shared = require('../common/shared')
  shared('This is page B')
})

$(document).ready(function () {
  document.body.style.borderStyle = 'solid'
  document.body.style.borderWidth = '2px'
  document.body.style.borderColor = 'blue'
})

if(module.hot) {
  module.hot.accept()
}