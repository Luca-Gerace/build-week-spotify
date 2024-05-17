/* ------------------------- PUNTATORI ------------------------- */
const postsContainer = document.getElementById('postsContainer');
const friendsContainer = document.getElementById('friendsContainer');


/* ----------------------- DATI STATICI ----------------------- */

// Genera post a  partire dall'array post
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
    "Culo 2021 🎨",
    "Innovazione è la chiave! 🔑",
    "Sii te stesso! 🌟",
    "Pensiero positivo! 🌈",
    "Respira e rilassati! 🧘‍♂️",
];
function createPosts() {
    posts.forEach(post => {
        const singlePost = document.createElement('p');
        singlePost.classList.add('fs-7');
        singlePost.innerText = post;

        postsContainer.appendChild(singlePost);
    })
}

// Genera amici a partire dall'array friends
const friends = [
    {name: 'Mario Rossi', img: '_assets/user-1.png', lastActivity: '3 ore', artist: 'Salmo', album: 'Machete Mix', song: 'Fuggitivo'},
    {name: 'Giuseppe Verdi', img: '_assets/user-2.png', lastActivity: '4 ore', artist: 'Eminem', album: 'Encore', song: 'Mockingbird'},
    {name: 'Salvatore Gialli', img: '_assets/user-1.png', lastActivity: '8 ore', artist: 'Liberato', album: 'Liberato', song: '9 maggio'},
];
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

/* ---------------------- EVENT LISTNER ----------------------- */
document.addEventListener('DOMContentLoaded', function() {
    // Al caricamento del DOM lancio le funzioni per creare i contenuti
    createPosts();
    createFriends();
})