// Quick dock + Store / Tickets / Music popups.

/* ---------- Quick dock (floating launcher) ---------- */
const dock = document.querySelector('.quick-dock');
const dockToggle = document.querySelector('.quick-dock-toggle');

function setDockOpen(open) {
  if (!dock) return;
  dock.classList.toggle('is-open', open);
  dockToggle.setAttribute('aria-expanded', String(open));
  dockToggle.setAttribute('aria-label', open ? 'Close quick menu' : 'Open quick menu');
}

if (dock) {
  dockToggle.addEventListener('click', () => setDockOpen(!dock.classList.contains('is-open')));

  // Close the dock when clicking anywhere else on the page
  document.addEventListener('click', event => {
    if (!dock.contains(event.target)) setDockOpen(false);
  });
}

/* ---------- Popups ---------- */
const popups = [
  { button: 'openModalBtn', modal: 'myModal',      close: '.closeBtn' },
  { button: 'tickets',      modal: 'ticketsModal', close: '.ticketsCloseBtn' },
  { button: 'ipodmodal',    modal: 'ipodModal',    close: '.ipodCloseBtn' },
];

popups.forEach(({ button, modal, close }) => {
  const btn = document.getElementById(button);
  const box = document.getElementById(modal);
  if (!btn || !box) return;

  // Open (and tuck the dock away)
  btn.addEventListener('click', () => {
    box.classList.add('show');
    setDockOpen(false);
  });

  // Close with the "x"
  const closeBtn = box.querySelector(close);
  if (closeBtn) closeBtn.addEventListener('click', () => box.classList.remove('show'));

  // Close when clicking the dark background around the content
  box.addEventListener('click', event => {
    if (event.target === box) box.classList.remove('show');
  });
});

// Escape closes any open popup and the dock
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  popups.forEach(({ modal }) => {
    const box = document.getElementById(modal);
    if (box) box.classList.remove('show');
  });
  setDockOpen(false);
});

/* ---------- "Now playing" state on the dock ---------- */
// curr_track is the <audio> created in ipodstyle.js (loaded before this file)
if (dock && typeof curr_track !== 'undefined') {
  curr_track.addEventListener('play', () => dock.classList.add('is-playing'));
  curr_track.addEventListener('pause', () => dock.classList.remove('is-playing'));
}
