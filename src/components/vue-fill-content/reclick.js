; (function () {

  // 随机背景色
  function randomHexColor() { //随机生成十六进制颜色
    var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
    while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
      hex = '0' + hex;
    }
    return '#' + hex; //返回‘#'开头16进制颜色
  }

  var vueFill = {};
  var fill = {
    bind: function (el, binding) {
      // 文字填充
      if (binding.expression === 'text') {
        el.innerHTML = '张三'
      }
      // 图片填充
      if (binding.value instanceof Array) {
        el.style.width = binding.value[0] + 'px'
        el.style.height = binding.value[1] + 'px'
        el.style.background = randomHexColor()
      }
    },
  };

  vueFill.install = function (Vue) {
    Vue.directive('fill', fill);
  };

  window.vueFill = vueFill;
  Vue.use(vueFill);
})();