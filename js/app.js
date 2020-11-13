//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//event listener
eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);
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
    if (tweets.length > 0) {
        limpiarHTML();
        tweets.forEach(tweet => {
            const li = document.createElement('li');
            li.textContent = tweet.tweet;
            listaTweets.appendChild(li);
        })
    }
}

//limpiar html
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}