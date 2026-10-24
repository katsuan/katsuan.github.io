(function () {
  var markClass = '__kw_highlight_mark__';
  var existing = document.querySelectorAll('mark.' + markClass);
  if (existing.length > 0) {
    existing.forEach(function (m) {
      var parent = m.parentNode;
      parent.replaceChild(document.createTextNode(m.textContent), m);
      parent.normalize();
    });
    return;
  }

  var input = prompt('ハイライトしたいキーワードをカンマ区切りで入力してください:', '');
  if (!input) return;

  var keywords = input.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  if (keywords.length === 0) return;

  var palette = ['#ffe066', '#ff8787', '#63e6be', '#74c0fc', '#d0bfff', '#ffc9c9'];
  var colorMap = {};
  keywords.forEach(function (kw, i) {
    colorMap[kw] = palette[i % palette.length];
  });

  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  var pattern = new RegExp('(' + keywords.map(escapeRegExp).join('|') + ')', 'gi');
  var skipTags = { SCRIPT: 1, STYLE: 1, MARK: 1, TEXTAREA: 1, INPUT: 1 };

  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: function (node) {
      if (!node.nodeValue || !pattern.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
      pattern.lastIndex = 0;
      if (node.parentNode && skipTags[node.parentNode.tagName]) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  var targets = [];
  var n;
  while ((n = walker.nextNode())) targets.push(n);

  targets.forEach(function (node) {
    var frag = document.createDocumentFragment();
    var text = node.nodeValue;
    var lastIndex = 0;
    pattern.lastIndex = 0;
    var m;
    while ((m = pattern.exec(text))) {
      if (m.index > lastIndex) {
        frag.appendChild(document.createTextNode(text.slice(lastIndex, m.index)));
      }
      var mark = document.createElement('mark');
      mark.className = markClass;
      mark.style.background = colorMap[Object.keys(colorMap).find(function (k) {
        return k.toLowerCase() === m[0].toLowerCase();
      })] || palette[0];
      mark.style.color = '#1f2328';
      mark.textContent = m[0];
      frag.appendChild(mark);
      lastIndex = m.index + m[0].length;
    }
    if (lastIndex < text.length) {
      frag.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
    node.parentNode.replaceChild(frag, node);
  });
})();
