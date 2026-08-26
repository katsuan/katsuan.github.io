(function () {
  try {
    var d = JSON.parse(document.body.innerText);
    var pre = document.createElement('pre');
    pre.style.cssText = 'white-space:pre-wrap;word-break:break-word;font-family:monospace;font-size:13px;padding:1rem;';
    pre.textContent = JSON.stringify(d, null, 2);
    document.body.innerHTML = '';
    document.body.appendChild(pre);
  } catch (e) {
    alert('JSONとして解析できませんでした');
  }
})();
