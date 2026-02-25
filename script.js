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
