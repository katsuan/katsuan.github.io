(function () {
  var parts = location.pathname.split('/').filter(Boolean);
  var id = parts[parts.length - 1] || '';
  navigator.clipboard.writeText(id).then(function () {
    alert('コピーしました: ' + id);
  }, function () {
    prompt('コピーしてください:', id);
  });
})();
