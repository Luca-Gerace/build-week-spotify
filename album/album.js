/* ------------------------- PUNTATORI ------------------------- */
const jumbotronContainer = document.getElementById('jumbotron');
const songlist = document.getElementById('songlist');
const songsTable = document.getElementById('songsTable');

//
const url = 'https://striveschool-api.herokuapp.com/api/deezer/album';

const request = { method: 'GET', headers: {"Content-Type": "application/json"}}

const params = new URLSearchParams(window.location.search);

const query = params.get('id');


// chiamata api con id album
const fetchSong = async () => {
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
    } catch(error) {
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
    const jLowTest = document.getElementById('jumbotron-lower-text');
    const jBtns = document.getElementById('jumbotron-buttons');

    setTimeout(() => {
        jImg.src = ``;
        jImg.src = `${song.artist.picture_xl}`;
        jImg.alt = `${song.title}`;
        jUpText.innerText = `ALBUM`;
        jTitle.innerText = `${song.title}`;
        jTitle.classList.remove('w-75');
        jArtist.innerText = `${song.artist.name}`;
        jArtist.href = `artist.html?id=${song.artist.id}`;
        jArtist.classList.remove('w-50');
        jLowTest.innerText = `Ascolta il nuovo singolo di ${song.artist.name}`;
        jLowTest.classList.remove('w-50');

        jBtns.innerHTML = `
            <button id="btn-${song.id}" onclick="playSong(${song.id})" class="brand-bg brand-border rounded-pill py-2 fw-bold">
                Play
            </button>
            <audio id="audio-${song.id}">
                <source src="${song.preview}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
            <button class="btn btn-outline-dark text-white rounded-pill border-white border-1 py-2 fw-bold">
                Salva
            </button>
        `
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

fetchSong();