const carousel = document.getElementById("carousel");
const albumName = document.getElementById("albumName");
const artistName = document.getElementById("artistName");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const cases = carousel.querySelectorAll(".cd-case");
// LISTA DE ÁLBUNS
const albums = [
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/Please%20Please%20Me.jpg?itok=tzOPWi8O", album: "Please Please Me", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/With%20the%20Beatles.jpg?itok=3cGBeX7f", album: "With The Beatles", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/A%20Hard%20Days%20Night.jpg?itok=gDdWFeas", album: "A Hard Day’s Night", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/The%20Beatles%20for%20Sale.jpg?itok=wCTmlGz3", album: "Beatles for Sale", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/Help.jpg?itok=Jz2wnyjj", album: "Help!", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/Rubber%20Soul.jpg?itok=TsRSHu1Q", album: "Rubber Soul", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/Revolver.jpg?itok=J0Q8YaGs", album: "Revolver", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/Sgt%20Pepper.jpg?itok=0CcJLuzl", album: "Sgt. Pepper’s Lonely Hearts Club Band", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/Magical-Mystery-Tour.jpg?itok=8midCi2f", album: "Magical Mystery Tour", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/Yellow%20Sub.jpg?itok=aj5oY5EQ", album: "Yellow Submarine", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/Abbey%20Road.jpg?itok=OWcQY3Ee", album: "Abbey Road", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/CoverLetItBe.jpg?itok=giGHBt2f", album: "Let It Be", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/62-A.jpg?itok=SZojd6uj", album: "Please Please Me (Mono)", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/67-A.jpg?itok=TyaxJpOI", album: "With The Beatles (Mono)", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/PastMasters.jpg?itok=EaLCnkb_", album: "Past Masters", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/BBC-A.jpg?itok=i8nzI-pJ", album: "Live At The BBC", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/Anthology1-A.jpg?itok=vzuEcAOE", album: "Anthology 1", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/Anthology2-A.jpg?itok=IG5F6h2n", album: "Anthology 2", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/Anthology3-A.jpg?itok=MyRwj0dY", album: "Anthology 3", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/YS-A.jpg?itok=VxNXlio6", album: "Yellow Submarine (Alt)", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/1-A.jpg?itok=CSVUFyfy", album: "1", artist: "The Beatles" },
  { image: "https://www.thebeatles.com/sites/default/files/styles/responsive_thumbnail_mobile/public/2021-06/Love-Album%201024.png?itok=jv1ZNE2o", album: "Love", artist: "The Beatles" }
];


let currentIndex = 0;

/* =========================
   RENDER
   ========================= */
function render() {
  const leftIndex =
    (currentIndex - 1 + albums.length) % albums.length;
  const rightIndex =
    (currentIndex + 1) % albums.length;

  // LEFT
  cases[0].querySelector(".album-cover").src =
    albums[leftIndex].image;

  // ACTIVE
  cases[1].querySelector(".album-cover").src =
    albums[currentIndex].image;

  // RIGHT
  cases[2].querySelector(".album-cover").src =
    albums[rightIndex].image;

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
  currentIndex =
    (currentIndex - 1 + albums.length) % albums.length;
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
  const delta =
    e.changedTouches[0].clientX - touchStartX;

  if (Math.abs(delta) < 50) return;
  delta < 0 ? next.click() : prev.click();
});

/* =========================
   EFEITO 3D MOBILE (GYRO)
   ========================= */

const activeVisual = () =>
  document.querySelector(".cd-case.active .cd-visual");

function resetTilt() {
  const visual = activeVisual();
  if (visual) {
    visual.style.transform =
      "rotateX(0deg) rotateY(0deg)";
  }
}

function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function enableGyroTilt() {
  if (!isMobile()) return;

  const startGyro = () => {
    window.addEventListener("deviceorientation", (event) => {
      const visual = activeVisual();
      if (!visual) return;

      let beta = event.beta;
      let gamma = event.gamma;

      if (beta === null || gamma === null) return;

      // Limita inclinação
      beta = Math.max(-30, Math.min(30, beta));
      gamma = Math.max(-30, Math.min(30, gamma));

      const rotateX = beta * -0.4;
      const rotateY = gamma * 0.6;

      visual.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  };

  // iOS precisa permissão
  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    document.body.addEventListener(
      "click",
      async () => {
        const permission =
          await DeviceOrientationEvent.requestPermission();
        if (permission === "granted") {
          startGyro();
        }
      },
      { once: true }
    );
  } else {
    startGyro();
  }
}

/* =========================
   INIT
   ========================= */
render();
enableGyroTilt();
