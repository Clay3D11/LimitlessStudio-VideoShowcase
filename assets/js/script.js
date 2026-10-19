const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ---------- Navigation ---------- */
menuToggle.addEventListener("click", () => {
  menuToggle.setAttribute("aria-expanded", siteHeader.classList.toggle("is-open"));
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    siteHeader.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ---------- Gallery data ----------
   [file in assets/videos, title, category, description, shape, duration]
   shape: "w" = wide feature, "v" = vertical, "t" = tall, "" = standard */
const categories = { music: "Music Videos", ads: "Ads", art: "Visual Art", motion: "Motion FX" };

const works = [
  ["Alofoke1.mp4", "Alofoke", "music", "Atmospheric music visual with warm glow and texture.", "w", "1:16"],
  // ["KulosoEdit.mp4", "Kuloso", "music", "Full-length music video with moody color and cinematic framing.", "", "1:45"],
  
  ["Famelz2026.mp4", "Famelz", "music", "Luxury performance visual with bold lighting and smooth camera moves.", "", "0:25"],
  ["FatmelzToLoDia.mp4", "Fatmelz · To Lo Dia", "music", "Up-close performance edit cut tight to the beat.", "", "1:00"],
  ["mickey.mp4", "Mickey Then", "music", "Music visual cut with clean pacing and stylized motion.", "w", "0:24"],
  ["UnFlowZaza.mp4", "Un Flow Zaza", "music", "Street-styled music video with graffiti backdrops and punchy cuts.", "", "0:25"],


  ["Clinvidremix1min.mp4", "Clin Remix", "music", "One-minute remix cut built around motion and attitude.", "", "1:00"],
  // ["wow-videogif.mp4", "WOW", "music", "Vibrant performance edit with saturated, high-energy color.", "", "0:27"],


  ["BookerTcom.mp4", "Bad B & BookerT", "music", "Cinematic visual with dramatic contrast and light play.", "", "0:33"],
  ["Dariel30secsVideoCompress.mp4", "Dariel", "music", "Short-form promo edit built for quick social impact.", "", "0:30"],
  ["Superjoell(Preview-7secs).mp4", "Superjoell Preview", "music", "Seven-second teaser with fast visual energy.", "w", "0:07"],
  ["Superjoell(1st).mp4", "Superjoell 1", "music", "Performance-driven sequence with cinematic rhythm.", "", "0:15"],
  ["Superjoell(2nd).mp4", "Superjoell 2", "music", "Alternate music edit with punchy timing.", "", "0:15"],
  ["Superjoell(3rd).mp4", "Superjoell 3", "music", "Stylized cut variation for a stronger visual flow.", "", "0:15"],
  ["Superjoell(4rd).mp4", "Superjoell 4", "music", "High-energy scene work with layered motion.", "", "0:13"],
  ["Superjoell(5th).mp4", "Superjoell 5", "music", "Polished sequence with cinematic color and pacing.", "", "0:09"],
  ["ad 1.mp4", "Promo Cut 01", "ads", "Short-form ad energy with clean pacing.", "t", "0:47"],
  ["ad 2.mp4", "Promo Cut 02", "ads", "Fast product rhythm for social feeds.", "t", "0:17"],
  ["ad 3.mp4", "Promo Cut 03", "ads", "Bold contrast, movement, and impact.", "t", "0:11"],
  // ["bothworlds.mp4", "Both Worlds", "art", "Surreal 3D loop where two universes collide.", "v", "0:18"],
  // ["finishline.mp4", "Finish Line", "art", "Psychedelic tunnel loop in full color.", "v", "0:30"],
  // ["lastlap.mp4", "Last Lap", "art", "Hypnotic 3D ride through a checkered dreamscape.", "v", "0:35"],
  // ["nucleo.mp4", "Nucleo", "art", "Organic neon fractal growing in motion.", "v", "0:15"],
  // ["scify.mp4", "Sci-Fi", "art", "Kaleidoscopic sci-fi patterns built for vertical screens.", "v", "0:30"],
  ["fire.mp4", "Fire FX", "motion", "Ember and spark overlay for cinematic heat.", "", "0:30"],
  ["transitions.webm", "Transitions Pack", "motion", "Smooth scene changes ready to drop into any edit.", "", "0:11"],
  ["GlithPack.webm", "Glitch Pack", "motion", "Distortion, energy, and punchy style.", "", "0:09"],
  ["SaberTransitions.webm", "Saber Transitions", "motion", "Sharp motion accents and light movement.", "", "0:16"],
  ["TextOverlaid.webm", "Text Overlay", "motion", "Readable titles with motion-first timing.", "", "0:16"],
  ["cinematictiles.webm", "Cinematic Tiles", "motion", "Modular cuts for dramatic transitions.", "", "0:04"],
  ["lightleak.webm", "Light Leak", "motion", "Soft atmosphere for cinematic moments.", "", "0:06"],
  ["animationstation.webm", "Animation Station", "motion", "Motion texture and visual experiments.", "", "0:02"]
];

const videoSrc = file => `assets/videos/${encodeURI(file)}`;
const posterSrc = file => `assets/img/posters/${file.replace(/\.\w+$/, "").replace(/[()]/g, "").replace(/ /g, "-").toLowerCase()}.webp`;

/* ---------- Gallery tiles & filters ---------- */
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

gallery.innerHTML = works.map(([file, title, cat, , shape, time], i) => `
  <button class="tile${shape ? ` tile--${shape}` : ""}" type="button" data-i="${i}" data-cat="${cat}" aria-label="Play ${title}">
    ${cat === "music"
      ? `<video src="${videoSrc(file)}" poster="${posterSrc(file)}" autoplay muted loop playsinline preload="none"></video>`
      : `<img src="${posterSrc(file)}" alt="" loading="lazy" decoding="async">`}
    <span class="tile-time">${time}</span>
    <span class="tile-info"><small>${categories[cat]}</small><strong>${title}</strong></span>
  </button>`).join("");

const tiles = [...gallery.children];

filters.innerHTML = [["all", "All"], ...Object.entries(categories)].map(([key, label]) => {
  const count = key === "all" ? works.length : works.filter(work => work[2] === key).length;
  return `<button type="button" data-filter="${key}" aria-pressed="${key === "all"}">${label}<sup>${count}</sup></button>`;
}).join("");

filters.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;

  filters.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b === button));
  tiles.forEach(tile => {
    tile.hidden = button.dataset.filter !== "all" && tile.dataset.cat !== button.dataset.filter;
  });
});

filters.querySelector('[data-filter="music"]').click(); // Music Videos selected by default

/* One shared muted preview plays on hover, so only one video ever loads at a time */
if (matchMedia("(hover: hover)").matches) {
  const preview = Object.assign(document.createElement("video"), { muted: true, loop: true, playsInline: true, className: "tile-preview" });
  preview.addEventListener("playing", () => preview.classList.add("is-playing"));

  gallery.addEventListener("pointerover", event => {
    const tile = event.target.closest(".tile");
    if (!tile || tile.contains(preview) || tile.dataset.cat === "music") return;

    preview.classList.remove("is-playing");
    preview.src = videoSrc(works[tile.dataset.i][0]);
    tile.append(preview);
    preview.play().catch(() => {});
  });

  gallery.addEventListener("pointerout", event => {
    const tile = event.target.closest(".tile");
    if (!tile || tile.contains(event.relatedTarget)) return;

    preview.pause();
    preview.remove();
  });
}

/* ---------- Lightbox ---------- */
const lightbox = document.querySelector(".lightbox");
const lbVideo = lightbox.querySelector("video");
const [lbCat, lbTitle, lbText] = lightbox.querySelectorAll("figcaption > *");
let playlist = [];
let position = 0;

function showWork() {
  const [file, title, cat, text] = works[playlist[position]];
  lbVideo.poster = posterSrc(file);
  lbVideo.src = videoSrc(file);
  lbCat.textContent = categories[cat];
  lbTitle.textContent = title;
  lbText.textContent = text;
  lbVideo.play().catch(() => {});
}

function step(direction) {
  position = (position + direction + playlist.length) % playlist.length;
  showWork();
}

gallery.addEventListener("click", event => {
  const tile = event.target.closest(".tile");
  if (!tile) return;

  playlist = tiles.filter(t => !t.hidden).map(t => +t.dataset.i);
  position = playlist.indexOf(+tile.dataset.i);
  showWork();
  lightbox.showModal();
});

lightbox.addEventListener("click", event => {
  if (event.target === lightbox || event.target.closest(".lb-close")) lightbox.close();
  const nav = event.target.closest(".lb-nav");
  if (nav) step(+nav.dataset.step);
});

lightbox.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") step(1);
  if (event.key === "ArrowLeft") step(-1);
});

lightbox.addEventListener("close", () => {
  lbVideo.pause();
  lbVideo.removeAttribute("src");
  lbVideo.load();
});

/* ---------- Service card spotlight follows the cursor ---------- */
document.querySelectorAll(".service").forEach(card => {
  card.addEventListener("pointermove", event => {
    const box = card.getBoundingClientRect();
    card.style.setProperty("--x", `${event.clientX - box.left}px`);
    card.style.setProperty("--y", `${event.clientY - box.top}px`);
  });
});

/* ---------- Scroll reveal ---------- */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach(item => revealObserver.observe(item));

/* ---------- Background videos only play while on screen ---------- */
const playObserver = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting && !motionQuery.matches) target.play().catch(() => {});
    else target.pause();
  });
});

document.querySelectorAll("video[autoplay]").forEach(video => playObserver.observe(video));
