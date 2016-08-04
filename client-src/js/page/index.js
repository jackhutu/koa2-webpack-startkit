import '../../styles/index.css'
import '../../images/sun.jpg'

var common = require('../common')
require(['../common/shared'], function(shared) {
  shared('This is page A')
})

$(document).ready(function () {
  document.body.style.borderStyle = 'solid'
  document.body.style.borderWidth = '2px'
  document.body.style.borderColor = '#F40002'
})

if(module.hot) {
  module.hot.accept()
}