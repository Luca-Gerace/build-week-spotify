/* ------------------------- PUNTATORI ------------------------- */
const songsContainer = document.getElementById('songsContainer');
const jumbotronContainer = document.getElementById('jumbotron');
const songlist = document.getElementById('songlist');
const songsTable = document.getElementById('songsTable');
const back = document.getElementById('back');
const forward = document.getElementById('forward');

// dynamic bg gradient
songsContainer.style.background = `linear-gradient(180deg, #${randomString(6)} 0%, #242424 100%)`;

/* ------------------------ CHIAMATE API ----------------------- */
const url = 'https://striveschool-api.herokuapp.com/api/deezer/album';
const request = { method: 'GET', headers: { "Content-Type": "application/json" } }
const params = new URLSearchParams(window.location.search);
const query = params.get('id');

// chiamata api con id album
const fetchSongs = async () => {
    try {
        let response = await fetch(`${url}/${query}`, request);
        let data = await response.json();

        createJumbotron(data);

        let counter = 1;

        data.tracks.data.forEach(song => {
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
function createJumbotron(song) {

    // Punto elementi jumbotron
    const jImg = document.getElementById('jumbotron-img');
    const jUpText = document.getElementById('jumbotron-upper-text');
    const jTitle = document.getElementById('jumbotron-title');
    const jArtist = document.getElementById('jumbotron-artist');
    const jArtistImg = document.getElementById('artist-img');

    setTimeout(() => {
        jImg.src = ``;
        jImg.src = `${song.cover_xl}`;
        jImg.alt = `${song.title}`;
        jUpText.innerText = `ALBUM`;
        jTitle.innerText = `${song.title}`;
        jTitle.classList.remove('w-100', 'rounded-pill');
        jArtistImg.src = ``;
        jArtistImg.src = `${song.artist.picture_medium}`;
        jArtistImg.alt = `${song.artist.name}`;
        jArtist.innerText = `${song.artist.name}`;
        jArtist.href = `artist.html?id=${song.artist.id}`;
        jArtist.classList.remove('w-75', 'rounded-pill');

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
            <p class="col-3 text-white-50 text-end">${songDuration(song.duration)}</p> 
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

// funzione per formattare il dato durata canzone
function songDuration(number) {
    // Converto numero in stringa
    const numberStr = number.toString();

    // formatto la visualizzazione del dato
    if (numberStr.length === 3) {
        return `${numberStr[0]}:${numberStr.slice(1)}`;
    } else {
        return `0:${numberStr}`;
    }
}

// Genero una stringa casuale di X caratteri
function randomString(x) {
    const allCharacters = 'ABCDEF0123456789';
    let randomString = '';
    
    for (let i = 0; i < x; i++) {
      const randomCharacter = Math.floor(Math.random() * allCharacters.length);
      randomString += allCharacters[randomCharacter];
    }
    
    return randomString;
}

/* ---------------------- EVENT LISTNER ----------------------- */
document.addEventListener('DOMContentLoaded', function() {
    // Al caricamento del DOM lancio le funzioni per creare i contenuti
    fetchSongs();
})

// event listerner per i bottoni di navigazione
back.addEventListener("click", () => window.history.back());
forward.addEventListener("click", () => window.history.forward());