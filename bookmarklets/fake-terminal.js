(function () {
  const old = document.getElementById('__fake_terminal__');
  if (old) old.remove();
  const d = document.createElement('div');
  d.id = '__fake_terminal__';
  Object.assign(d.style, {
    position: 'fixed',
    inset: '0',
    background: '#050b12',
    color: '#c9d1d9',
    fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
    fontSize: '13px',
    lineHeight: '1.55',
    zIndex: '2147483647',
    overflow: 'hidden'
  });
  d.innerHTML = `
    <style>
      #__fake_terminal__ * {
        box-sizing: border-box;
      }
      #__fake_terminal__ .header {
        height: 42px;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 0 14px;
        background: #0d1117;
        border-bottom: 1px solid #30363d;
      }
      #__fake_terminal__ .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
      #__fake_terminal__ .red { background:#ff5f56; }
      #__fake_terminal__ .yellow { background:#ffbd2e; }
      #__fake_terminal__ .green { background:#27c93f; }
      #__fake_terminal__ .title {
        margin-left: 10px;
        color: #8b949e;
        font-size: 12px;
      }
      #__fake_terminal__ .status {
        margin-left: auto;
        color: #3fb950;
      }
      #__fake_terminal__ .main {
        height: calc(100% - 42px);
        padding: 18px 20px;
        display: flex;
        flex-direction: column;
      }
      #__fake_terminal__ .command {
        margin-bottom: 12px;
        color: #f0f6fc;
      }
      #__fake_terminal__ .prompt {
        color: #58a6ff;
      }
      #__fake_terminal__ .path {
        color: #d2a8ff;
      }
      #__fake_terminal__ .logs {
        flex: 1;
        overflow: hidden;
      }
      #__fake_terminal__ .line {
        white-space: pre-wrap;
      }
      #__fake_terminal__ .time {
        color: #6e7681;
      }
      #__fake_terminal__ .info {
        color: #58a6ff;
      }
      #__fake_terminal__ .success {
        color: #3fb950;
      }
      #__fake_terminal__ .warn {
        color: #d29922;
      }
      #__fake_terminal__ .dim {
        color: #8b949e;
      }
      #__fake_terminal__ .footer {
        border-top: 1px solid #21262d;
        padding-top: 10px;
        margin-top: 8px;
      }
      #__fake_terminal__ .metrics {
        display: flex;
        gap: 24px;
        margin-bottom: 8px;
        color: #8b949e;
      }
      #__fake_terminal__ .bar {
        width: 100%;
        height: 5px;
        background: #21262d;
        overflow: hidden;
      }
      #__fake_terminal__ .bar-inner {
        height: 100%;
        width: 0%;
        background: #238636;
        transition: width .2s linear;
      }
      #__fake_terminal__ .cursor {
        display: inline-block;
        width: 7px;
        height: 15px;
        vertical-align: -2px;
        background: #c9d1d9;
        animation: blink 1s steps(1) infinite;
      }
      @keyframes blink {
        50% { opacity: 0; }
      }
    </style>
    <div class="header">
      <div class="dot red"></div>
      <div class="dot yellow"></div>
      <div class="dot green"></div>
      <div class="title">build-server — zsh — 132×42</div>
      <div class="status">● RUNNING</div>
    </div>
    <div class="main">
      <div class="command">
        <span class="prompt">dev@workstation</span>:
        <span class="path">~/workspace/app</span>$ npm run build -- --production
      </div>
      <div class="logs" id="__fake_logs__"></div>
      <div class="footer">
        <div class="metrics">
          <span>CPU <strong id="__fake_cpu__">24%</strong></span>
          <span>MEM <strong id="__fake_mem__">1.8 GB</strong></span>
          <span>THREADS <strong id="__fake_threads__">12</strong></span>
          <span>ELAPSED <strong id="__fake_elapsed__">00:00</strong></span>
        </div>
        <div class="bar">
          <div class="bar-inner" id="__fake_bar__"></div>
        </div>
        <div style="margin-top:10px;">
          <span class="prompt">›</span>
          processing background tasks
          <span class="cursor"></span>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(d);
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') {
      d.remove();
      document.removeEventListener('keydown', esc);
    }
  });
  const logs = d.querySelector('#__fake_logs__');
  const cpuEl = d.querySelector('#__fake_cpu__');
  const memEl = d.querySelector('#__fake_mem__');
  const threadsEl = d.querySelector('#__fake_threads__');
  const elapsedEl = d.querySelector('#__fake_elapsed__');
  const bar = d.querySelector('#__fake_bar__');
  const tasks = [
    'Resolving dependency graph',
    'Loading application modules',
    'Compiling runtime bundle',
    'Optimizing static assets',
    'Analyzing module dependencies',
    'Generating source maps',
    'Validating build artifacts',
    'Synchronizing worker state',
    'Processing async job queue',
    'Updating local cache',
    'Checking runtime integrity',
    'Transpiling JavaScript modules',
    'Bundling vendor dependencies',
    'Running incremental compilation',
    'Writing optimized chunks',
    'Indexing application resources',
    'Refreshing dependency cache',
    'Verifying output manifest'
  ];
  const files = [
    'src/core/runtime.js',
    'src/services/api.js',
    'src/components/App.js',
    'src/utils/cache.js',
    'src/workers/sync.js',
    'src/modules/router.js',
    'src/config/environment.js',
    'node_modules/runtime/index.js'
  ];
  const start = Date.now();
  let progress = 4;
  let lines = 0;
  function time() {
    return new Date().toLocaleTimeString('en-GB', {
      hour12: false
    });
  }
  function randomHex(length = 7) {
    return Math.random()
      .toString(16)
      .substring(2, 2 + length);
  }
  function addLine(type, text) {
    const line = document.createElement('div');
    line.className = 'line';
    const labels = {
      info: '<span class="info">INFO </span>',
      success: '<span class="success">DONE </span>',
      warn: '<span class="warn">WARN </span>',
      dim: '<span class="dim">TRACE</span>'
    };
    line.innerHTML =
      '<span class="time">[' + time() + ']</span> ' +
      (labels[type] || labels.info) +
      ' ' +
      text;
    logs.appendChild(line);
    lines++;
    while (logs.children.length > 26) {
      logs.removeChild(logs.firstChild);
    }
  }
  function tick() {
    const task = tasks[Math.floor(Math.random() * tasks.length)];
    const file = files[Math.floor(Math.random() * files.length)];
    const r = Math.random();
    if (r < 0.12) {
      addLine(
        'warn',
        task + ' · cache miss, rebuilding ' + file
      );
    } else if (r < 0.42) {
      addLine(
        'success',
        task + ' · ' +
        (Math.floor(Math.random() * 180) + 20) +
        'ms'
      );
    } else if (r < 0.75) {
      addLine(
        'info',
        task + ' · ' + file
      );
    } else {
      addLine(
        'dim',
        'worker:' +
        (Math.floor(Math.random() * 8) + 1) +
        ' job=' +
        randomHex() +
        ' status=active'
      );
    }
    const cpu = 18 + Math.floor(Math.random() * 47);
    const mem = (1.4 + Math.random() * 1.7).toFixed(1);
    const threads = 8 + Math.floor(Math.random() * 10);
    cpuEl.textContent = cpu + '%';
    memEl.textContent = mem + ' GB';
    threadsEl.textContent = threads;
    const elapsed = Math.floor((Date.now() - start) / 1000);
    const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const ss = String(elapsed % 60).padStart(2, '0');
    elapsedEl.textContent = mm + ':' + ss;
    progress += Math.random() * 0.7;
    if (progress >= 96) {
      progress = 72 + Math.random() * 8;
      addLine(
        'info',
        'Incremental build detected · continuing watch cycle'
      );
    }
    bar.style.width = progress + '%';
    setTimeout(tick, 180 + Math.random() * 700);
  }
  [
    ['info', 'Initializing production build environment'],
    ['info', 'Loading configuration from .env.production'],
    ['success', 'Configuration loaded'],
    ['info', 'Starting compiler workers (8)'],
    ['success', 'Dependency graph generated · 1,284 modules'],
    ['info', 'Watching workspace for incremental changes']
  ].forEach(function (x, i) {
    setTimeout(function () {
      addLine(x[0], x[1]);
    }, i * 180);
  });
  setTimeout(tick, 1300);
})();
