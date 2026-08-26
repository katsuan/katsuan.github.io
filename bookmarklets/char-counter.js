(function () {
  const sel = window.getSelection().toString();
  const text = sel.length > 0 ? sel : document.body.innerText;
  const label = sel.length > 0 ? '選択範囲' : 'ページ全体';
  const noSpace = text.replace(/\s/g, '').length;
  alert(label + 'の文字数\n\n全体: ' + text.length + '文字\n空白抜き: ' + noSpace + '文字');
})();
