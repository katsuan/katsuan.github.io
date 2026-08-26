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
