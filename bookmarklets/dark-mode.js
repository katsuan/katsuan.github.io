(function () {
  const id = '__simple_dark_mode__';
  const existing = document.getElementById(id);
  if (existing) {
    existing.remove();
    return;
  }
  const style = document.createElement('style');
  style.id = id;
  style.textContent = 'html{filter:invert(1) hue-rotate(180deg);}'
    + 'img,video,picture,canvas,svg,iframe{filter:invert(1) hue-rotate(180deg);}';
  document.head.appendChild(style);
})();
