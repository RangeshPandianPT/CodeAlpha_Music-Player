const songs = [
  { title: "Theethiriyaai-MassTamilan.dev", artist: "Artist A", src: "songs/song1.mp3" },
  { title: "Nenjukkul Peidhdum-MassTamilan.com", artist: "Artist B", src: "songs/song2.mp3" },
  { title: "Oru Manam-MassTamilan", artist: "Artist C", src: "songs/song3.mp3" },
  { title: "Idhu Dhaan-MassTamilan.org", artist: "Artist D", src: "songs/song4.mp3" },
  { title: "Thillu Mullu-MassTamilan.com", artist: "Artist E", src: "songs/song5.mp3" },
  { title: "Yaaro En Nenjai-MassTamilan.com", artist: "Artist F", src: "songs/song6.mp3" },
  { title: "Oru Naalil-It All Comes Down To This!-MassTamilan.com", artist: "Artist G", src: "songs/song7.mp3" }
];

let songIndex = 0;
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  updatePlaylistUI();
}
function playSong() {
  audio.play();
  playBtn.textContent = '⏸️';
}
function pauseSong() {
  audio.pause();
  playBtn.textContent = '▶️';
}
function updatePlaylistUI() {
  playlistEl.innerHTML = '';
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    if (index === songIndex) li.classList.add('active');
    li.onclick = () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    };
    playlistEl.appendChild(li);
  });
}
playBtn.onclick = () => {
  if (audio.paused) playSong();
  else pauseSong();
};
prevBtn.onclick = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
};
nextBtn.onclick = () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
};
audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressPercent}%`;
  const formatTime = t => isNaN(t) ? '0:00' : `${Math.floor(t / 60)}:${('0' + Math.floor(t % 60)).slice(-2)}`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});
progressContainer.addEventListener('click', e => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});
volumeSlider.oninput = () => {
  audio.volume = volumeSlider.value;
};
audio.addEventListener('ended', () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});
loadSong(songs[songIndex]);
