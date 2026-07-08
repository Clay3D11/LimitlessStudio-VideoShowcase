const revealItems = document.querySelectorAll(".reveal");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");

menuToggle?.addEventListener("click", () => {
  const isOpen = siteHeader.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

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

revealItems.forEach(item => revealObserver.observe(item));

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    siteHeader?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const lazyVideos = document.querySelectorAll("video[data-src]");

if (motionQuery.matches) {
  document.querySelectorAll("video[autoplay]").forEach(video => {
    video.removeAttribute("autoplay");
    video.pause();
  });
}

const videoObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const video = entry.target;

      if (entry.isIntersecting) {
        if (!video.src) {
          video.src = video.dataset.src;
          video.load();
        }

        if (!motionQuery.matches) {
          video.play().catch(() => {});
        }
      } else {
        video.pause();
      }
    });
  },
  { rootMargin: "220px 0px", threshold: 0.12 }
);

lazyVideos.forEach(video => videoObserver.observe(video));
