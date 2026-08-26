(function () {
  const old = document.getElementById('__ogp_checker__');
  if (old) old.remove();
  const props = ['og:title', 'og:description', 'og:image', 'og:url', 'og:type', 'twitter:card', 'twitter:title', 'twitter:image'];
  const rows = props.map(function (p) {
    const el = document.querySelector('meta[property="' + p + '"], meta[name="' + p + '"]');
    const val = el ? el.getAttribute('content') : '(未設定)';
    return { key: p, val: val };
  });
  const box = document.createElement('div');
  box.id = '__ogp_checker__';
  Object.assign(box.style, {
    position: 'fixed',
    top: '16px',
    right: '16px',
    maxWidth: '420px',
    maxHeight: '80vh',
    overflow: 'auto',
    background: '#171a21',
    color: '#e6e6e6',
    border: '1px solid #2a2e37',
    borderRadius: '10px',
    padding: '14px 16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: '13px',
    lineHeight: '1.6',
    zIndex: '2147483647',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
  });
  let html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">'
    + '<strong>OGP / メタ情報</strong>'
    + '<span id="__ogp_close__" style="cursor:pointer;color:#9aa0a6;">✕</span>'
    + '</div>';
  rows.forEach(function (r) {
    const escaped = String(r.val).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    html += '<div style="margin-bottom:8px;">'
      + '<div style="color:#5b8cff;font-weight:600;">' + r.key + '</div>';
    if (r.key.indexOf('image') !== -1 && r.val !== '(未設定)') {
      html += '<img src="' + r.val + '" style="max-width:100%;border-radius:6px;margin-top:4px;border:1px solid #2a2e37;">';
    } else {
      html += '<div style="color:#9aa0a6;word-break:break-all;">' + escaped + '</div>';
    }
    html += '</div>';
  });
  box.innerHTML = html;
  document.body.appendChild(box);
  document.getElementById('__ogp_close__').addEventListener('click', function () {
    box.remove();
  });
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') {
      box.remove();
      document.removeEventListener('keydown', esc);
    }
  });
})();
