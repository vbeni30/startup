(() => {
  'use strict';

  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('#mobile-menu');
  const setMenu = (open, restoreFocus = false) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileMenu.hidden = !open;
    if (restoreFocus) menuButton.focus();
  };
  menuButton.addEventListener('click', () => setMenu(mobileMenu.hidden));
  mobileMenu.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileMenu.hidden) setMenu(false, true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header') && !mobileMenu.hidden) setMenu(false);
  });
  window.matchMedia('(min-width: 621px)').addEventListener('change', event => {
    if (event.matches) setMenu(false);
  });

  const comparison = document.querySelector('#comparison');
  const range = document.querySelector('#comparison-range');
  const comparisonButtons = [...document.querySelectorAll('[data-compare]')];
  const updateComparison = rawValue => {
    const value = Math.max(0, Math.min(100, Math.round(Number(rawValue) || 0)));
    range.value = String(value);
    range.setAttribute('aria-valuetext', `${value} percent redesigned website revealed`);
    comparison.style.setProperty('--split', `${value}%`);
    comparison.querySelector('.label-before').hidden = value > 96;
    comparison.querySelector('.label-after').hidden = value < 4;
    comparison.querySelector('.comparison-divider').hidden = value === 0 || value === 100;
    comparisonButtons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.compare) === value)));
  };
  range.addEventListener('input', () => updateComparison(range.value));
  comparisonButtons.forEach(button => button.addEventListener('click', () => updateComparison(button.dataset.compare)));
  let dragging = false;
  const moveComparison = event => {
    const rect = range.getBoundingClientRect();
    if (rect.width) updateComparison((event.clientX - rect.left) / rect.width * 100);
  };
  range.addEventListener('pointerdown', event => {
    // Preserve vertical touch scrolling; horizontal dragging reveals the redesign.
    if (event.button !== 0 && event.pointerType !== 'touch') return;
    event.preventDefault();
    range.focus({ preventScroll: true });
    dragging = true;
    range.setPointerCapture?.(event.pointerId);
    moveComparison(event);
  });
  range.addEventListener('pointermove', event => { if (dragging) moveComparison(event); });
  const stopDragging = () => { dragging = false; };
  range.addEventListener('pointerup', stopDragging);
  range.addEventListener('pointercancel', stopDragging);
  range.addEventListener('lostpointercapture', stopDragging);

  const stage = document.querySelector('.comparison-stage');
  const deviceButtons = [...document.querySelectorAll('[data-device][aria-pressed]')];
  deviceButtons.forEach(button => button.addEventListener('click', () => {
    stage.dataset.device = button.dataset.device;
    deviceButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  }));

  const form = document.querySelector('#enquiry-form');
  const result = document.querySelector('#enquiry-result');
  const websiteInput = document.querySelector('#website');
  const websiteError = document.querySelector('#website-error');
  const status = document.querySelector('#copy-status');
  let brief = '';
  const clearWebsiteError = () => {
    websiteInput.removeAttribute('aria-invalid');
    websiteInput.removeAttribute('aria-describedby');
    websiteInput.setCustomValidity('');
    websiteError.hidden = true;
  };
  websiteInput.addEventListener('input', clearWebsiteError);
  const normalizeWebsite = input => {
    const clean = input.trim();
    if (!clean || /\s/.test(clean)) return null;
    const hasScheme = /^[a-z][a-z\d+.-]*:/i.test(clean);
    try {
      const url = new URL(hasScheme ? clean : `https://${clean}`);
      const validHost = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i.test(url.hostname);
      if (!['https:', 'http:'].includes(url.protocol) || !validHost || url.username || url.password) return null;
      return url.href;
    } catch { return null; }
  };
  form.addEventListener('submit', event => {
    event.preventDefault();
    clearWebsiteError();
    if (!form.reportValidity()) return;
    const url = normalizeWebsite(websiteInput.value);
    if (!url) {
      websiteInput.setAttribute('aria-invalid', 'true');
      websiteInput.setAttribute('aria-describedby', 'website-error');
      websiteInput.setCustomValidity('Enter a website such as yourbusiness.com.');
      websiteError.hidden = false;
      websiteInput.focus();
      return;
    }
    const name = document.querySelector('#name').value.trim();
    if (!name) {
      document.querySelector('#name').setCustomValidity('Enter your name.');
      document.querySelector('#name').reportValidity();
      return;
    }
    brief = `WEBSITE REVIEW ENQUIRY\nSecond Form\n\nName: ${name}\nEmail: ${document.querySelector('#email').value.trim()}\nCurrent website: ${url}\nMain goal: ${document.querySelector('#goal').value}\n\nI’d like a fresh perspective on my website and to explore a redesign.\n\nPrepared locally. This enquiry has not been sent.`;
    document.querySelector('#brief-preview').textContent = brief;
    status.textContent = '';
    form.hidden = true;
    result.hidden = false;
    result.focus({ preventScroll: true });
  });
  document.querySelector('#name').addEventListener('input', event => event.target.setCustomValidity(''));
  document.querySelector('#edit-brief').addEventListener('click', () => {
    result.hidden = true;
    form.hidden = false;
    document.querySelector('#name').focus({ preventScroll: true });
  });
  document.querySelector('#copy-brief').addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(brief);
      status.textContent = 'Brief copied. Nothing has been sent.';
    } catch {
      status.textContent = 'Clipboard access is unavailable. Select the brief text or download the file.';
    }
  });
  document.querySelector('.download-brief').addEventListener('click', () => {
    const objectUrl = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = 'second-form-website-enquiry.txt';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    status.textContent = 'Brief prepared for download. Nothing has been sent.';
  });
  document.querySelector('#year').textContent = String(new Date().getFullYear());
  updateComparison(50);
})();
