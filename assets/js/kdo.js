/* KDO Digital: page helpers (story redesign, October 2026).
   No libraries. The page works and shows everything without this file:
   it only adds the extras (scroll reveals, the step line, the phone bar,
   the notes switch and the form sending). */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {
    setYear();
    setupNotes();
    setupHeader();
    setupReveals();
    setupCheckoutLine();
    setupMobileBar();
    setupForm();
  });

  /* Footer year */
  function setYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = year;
    });
  }

  /* ── Notes for Kyle: on by default, "?notes=off" or the switch hides them ── */
  function setupNotes() {
    var buttons = document.querySelectorAll('[data-notes-toggle]');
    if (!buttons.length) return;
    var root = document.documentElement;
    var off = false;
    try { off = localStorage.getItem('kdo-notes') === 'off'; } catch (e) { /* storage blocked: keep default */ }
    if (/[?&]notes=off\b/.test(window.location.search)) off = true;

    function apply() {
      root.classList.toggle('notes-off', off);
      buttons.forEach(function (btn) {
        btn.textContent = off ? "Show Kyle's notes" : "Hide Kyle's notes";
        btn.setAttribute('aria-pressed', String(off));
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        off = !off;
        try { localStorage.setItem('kdo-notes', off ? 'off' : 'on'); } catch (e) { /* not saved, still works */ }
        apply();
      });
    });
    apply();
  }

  /* Header gets a solid background once the page moves */
  function setupHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    function update() { header.classList.toggle('scrolled', window.scrollY > 10); }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── Scroll reveals ──
     Only things that start below the fold get hidden (.pre), and they come
     back as they scroll into view. Above the fold nothing ever hides. */
  function setupReveals() {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    var items = document.querySelectorAll('.reveal');
    var fold = window.innerHeight;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('pre');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });

    items.forEach(function (el) {
      if (el.getBoundingClientRect().top > fold) {
        el.classList.add('pre');
        observer.observe(el);
      }
    });
  }

  /* ── "How it works" line fills like a checkout progress bar as you scroll ──
     Each step's --f (0 to 1) fills the line to the next step. Without JS
     every line is full and every step is lit. */
  function setupCheckoutLine() {
    var list = document.querySelector('.checkout');
    if (!list || reduceMotion) return;
    var steps = Array.prototype.slice.call(list.querySelectorAll('.step'));
    var segments = steps.length - 1;
    if (segments < 1) return;
    list.classList.add('animating');
    var ticking = false;

    function update() {
      ticking = false;
      var rect = list.getBoundingClientRect();
      var vh = window.innerHeight;
      /* 0 when the list's top reaches 80% down the screen, 1 when its bottom passes 75% */
      var progress = (vh * 0.8 - rect.top) / (rect.height + vh * 0.05);
      progress = Math.max(0, Math.min(1, progress));
      var complete = true;
      steps.forEach(function (step, i) {
        var fill = Math.max(0, Math.min(1, progress * segments - i));
        if (i < segments) step.style.setProperty('--f', fill.toFixed(3));
        /* A step lights up when the line before it is full */
        var reached = i === 0 || progress * segments >= i - 0.001;
        step.classList.toggle('on', reached);
        if (!reached) complete = false;
      });
      list.classList.toggle('complete', complete);
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* ── Phone bar: shows once the hero has gone, hides again at the form ── */
  function setupMobileBar() {
    var bar = document.getElementById('mobileBar');
    var hero = document.querySelector('.hero');
    var form = document.getElementById('check');
    if (!bar || !hero || !form || !('IntersectionObserver' in window)) return;
    var heroVisible = true;
    var formVisible = false;

    function update() {
      var show = !heroVisible && !formVisible;
      bar.classList.toggle('show', show);
      bar.setAttribute('aria-hidden', String(!show));
    }

    new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
      update();
    }).observe(hero);

    new IntersectionObserver(function (entries) {
      formVisible = entries[0].isIntersecting;
      update();
    }, { rootMargin: '0px 0px -20% 0px' }).observe(form);
  }

  /* ── Free website check form: checks answers, then sends through Web3Forms ──
     This is a static site, so enquiries go straight to Web3Forms, which emails
     them to Kyle. The access key is a public form ID by design (it can only
     ever send to that one inbox), so it is safe in page code. Web3Forms also
     rate-limits and spam-filters what comes in. */
  function setupForm() {
    var form = document.getElementById('checkForm');
    if (!form) return;

    var WEB3FORMS_KEY = '479253c2-818c-4a44-ae5b-a3e4a66cbfc9';
    var SEND_TIMEOUT_MS = 15000;
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    /* Loose on purpose: "mybusiness.im", "www.x.co.uk" and full links all pass */
    var SITE_RE = /^(https?:\/\/)?[^\s/$.?#]+\.[^\s]{2,}$/i;

    var card = document.getElementById('formCard');
    var nameEl = document.getElementById('cf-name');
    var emailEl = document.getElementById('cf-email');
    var siteEl = document.getElementById('cf-website');
    var msgEl = document.getElementById('cf-message');
    var trapEl = document.getElementById('cf-botcheck');
    var statusEl = document.getElementById('cf-status');
    var submitBtn = form.querySelector('.form-submit');
    var submitLabel = form.querySelector('.form-submit-label');
    var successTitle = document.getElementById('form-success-title');
    var sending = false;

    function setInvalid(el, invalid) {
      var field = el.closest('.field');
      if (field) field.classList.toggle('invalid', invalid);
      el.setAttribute('aria-invalid', String(invalid));
    }

    [nameEl, emailEl, siteEl].forEach(function (el) {
      el.addEventListener('input', function () { setInvalid(el, false); });
    });

    /* Lock the button while sending so a double click can't send twice */
    function setSending(on) {
      sending = on;
      submitBtn.disabled = on;
      submitLabel.textContent = on ? 'Sending…' : 'Get my free website check';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (sending) return;
      statusEl.hidden = true;

      var name = nameEl.value.trim();
      var email = emailEl.value.trim();
      var site = siteEl.value.trim();
      var message = msgEl.value.trim();

      var checks = [
        { el: nameEl, ok: name.length > 0 && name.length <= 100 },
        { el: emailEl, ok: email.length <= 254 && EMAIL_RE.test(email) },
        { el: siteEl, ok: site === '' || (site.length <= 200 && SITE_RE.test(site)) }
      ];
      var firstBad = null;
      checks.forEach(function (c) {
        setInvalid(c.el, !c.ok);
        if (!c.ok && !firstBad) firstBad = c.el;
      });
      if (firstBad) { firstBad.focus(); return; }

      /* A bot ticked the hidden box: look successful, send nothing */
      if (trapEl.checked) {
        showSuccess();
        return;
      }

      var payload = {
        access_key: WEB3FORMS_KEY,
        subject: 'Free website check: ' + name,
        from_name: 'KDO Digital website',
        name: name,
        email: email,
        website: site || 'No website yet',
        message: message.slice(0, 5000) || '(no message)'
      };

      /* Give up after a while so a dead connection never leaves the form stuck */
      var controller = window.AbortController ? new AbortController() : null;
      var timer = controller ? setTimeout(function () { controller.abort(); }, SEND_TIMEOUT_MS) : null;

      setSending(true);
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller ? controller.signal : undefined
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (!data || !data.success) throw new Error('Not sent');
          form.reset();
          showSuccess();
        })
        /* Network down, timed out or rejected: keep what they typed, offer email */
        .catch(function () { statusEl.hidden = false; })
        .then(function () {
          clearTimeout(timer);
          setSending(false);
        });
    });

    function showSuccess() {
      card.classList.add('sent');
      if (successTitle) successTitle.focus();
    }
  }
}());
