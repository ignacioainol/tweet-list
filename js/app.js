//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//event listener
eventListeners();

function eventListeners() {
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        crearHTML();
    });
}

//funciones
function agregarTweet(e) {
    e.preventDefault();

    const tweet = document.querySelector('#tweet').value;

    if (tweet === '') {
        mostrarError('No puede ir vacio');
        return;
    }
    //anadir al arreglo de tweets
    //tweets.push(tweet);
    const tweetObj = {
        id: Date.now(),
        tweet
    }

    tweets = [...tweets, tweetObj];

    crearHTML();

    formulario.reset();

}

//desplegar lista de tweets
// function listadoTweets(){

// }

//mosntrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //eliminar la alerta despues de 3 segundos
    setTimeout(() => {
        contenido.removeChild(mensajeError);
    }, 3000);
}

//muestra un listado de los tweets
function crearHTML() {
    limpiarHTML();
    if (tweets.length > 0) {

        tweets.forEach(tweet => {
            const btnEliminar = document.createElement('span');
            btnEliminar.textContent = "X";
            btnEliminar.classList.add("borrar-tweet");

            const li = document.createElement('li');

            li.textContent = tweet.tweet;
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);

            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }
        })
    }

    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//limpiar html
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

//elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}