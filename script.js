let currentIndex = 0;

/* =========================
   RENDER
   ========================= */
function render() {
  const leftIndex = (currentIndex - 1 + albums.length) % albums.length;
  const rightIndex = (currentIndex + 1) % albums.length;

  cases[0].querySelector(".album-cover").src = albums[leftIndex].image;
  cases[1].querySelector(".album-cover").src = albums[currentIndex].image;
  cases[2].querySelector(".album-cover").src = albums[rightIndex].image;

  albumName.textContent = albums[currentIndex].album;
  artistName.textContent = albums[currentIndex].artist;

  resetTilt();
}

/* =========================
   BOTÕES
   ========================= */
next.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % albums.length;
  render();
});

prev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + albums.length) % albums.length;
  render();
});

/* =========================
   SWIPE MOBILE
   ========================= */
let touchStartX = 0;

carousel.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", (e) => {
  const delta = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) < 50) return;
  delta < 0 ? next.click() : prev.click();
});

/* =========================
   GIROSCÓPIO REAL (iOS OK)
   ========================= */

let smoothX = 0;
let smoothY = 0;

function resetTilt() {
  const visual = document.querySelector(".cd-case.active .cd-visual");
  if (visual) {
    visual.style.transform = "rotateX(0deg) rotateY(0deg)";
  }
}

function handleOrientation(event) {
  const visual = document.querySelector(".cd-case.active .cd-visual");
  if (!visual) return;

  let beta = event.beta;
  let gamma = event.gamma;

  if (beta === null || gamma === null) return;

  // Limite seguro
  beta = Math.max(-35, Math.min(35, beta));
  gamma = Math.max(-35, Math.min(35, gamma));

  const sensitivity = 0.6;
  const smoothFactor = 0.15;

  const targetX = beta * -sensitivity;
  const targetY = gamma * sensitivity;

  smoothX += (targetX - smoothX) * smoothFactor;
  smoothY += (targetY - smoothY) * smoothFactor;

  visual.style.transform =
    `rotateX(${smoothX}deg) rotateY(${smoothY}deg)`;
}

function enableGyroscope() {

  if (!window.DeviceOrientationEvent) return;

  if (typeof DeviceOrientationEvent.requestPermission === "function") {

    document.body.addEventListener("click", async () => {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === "granted") {
          window.addEventListener("deviceorientation", handleOrientation);
        }
      } catch (error) {
        console.log("Permissão negada");
      }
    }, { once: true });

  } else {
    window.addEventListener("deviceorientation", handleOrientation);
  }
}

/* =========================
   INIT
   ========================= */
render();
enableGyroscope();
