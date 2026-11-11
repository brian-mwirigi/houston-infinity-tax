const btn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

if (btn && nav) {
  const set = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('open', open);
  };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => set(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') set(false);
  });
}

const cd = document.querySelector('.cd');
if (cd) {
  const end = Number(cd.dataset.end);
  const storeKey = 'hits_cd_closed_' + cd.dataset.key;
  let dismissed = false;
  try { dismissed = localStorage.getItem(storeKey) === '1'; } catch (e) {}
  if (!dismissed && end > Date.now()) {
    const units = {};
    ['d', 'h', 'm', 's'].forEach((u) => { units[u] = cd.querySelector(`[data-u="${u}"]`); });
    const pad = (n) => String(n).padStart(2, '0');
    let timer;
    const tick = () => {
      const left = Math.floor((end - Date.now()) / 1000);
      if (left <= 0) {
        clearInterval(timer);
        cd.hidden = true;
        return;
      }
      units.d.textContent = pad(Math.floor(left / 86400));
      units.h.textContent = pad(Math.floor((left % 86400) / 3600));
      units.m.textContent = pad(Math.floor((left % 3600) / 60));
      units.s.textContent = pad(left % 60);
    };
    cd.hidden = false;
    tick();
    timer = setInterval(tick, 1000);
    cd.querySelector('.cd-close').addEventListener('click', () => {
      cd.hidden = true;
      clearInterval(timer);
      try { localStorage.setItem(storeKey, '1'); } catch (e) {}
    });
  }
}

const note = document.querySelector('[data-form-note]');
if (note) {
  const sent = new URLSearchParams(window.location.search).get('sent');
  if (sent === '1') note.textContent = note.dataset.sent || 'Your note was sent to our office.';
  if (sent === '0') note.textContent = 'Our office could not receive that note. Call (832) 478-5561.';
}
