// API
const urlQueen = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=queen' // aggiungere qualcosa in coda

const genereRap = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=rap'

const request = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
}

// PUNTATORI
const jumbotronContainer = document.getElementById('jumbotron');
const pillsContainer = document.getElementById('pillsContainer');
const cardsContainer = document.getElementById('cardsContainer');

jumbotron
// chiamata per jumbotron
const myFunc = async () => {

    try {

        let response = await fetch(urlQueen, request);

        let data = await response.json();

        createJumbtron(data.data[0]);     

    } catch(error) {
        console.error('error:', error);
    }
}


// chiamata rap
const myFunc2 = async () => {

    try {

        let response = await fetch(genereRap, request);

        let data = await response.json();

        let counter = 0;

        data.data.forEach(item => {

            counter++;

            if (counter < 7) {
                createPills(item);
            } else if (counter < 12) {
                createCards(item);
            } else {
                return
            }          
        })       

    } catch(error) {
        console.error('error:', error);
    }
}


// jumbtron
function createJumbtron(song) {

    const jumbtron = document.createElement('div');

    jumbtron.classList.add('jumbtron', 'd-none', 'd-sm-block');

    jumbtron.innerHTML = `
        <div class="cardtop d-flex flex-row align-items-center px-2 py-3 gap-5">
            <img src="${song.artist.picture}" alt="${song.title}" />
            <div class="mb-0 text-white card-body w-75">
                <p class="mb-1 text-white card-text">ALBUM</p>
                <h1 class="mb-0 text-white card-title">${song.title}</h1>
                <h6 class="mb-2 text-white card-title">${song.artist.name}</h6>
                <p class="mb-0 text-white card-text">Ascolta il nuovo singolo di:</p>
                <div class="d-flex gap-3 align-items-center my-2">
                    <button class="rounded-pill border-dark border-1">
                        <p class="m-0 py-2 px-3 fw-bold">Play</p>
                        <audio controls>
                            <source src="${song.preview}" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                    </button>
                    <button class="text-white rounded-pill border-white border-1">
                        <p class="m-0 py-2 px-3 fw-bold">Salva</p>
                    </button>
                    <ion-icon class="text-white" name="ellipsis-horizontal"></ion-icon>
                </div>
            </div>
        </div>
    `

    jumbotronContainer.appendChild(jumbtron);

}

// pills
function createPills(song) {

    const pills = document.createElement('div');

    pills.classList.add('pills', 'd-none', 'd-sm-block');

    pills.innerHTML = `
        <div class="buonasera-playlist d-flex justify-content-start align-items-center gap-2">
            <img src="${song.artist.picture}" alt="${song.title}" />
            <div class="title">
                <p class="m-0 text-white">${song.title}</p>
            </div>
        </div>
    `

    pillsContainer.appendChild(pills);

}

// cards
function createCards(song) {

    const card = document.createElement('div');

    card.classList.add('card');

    card.innerHTML = `
        <img src="${song.album.cover}" alt="${song.album.title}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${song.album.title}</h5>
            <p class="card-text">${song.artist.name}</p>
        </div>
    `

    cardsContainer.appendChild(card);

}

// Event listner dom content loader
document.addEventListener('DOMContentLoaded', function() {
    // funzione 
    myFunc();
    myFunc2();

})