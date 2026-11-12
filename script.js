document.addEventListener('DOMContentLoaded', function () {

  document.documentElement.classList.add('js');

  // --- H1 word-split animation ---
  document.querySelectorAll('h1').forEach(function (h) {
    var i = 0;
    h.innerHTML = h.textContent.trim().split(/\s+/).map(function (w) {
      return '<span class="w"><span style="--i:' + (i++) + '">' + w + '</span></span>';
    }).join(' ');
  });

  // --- Per-page reveal (pages with .page) ---
  var sel = '.kicker,p,.rule,.stage,.swatch,.misuse,.list li,.caption';
  var pages = [].slice.call(document.querySelectorAll('.page'));

  pages.forEach(function (pg) {
    var n = 0;
    [].slice.call(pg.querySelectorAll(sel))
      .filter(function (e) { return !e.parentElement.closest(sel); })
      .forEach(function (e) {
        e.classList.add('rv');
        e.style.setProperty('--i', n++);
      });
  });

  var pageObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      pageObserver.unobserve(e.target);
      setTimeout(function () { e.target.classList.add('done'); }, 1800);
    });
  }, { threshold: 0.12 });

  pages.forEach(function (p) { pageObserver.observe(p); });

  // --- Scroll progress bar ---
  var bar = document.createElement('div');
  bar.id = 'bar';
  document.body.appendChild(bar);

  var ticking = false;
  function updateBar() {
    var max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, scrollY / max) : 0) + ')';
    ticking = false;
  }
  addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(updateBar); }
  }, { passive: true });
  updateBar();

  // --- Copy-to-clipboard swatches ---
  var toast = document.createElement('div');
  toast.id = 'toast';
  toast.setAttribute('role', 'status');
  document.body.appendChild(toast);

  var toastTimer;
  function copyHex(sw) {
    var m = sw.textContent.match(/#[0-9A-Fa-f]{6}/);
    if (!m) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(m[0]).catch(function () {});
    }
    toast.textContent = m[0] + ' copied';
    toast.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('on'); }, 1600);
  }

  document.querySelectorAll('.swatch').forEach(function (s) {
    s.tabIndex = 0;
    s.setAttribute('role', 'button');
    s.title = 'Click to copy hex';
    s.addEventListener('click', function () { copyHex(s); });
    s.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); copyHex(s); }
    });
  });

  // --- Nav "stuck" class ---
  var nav = document.getElementById('nav');
  addEventListener('scroll', function () {
    nav.classList.toggle('stuck', scrollY > 8);
  }, { passive: true });

  // --- Generic .reveal elements ---
  var els = [].slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    els.forEach(function (el, i) {
      el.style.transitionDelay = ((i % 3) * 90) + 'ms';
      revealObserver.observe(el);
    });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

});   
