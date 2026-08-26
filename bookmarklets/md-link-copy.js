(function () {
  var t = document.title;
  var u = location.href;
  var s = '[' + t + '](' + u + ')';
  navigator.clipboard.writeText(s).then(function () {
    alert('コピーしました:\n' + s);
  }, function () {
    prompt('コピーしてください:', s);
  });
})();
