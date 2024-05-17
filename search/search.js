/* ------------------------- PUNTATORI ------------------------- */
const contentsContainer = document.getElementById('contentsContainer');
const back = document.getElementById('back');
const forward = document.getElementById('forward');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

/* ----------------------- DATI STATICI ----------------------- */
// creazione skeleton delle card 
function skeletonBuilder() {
    for (let i = 0; i < 18; i++) {
        const card = document.createElement('div');
    
        // setto un id che mi tornerà utile per puntare le card ed inserire i dati
        card.setAttribute("id", `card-id${i}`);
    
        card.classList.add('skeleton', 'col-6', 'col-md-4', 'col-lg-2', 'pb-4');
    
        card.innerHTML = `
            <a href="#" class="no-skeleton text-white text-decoration-none w-100 rounded">
                <img src="https://picsum.photos/100" class="w-100 rounded" alt="">
            </a>
        `
    
        cardsContainer.appendChild(card);
    }
};

/* ------------------------ CHIAMATE API ----------------------- */
const url = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=';
const request = { method: 'GET', headers: {"Content-Type": "application/json"}};

// chiamata per cards
const fetchSongs = async () => {
    try {
        let response = await fetch(`${url}${randomString(3)}`, request);
        let data = await response.json();

        // inizializzo counter
        let counter = 0;

        // ciclo l'array di oggetti restituiti dall'API
        data.data.forEach(item => {

            const card = document.getElementById(`card-id${counter}`)
            // Aumento il counter
            counter++;

            // se counter minore di 18
            if (counter <= 18) {
                // creo card
                createCard(item, card);
            } else {
                return
            }          
        })       
    // Gestisco eventuali errori
    } catch(error) {
        console.error('error:', error);
    }
}

// chiamata per contenuti ricerca
const fetchResearch = async (e, value) => {

    e.preventDefault();

    try {
        let response = await fetch(`${url}${value}`, request);
        let data = await response.json();

        // inizializzo counter
        let counter = 0;


        console.log(data);
        // ciclo l'array di oggetti restituiti dall'API
        data.data.forEach(item => {

            const card = document.getElementById(`card-id${counter}`)
            // Aumento il counter
            counter++;

            // se counter minore di 18
            if (counter <= 18) {
                // creo card
                createCard(item, card);
            } else {
                return
            }          
        })       
    // Gestisco eventuali errori
    } catch(error) {
        console.error('error:', error);
    }
}

/* -------------------------- FUNZIONI ------------------------- */
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

// Creo cards
function createCard(song, card) {
    
    setTimeout(() => {
        
        card.innerHTML = `
            <a href="album.html?id=${song.album.id}" class="text-white text-decoration-none position-relative w-100 rounded">
                <img src="${song.album.cover_medium}" class="w-100 rounded" alt="">
            </a>
        `
    
        card.classList.remove('skeleton');
        cardsContainer.appendChild(card);
        
    }, 1500);
}

/* ---------------------- EVENT LISTNER ----------------------- */
skeletonBuilder();
document.addEventListener('DOMContentLoaded', function() {
    // Al caricamento del DOM lancio le funzioni per creare i contenuti
    fetchSongs();
})

// event listerner input di ricerca
searchButton.addEventListener('click', (e) => fetchResearch(e, searchInput.value));

// event listerner per i bottoni di navigazione
back.addEventListener("click", () => window.history.back());
forward.addEventListener("click", () => window.history.forward());
