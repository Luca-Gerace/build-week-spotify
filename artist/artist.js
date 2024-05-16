/* ------------------------- PUNTATORI ------------------------- */
const jumbotronContainer = document.getElementById('jumbotron');
const songlist = document.getElementById('songlist');
const songsTable = document.getElementById('songsTable');
const artistBg = document.getElementById('artist-background');

//
const request = { method: 'GET', headers: { "Content-Type": "application/json" } }

const params = new URLSearchParams(window.location.search);

const query = params.get('id');

const urlTracklist = `https://striveschool-api.herokuapp.com/api/deezer/artist/${query}/top?limit=10`;
const urlArtist = `https://striveschool-api.herokuapp.com/api/deezer/artist/${query}`;


console.log(urlTracklist);
// jumbotron
const fetchJumbotron = async () => {
    try {
        let response = await fetch(urlArtist, request);
        let data = await response.json();

        console.log(data);
        createJumbotron(data);

        // Gestisco eventuali errori
    } catch (error) {
        console.error('error:', error);
    }
}

// artist songs
const fetchSong = async () => {
    try {
        let response = await fetch(urlTracklist, request);
        let data = await response.json();

        let counter = 1;

        data.data.forEach(song => {
            createSongList(song, counter);
            counter++;
        })

        // Gestisco eventuali errori
    } catch (error) {
        console.error('error:', error);
    }
}

/* ------------------------- FUNZIONI ------------------------- */
// Creo jumbotron
function createJumbotron(artist) {

    // Punto elementi jumbotron
    const jImg = document.getElementById('jumbotron-img');
    const jTitle = document.getElementById('jumbotron-title');
    const jFan = document.getElementById('jumbotron-fan');
    artistBg.style.backgroundImage = `url(${artist.picture_xl})`;

    setTimeout(() => {
        jImg.src = ``;
        jImg.src = `${artist.picture_xl}`;
        jImg.alt = `${artist.name}`;
        jTitle.innerText = `${artist.name}`;
        jFan.innerText = `${artist.nb_fan} Ascoltatori mensili`;
        jTitle.classList.remove('w-75', 'rounded-pill');
        jFan.classList.remove('w-50', 'rounded-pill');
        jumbotronContainer.classList.remove('skeleton');

    }, 1500);
}

// Creo lista canzoni album
function createSongList(song, counter) {
    const listItem = document.createElement('div');

    listItem.innerHTML = `
        <div class="row d-flex justify-content-between align-items-center">
            <div class="col-6 d-flex align-items-center gap-3">
                <p class="song-counter text-white-50">${counter}</p>
                <div class="d-flex flex-column gap-1">
                    <p class="text-white m-0">${song.title}</p>
                    <p class="text-white-50 m-0">${song.artist.name}</p>
                </div>
            </div>
            <p class="col-3 text-white-50 text-end">${song.rank}</p>
            <p class="col-3 text-white-50 text-end">${song.duration}</p> 
        </div>
    `;

    songlist.appendChild(listItem);
    songsTable.classList.remove('skeleton');
}

// Song player
function playSong(id) {
    // Punto il tag audio con id specifico
    const audio = document.getElementById(`audio-${id}`);
    const btn = document.getElementById(`btn-${id}`);

    // Check per capire se l'audio è in pausa
    if (audio.paused) {
        audio.play();
        // Check per capire se il btn ha testo o icona
        if (btn.innerText === 'Play') {
            btn.innerText = 'Pause';
        } else {
            btn.innerHTML = '<i class="bi bi-pause-fill fs-1"></i>';
        }
    } else {
        audio.pause();
        //  riavvolgo la traccia
        audio.currentTime = 0
        // Check per capire se il btn ha testo o icona
        if (btn.innerText === 'Pause') {
            btn.innerText = 'Play';
        } else {
            btn.innerHTML = '<i class="bi bi-play-fill fs-1"></i>';
        }
    }
};

fetchSong();
fetchJumbotron();