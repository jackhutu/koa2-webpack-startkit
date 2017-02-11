import '../../styles/index.css'
import '../../images/sun.jpg'

var common = require('../common')


$(document).ready(function () {
  document.body.style.borderStyle = 'solid'
  document.body.style.borderWidth = '2px'
  document.body.style.borderColor = '#F40012'
	//增加事件
  $('.btn').click(function() {
    require(['../common/shared'], function(shared) {
      $('.btn').append('你就是80后.')
      shared('This is page A 按需加载')
    })
  })
})

if(module.hot) {
  module.hot.accept()
}