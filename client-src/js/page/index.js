import '../../styles/index.css'

var common = require('../common')
require(['../common/shared'], function(shared) {
  shared('This is page A...')
})

$(document).ready(function () {
  document.body.style.backgroundColor = '#00ffff'
})
var d = document.createElement('p')
var t = document.createTextNode('我是中国人.')
d.appendChild(t)
document.body.appendChild(d)

if(module.hot) {
  module.hot.accept()
}