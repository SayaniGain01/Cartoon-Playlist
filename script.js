const songs = [
  {
    title: "Doraemon Title Song",
    file: "songs/doraemon.mp3",
    cover: "images/doraemon.png"
  },
  {
    title: "Oswald Theme Song",
    file: "songs/oswald.mp3",
    cover: "images/oswald.png"
  },
  {
    title: "Oggy Theme Song",
    file: "songs/oggy.mp3",
    cover: "images/oggy.png"
  },
  {
    title: "Shinchan Title Song",
    file: "songs/shinchan.mp3",
    cover: "images/shinchan.png"
  },
  {
    title: "Noddy Title Song",
    file: "songs/noddy.mp3",
    cover: "images/noddy.png"
  }
];

let currentSong = 0;

// DOM Elements
const audio = document.getElementById("audio-player");
const playBtn = document.querySelector(".control-btn.play");
const prevBtn = document.querySelector(".control-btn:first-child");
const nextBtn = document.querySelector(".control-btn:last-child");
const albumArt = document.querySelector(".album-art");
const progressFill = document.querySelector(".progress-fill");
const startTime = document.querySelector(".start-time");
const endTime = document.querySelector(".end-time");
const progressBar = document.querySelector(".progress-bar");
const songName = document.getElementById("song-name");

// Load and play song
function loadSong(index) {
  const song = songs[index];
  audio.src = song.file;
  albumArt.src = song.cover;
  songName.textContent = song.title;
  audio.play();

}

// Format seconds to M:SS
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

// Update progress bar
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = percent + "%";
    startTime.textContent = formatTime(audio.currentTime);
    endTime.textContent = formatTime(audio.duration);
  }
});

// Click-to-seek functionality
progressBar.addEventListener("click", (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  if (duration) {
    audio.currentTime = (clickX / width) * duration;
  }
});

// Play/pause toggle
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.src = "images/pause.png";
    playBtn.alt="pause";
    playBtn.classList.add("play")
  } else {
    audio.pause();
    playBtn.src="images/play.png"
    playBtn.alt="play";
    playBtn.classList.add("play")
    

  }
});

// Previous song
prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
});

// Next song
nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
});

// Auto-play song when current ends
audio.addEventListener("ended", () => {
  loadSong(currentSong);
});

// Load the first song when page loads
loadSong(currentSong);