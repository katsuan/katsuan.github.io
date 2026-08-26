  const filters = document.getElementById('filters');
  const cards = document.querySelectorAll('#grid .card');
  const tagLabels = { liff: 'LIFF', gas: 'GAS', game: 'ゲーム', tool: 'ツール' };

  function applyFilter(tag) {
    filters.querySelectorAll('.pill').forEach(p => p.classList.toggle('active', p.dataset.tag === tag));
    cards.forEach(card => {
      const tags = card.dataset.tags.split(' ');
      const show = tag === 'all' || tags.includes(tag);
      card.classList.toggle('hidden', !show);
    });
  }

  cards.forEach(card => {
    const tags = card.dataset.tags.split(' ');
    const tagBox = document.createElement('div');
    tagBox.className = 'card-tags';
    tags.forEach(tag => {
      const badge = document.createElement('button');
      badge.className = 'tag-badge';
      badge.type = 'button';
      badge.dataset.tag = tag;
      badge.textContent = tagLabels[tag] || tag;
      badge.addEventListener('click', () => applyFilter(tag));
      tagBox.appendChild(badge);
    });
    card.insertBefore(tagBox, card.querySelector('p'));

    if (card.dataset.tech) {
      const tech = document.createElement('p');
      tech.className = 'tech';
      tech.textContent = card.dataset.tech;
      card.querySelector('p').insertAdjacentElement('afterend', tech);
    }
  });

  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('.pill');
    if (!btn) return;
    applyFilter(btn.dataset.tag);
  });

  const qiitaList = document.getElementById('qiita-list');
  if (qiitaList) {
    fetch('https://qiita.com/api/v2/users/katsuan/items?page=1&per_page=5')
      .then(res => {
        if (!res.ok) throw new Error('Qiita API error: ' + res.status);
        return res.json();
      })
      .then(items => {
        if (!items.length) {
          qiitaList.innerHTML = '<li class="empty">記事がありません。</li>';
          return;
        }
        qiitaList.innerHTML = items.map(item => {
          const date = new Date(item.created_at).toLocaleDateString('ja-JP');
          return '<li>'
            + '<a href="' + item.url + '" target="_blank" rel="noopener">' + item.title + '</a>'
            + '<div class="meta">' + date + ' ・ ❤ ' + item.likes_count + '</div>'
            + '</li>';
        }).join('');
      })
      .catch(() => {
        qiitaList.innerHTML = '<li class="empty">記事を取得できませんでした。<a href="https://qiita.com/katsuan" target="_blank" rel="noopener">Qiitaで見る →</a></li>';
      });
  }
