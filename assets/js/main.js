/* denvorko — минимум JS: тема, меню, строки кода в hero, форма, год в подвале */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Тема */
  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', next === 'light' ? '#f3f6f7' : '#0e1620');
    });
  }

  /* Мобильное меню */
  var navBtn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (navBtn && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      navBtn.setAttribute('aria-expanded', String(open));
      navBtn.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    };
    navBtn.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); navBtn.focus(); }
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    window.matchMedia('(min-width: 880px)').addEventListener('change', function () { setOpen(false); });
  }

  /* Hero: строки кода появляются по очереди (один раз при загрузке) */
  var lines = document.querySelectorAll('.code .ln');
  if (lines.length) {
    if (reduce) {
      lines.forEach(function (l) { l.classList.add('on'); });
    } else {
      var i = 0;
      var timer = setInterval(function () {
        if (i >= lines.length) { clearInterval(timer); return; }
        lines[i++].classList.add('on');
      }, 130);
    }
  }

  /* Печать резюме */
  var printBtn = document.querySelector('[data-print]');
  if (printBtn) printBtn.addEventListener('click', function () { window.print(); });

  /* Форма: собираем письмо и открываем почтовый клиент */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form);
      var body = [
        'Имя: ' + d.get('name'),
        'Как связаться: ' + d.get('contact'),
        'Тип проекта: ' + d.get('type'),
        'Сроки: ' + d.get('deadline'),
        '',
        d.get('message')
      ].join('\n');
      var to = form.getAttribute('data-to');
      var url = 'mailto:' + to + '?subject=' + encodeURIComponent('Заявка с сайта denvorko: ' + d.get('type')) +
        '&body=' + encodeURIComponent(body);
      status.textContent = 'Открываю почтовую программу с готовым письмом. Если ничего не произошло, напишите на ' + to + ' или в Telegram.';
      window.location.href = url;
    });
  }

  /* Год в подвале */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
