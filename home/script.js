/* ------------------------- PUNTATORI ------------------------- */
const jumbotronContainer = document.getElementById('jumbotron');
const pillsContainer = document.getElementById('pillsContainer');
const cardsContainer = document.getElementById('cardsContainer');
const postsContainer = document.getElementById('postsContainer');
const friendsContainer = document.getElementById('friendsContainer');

/* ------------------------ CHIAMATE API ----------------------- */
const url = 'https://striveschool-api.herokuapp.com/api/deezer';
const albumUrl = `${url}/album`;
const artistUrl = `${url}/artist`;
const searchUrl = `${url}/search?q=`;

const request = { method: 'GET', headers: {"Content-Type": "application/json"}}

// chiamata per jumbotron
const jumbotronHandler = async () => {

    try {
        let response = await fetch(`${albumUrl}/${randomNumber()}`, request);
        let data = await response.json();

        // Se l'id artista randomico non esiste
        if (data.error) {
            // rilancio la funzione
            jumbotronHandler();
        } else {
            // altrimenti lancio funzione di creazione jumbotron
            createJumbtron(data);   
        }

    } catch(error) {
        console.error('error:', error);
    }
}

// chiamata per pills e cards
const fetchSongs = async () => {
    try {
        let response = await fetch(`${searchUrl}${randomString(3)}`, request);
        let data = await response.json();

        // inizializzo counter
        let counter = 0;

        // ciclo l'array di oggetti restituiti dall'API
        data.data.forEach(item => {

            // Aumento il counter
            counter++;

            // se counter minore di 7
            if (counter < 7) {
                // creo pills
                createPill(item);
            // se counter minore di 11
            } else if (counter < 11) {
                // creo cards
                createCard(item);
            // se counter superiore a 11 esco dalla funzione
            } else {
                return
            }          
        })       
    // Gestisco eventuali errori
    } catch(error) {
        console.error('error:', error);
    }
}

/* ----------------------- DATI STATICI ----------------------- */
const posts = [
    "Ciao, mondo! 😊",
    "Questo è un esempio! 😎",
    "JavaScript è divertente! 😜",
    "Emoticon aggiunge divertimento! 😄",
    "Spero che tu stia bene! 😇",
    "Buona giornata! 🥳",
    "Continua a sorridere! 😃",
    "Divertiti programmando! 🤓",
    "Non arrenderti mai! 💪",
    "Felice coding! 😊",
    "Ehi, come stai? 🤔",
    "Questa è una bella giornata! ☀️",
    "Inizia con positività! 😁",
    "Segui i tuoi sogni! 💭",
    "Sii creativo! 🎨",
    "Innovazione è la chiave! 🔑",
    "Sii te stesso! 🌟",
    "Pensiero positivo! 🌈",
    "Respira e rilassati! 🧘‍♂️",
    "Impara, pratica, esegui! 💻",
    "Ama ciò che fai! ❤️",
    "Sorridi, anche se è difficile! 😊",
    "Credi in te stesso! 🙌",
    "Vai avanti con fiducia! 🚀",
    "Conquista il mondo! 🌍",
    "Un passo alla volta! 👣",
    "Ogni giorno è una nuova avventura! 🌟",
    "Goditi il viaggio! 🚗",
    "Vivi il momento! ⏳",
    "Raggiungi le stelle! 🌠"
];

// Genera post
function createPosts() {
    posts.forEach(post => {
        const singlePost = document.createElement('p');
        singlePost.classList.add('fs-7');
        singlePost.innerText = post;

        postsContainer.appendChild(singlePost);
    })
}

const friends = [
    {name: 'Mario Rossi', img: '../assets/user-1.png', lastActivity: '3 ore', artist: 'Salmo', album: 'Machete Mix', song: 'Fuggitivo'},
    {name: 'Giuseppe Verdi', img: '../assets/user-2.png', lastActivity: '4 ore', artist: 'Eminem', album: 'Encore', song: 'Mockingbird'},
    {name: 'Salvatore Gialli', img: '../assets/user-1.png', lastActivity: '8 ore', artist: 'Liberato', album: 'Liberato', song: '9 maggio'},
];

// Genera amici
function createFriends() {
    friends.forEach(friend => {
        const singleFriend = document.createElement('li');
        singleFriend.classList.add('d-flex', 'justify-content-between', 'p-2');
        singleFriend.innerHTML = `
            <div class="d-flex">
                <img src="${friend.img}" alt="${friend.name}" class="d-xl-block d-none user-img me-2" />
                <div class="d-flex flex-column text-white">
                    <strong class="fs-7">${friend.name}</strong>
                    <span class="fs-8">${friend.artist} &#183; ${friend.album}</span>
                    <span class="fs-8">${friend.song}</span>
                </div>
            </div>
            <span class="text-white fs-8 d-xxl-block d-none">${friend.lastActivity}</span>
        `;

        friendsContainer.appendChild(singleFriend);
    })
}

/* ------------------------- FUNZIONI ------------------------- */
// Creo jumbtron
function createJumbtron(song) {

    const jumbtron = document.createElement('div');

    jumbtron.classList.add('jumbtron');

    jumbtron.innerHTML = `
        <div class="bg-black bg-gradient d-none d-md-flex align-items-center my-5 px-3 py-4 gap-5">
            <img src="${song.artist.picture_xl}" alt="${song.title}"  class="w-25" />
            <div class="mb-0 text-white card-body w-75">
                <p class="mb-1 text-white card-text">ALBUM</p>
                <h1 class="${song.title.length < 24 ? 'title' : 'fs-1'} fw-bold m-0">${song.title}</h1>
                <p class="mb-2 text-white card-title">${song.artist.name}</p>
                <p class="mb-0 text-white card-text">Ascolta il nuovo singolo di ${song.artist.name}</p>
                <div class="d-flex gap-3 align-items-center mt-3">
                    <button id="btn-${song.tracks.data[0].id}" onclick="playSong(${song.tracks.data[0].id})" class="brand-bg brand-border rounded-pill py-2 fw-bold">
                        Play
                    </button>
                    <audio id="audio-${song.tracks.data[0].id}">
                        <source src="${song.tracks.data[0].preview}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                    <button class="btn btn-outline-dark text-white rounded-pill border-white border-1 py-2 fw-bold">
                        Salva
                    </button>
                    <ion-icon class="text-white" name="ellipsis-horizontal"></ion-icon>
                </div>
            </div>
        </div>
    `

    jumbotronContainer.appendChild(jumbtron);
}

// Creo pills
function createPill(song) {

    const pill = document.createElement('div');

    pill.classList.add('col-12', 'col-md-6', 'col-lg-4');

    pill.innerHTML = `
        <a href="#" class="text-decoration-none bg-black-500 rounded d-flex justify-content-start align-items-center my-3">
            <img src="${song.artist.picture}" alt="${song.title}" class="w-25 rounded-start" />
            <div class="title">
                <p class="py-2 px-3 m-0 text-white ${song.title < 50 ? 'fs-6' : 'fs-7'}">${song.title}</p>
            </div>
        </a>
    `

    pillsContainer.appendChild(pill);

}

// Creo cards
function createCard(song) {

    const card = document.createElement('div');

    card.classList.add('col-12', 'col-md-6', 'col-lg-3', 'mb-4');

    card.innerHTML = `
        <div class="card bg-black-500 p-3">
            <img src="${song.album.cover_big}" alt="${song.album.title}" class="rounded position-relative overflow-hidden">
            <button id="btn-${song.id}" onclick="playSong(${song.id})" class="text-black rounded-circle brand-bg position-absolute border-0 text-center z-1"><i class="bi bi-play-fill fs-1"></i></button>
            <audio id="audio-${song.id}">
                <source src="${song.preview}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
            <div class="card-content d-flex flex-column justify-content-between pt-4">
                <h3 class="card-title fw-bold text-white ${song.album.title < 50 ? 'fs-6' : 'fs-7'}">${song.album.title}</h3>
                <p class="card-text fs-7 text-white-50">${song.artist.name}</p>
            </div>
        </div>
    `

    cardsContainer.appendChild(card);
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
        // Check per capire se il btn ha testo o icona
        if (btn.innerText === 'Pause') {
            btn.innerText = 'Play';
        } else {
            btn.innerHTML = '<i class="bi bi-play-fill fs-1"></i>';
        }
    }
};

// Genero un numero random di 6 cifre
function randomNumber() {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return randomNumber;
}

// Genero una stringa casuale di X caratteri
function randomString(x) {
    const allCharacters = 'abcdefghijklmnopqrstuvwxyz';
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
    createPosts();
    createFriends();
    jumbotronHandler();
    fetchSongs();
})