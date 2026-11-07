/* Haar & Harmonie — Prüfbericht · Tiyan Digital
   Business name is ONE swappable constant: change it here and every
   [data-business-name] element on the page updates. */
(function () {
  'use strict';

  var BUSINESS_NAME = 'Haar & Harmonie';

  document.documentElement.classList.add('js');

  // Apply the single business-name constant everywhere it is marked.
  var named = document.querySelectorAll('[data-business-name]');
  for (var i = 0; i < named.length; i++) {
    named[i].textContent = BUSINESS_NAME;
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Count-up "24 Jahre" in the hero (once, when visible).
  var counter = document.querySelector('[data-countup]');
  if (counter) {
    var target = parseInt(counter.getAttribute('data-countup'), 10) || 24;
    if (reduced) {
      counter.textContent = String(target);
    } else {
      var done = false;
      var run = function () {
        if (done) return;
        done = true;
        var start = null;
        var step = function (ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / 900, 1);
          counter.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      if ('IntersectionObserver' in window) {
        var co = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) { run(); co.disconnect(); }
        }, { threshold: 0.4 });
        co.observe(counter);
      } else {
        run();
      }
    }
  }

  // Scroll reveal for finding / preview cards. Elements stay visible if
  // JS or IntersectionObserver is unavailable (CSS only hides under .js,
  // and .in is added here — no-JS pages never hide content).
  var revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;
  if (reduced || !('IntersectionObserver' in window)) {
    for (var j = 0; j < revealEls.length; j++) revealEls[j].classList.add('in');
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  for (var k = 0; k < revealEls.length; k++) io.observe(revealEls[k]);
})();
