// Nav mini player: plays "Kulosa" (Oxlade) when the page opens on desktop,
// round GIF button toggles play / pause.
// Copied from famelz.com (js/firstautoplaybtn.js), cleaned up.

const navAudio = document.getElementById('audio');
const navPlayBtn = document.getElementById('playPauseBtn');

if (navAudio && navPlayBtn) {
  navAudio.volume = 0.8;

  // Button icon always follows the real state of the song
  const showState = () => {
    const playing = !navAudio.paused;
    navPlayBtn.textContent = playing ? '❚❚' : '▶';
    navPlayBtn.setAttribute('aria-label', playing ? 'Pause Kulosa' : 'Play Kulosa');
  };

  navAudio.addEventListener('play', showState);
  navAudio.addEventListener('pause', showState);
  navAudio.addEventListener('ended', showState);

  navPlayBtn.addEventListener('click', () => {
    if (navAudio.paused) navAudio.play();
    else navAudio.pause();
  });

  // Autoplay. Browsers often block sound until the visitor interacts
  // with the page; if so, start on their first click / tap / key press.
  // ("click" and "touchend" are the events phones accept for starting sound.)
  const firstInteractionEvents = ['click', 'touchend', 'keydown'];

  const removeFirstInteraction = () => {
    firstInteractionEvents.forEach(type =>
      document.removeEventListener(type, startOnFirstInteraction));
  };

  const startOnFirstInteraction = event => {
    // The button handles itself (and a paused song should stay paused)
    if (navPlayBtn.contains(event.target)) return removeFirstInteraction();
    navAudio.play()
      .then(removeFirstInteraction)
      .catch(() => {}); // still blocked: try again on the next interaction
  };

  // Phones and tablets: no automatic sound, the visitor presses play themselves.
  if (matchMedia('(hover: none)').matches) {
    showState();
  } else {
    navAudio.play()
      .then(showState)
      .catch(() => {
        showState();
        firstInteractionEvents.forEach(type =>
          document.addEventListener(type, startOnFirstInteraction));
      });
  }

  // Only one song at a time: pause this one when the Music popup plays,
  // and pause the Music popup when this one plays.
  if (typeof curr_track !== 'undefined') {
    curr_track.addEventListener('play', () => {
      removeFirstInteraction();
      navAudio.pause();
    });
    navAudio.addEventListener('play', () => {
      if (!curr_track.paused) pauseTrack();
    });
  }
}
