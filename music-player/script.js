const songs = [
    {
        title: "Lost in the City",
        artist: "Neon Dreamer",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Midnight Drive",
        artist: "Synthwave Collective",
        cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=500",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "Ocean Breeze",
        artist: "Chill Vibes",
        cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=800",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const playerContainer = document.querySelector('.player-container');

let songIndex = 0;
let isPlaying = false;

// Load initial song
loadSong(songs[songIndex]);
audio.volume = volumeBar.value / 100;

function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    cover.src = song.cover;
    audio.src = song.src;
}

function playSong() {
    isPlaying = true;
    playerContainer.classList.add('playing');
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    audio.play();
}

function pauseSong() {
    isPlaying = false;
    playerContainer.classList.remove('playing');
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    audio.pause();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    if (isPlaying) playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    if (isPlaying) playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (isNaN(duration)) return;
    
    // Update progress bar
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent;
    
    // Calculate display time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
    currentTimeEl.innerText = `${currentMinutes}:${currentSeconds}`;
    
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
    if (durationSeconds) {
        durationEl.innerText = `${durationMinutes}:${durationSeconds}`;
    }
}

function setVolume(e) {
    const vol = e.target.value / 100;
    audio.volume = vol;
    
    // Update icon
    const volIcon = document.getElementById('vol-icon');
    if (vol === 0) {
        volIcon.className = 'fa-solid fa-volume-xmark';
    } else if (vol < 0.5) {
        volIcon.className = 'fa-solid fa-volume-low';
    } else {
        volIcon.className = 'fa-solid fa-volume-high';
    }
}

// Event Listeners
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);

progressBar.addEventListener('input', (e) => {
    const duration = audio.duration;
    if (!isNaN(duration)) {
        audio.currentTime = (e.target.value / 100) * duration;
    }
});

audio.addEventListener('ended', nextSong);
volumeBar.addEventListener('input', setVolume);
