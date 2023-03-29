const audio = document.getElementById("audio");
const playPause = document.getElementById("play");
const progressBar = document.querySelector(".player__level");
const playerImage = document.querySelector(".player__img");
const volumeUpButton = document.getElementById("volume-up");
const volumeDownButton = document.getElementById("volume-down");
const lista = document.getElementById("listaHide");
const listaCanciones = document.getElementById("lista-canciones");
let currentSongIndex = 0; 
const songs = [
  {
    name: "Metamorphosis ",
    artist: "INTERWORLD",
    url: "assets/media/METAMORPHOSIS.mp3",
    image: "assets/images/portada.jpg"
  },
  {
    name: "WAKE UP ",
    artist: "MoonDeity",
    url: "assets/media/WAKE UP.mp3",
    image: "assets/images/WakeUP.jpg"
  },
  {
    name: "MURDER IN MY MIND ",
    artist: "KORDHELL",
    url: "assets/media/KORDHELL  MURDER IN MY MIND.mp3",
    image: "assets/images/mimm.jpg"
  },
  {
    name: "NEON BLADE ",
    artist: "MoonDeity",
    url: "assets/media/MoonDeity  NEON BLADE.mp3",
    image: "assets/images/NEON BLADE.jpg"
  },
  {
    name: "Басы долбят ",
    artist: "SOSKA 69",
    url: "assets/media/Басы долбят.mp3",
    image: "assets/images/Басы долбят.jpg"
  },
  {
    name: "MIDNIGHT ",
    artist: "PLAYAMANE x Nateki",
    url: "assets/media/MIDNIGHT.mp3",
    image: "assets/images/MIDNIGHT.jpg"
  },
  {
    name: "vendetta! ",
    artist: "MUPP x Sadfriendd",
    url: "assets/media/vendetta.mp3",
    image: "assets/images/vendetta.jpg"
  },
  {
    name: "SHADOW ",
    artist: "MUPP x Sadfriendd",
    url: "assets/media/ONIMXRU x SMITHMANE SHADOW.mp3",
    image: "assets/images/SHADOW.jpg"
  },
  {
    name: "SXND NXDES ",
    artist: "GREEN ORXNGW x Send1",
    url: "assets/media/GREEN ORXNGE x Send 1  SXND NXDES.mp3",
    image: "assets/images/SXNDNXDXS.jpg"
  },
  {
    name: "Warning (speed up) ",
    artist: "MC ORSEN",
    url: "assets/media/WARNING  MC ORSEN Speed Up  Extended Edit.mp3",
    image: "assets/images/Warning (Speed up).jpg"
  },
  {
    name: "PHONKY TOWN ",
    artist: "Playaphonk",
    url: "assets/media/Playaphonk  PHONKY TOWN Audio.mp3",
    image: "assets/images/PHONKY TOWN.jpg"
  },
  {
    name: "Sahara ",
    artist: "Hensonn",
    url: "assets/media/Sahara.mp3",
    image: "assets/images/Sahara.jpg"
  },
  {
    name: "IMMACULATE ",
    artist: "VISXGE ",
    url: "assets/media/IMMACULATE.mp3",
    image: "assets/images/IMMACULATE.jpg"
  },
  {
    name: "RAPTURE ",
    artist: "INTERWORLD  ",
    url: "assets/media/RAPTURE.mp3",
    image: "assets/images/RAPTURE.jpg"
  },
  {
    name: "Devil Eyes ",
    artist: "ZODIVK  ",
    url: "assets/media/Devil Eyes.mp3",
    image: "assets/images/Devil Eyes.jpg"
  },
  {
    name: "RAGNAROK ",
    artist: "chyxz   ",
    url: "assets/media/RAGNAROK.mp3",
    image: "assets/images/RAGNAROK.jpg"
  },
  {
    name: "PLACEHOLDER ",
    artist: "PLACEHOLDER   ",
    url: "assets/media/PLACEHOLDER.mp3",
    image: "assets/images/PLACEHOLDER.jpg"
  },
  {
    name: "PLACEHOLDER ",
    artist: "PLACEHOLDER   ",
    url: "assets/media/PLACEHOLDER.mp3",
    image: "assets/images/PLACEHOLDER.jpg"
  },
  

  // Agrega más canciones aquí
];
//----------------------------------------------CODIGO---------------------------------------------------------
for (let i = 0; i < songs.length; i++) {
  const cancion = songs[i];

  // Crear elementos HTML
  const li = document.createElement("li");
  const titulo = document.createElement("span");
  const artista = document.createElement("span");

  // Agregar datos a elementos HTML
  titulo.innerText = cancion.name;
  artista.innerText = cancion.artist;


  // Agregar atributos a elementos HTML
  li.setAttribute("data-src", cancion.url);

  // Agregar elementos HTML al elemento "li"
  li.appendChild(titulo);
  li.appendChild(artista);
 
  // Agregar evento click al elemento "li"
  li.addEventListener("click", function() {
    audio.src = this.getAttribute("data-src");
    playerImage.src = cancion.image;
    document.querySelector(".player__artist").textContent = cancion.artist;
    document.querySelector(".player__song").textContent = cancion.name;
    audio.play();
  });

  // Agregar elemento "li" a la lista de canciones
  listaCanciones.appendChild(li);
}

lista.addEventListener('click', (event) => {
  const cancion = event.target;
  const src = cancion.getAttribute('data-src');
  
  if (src) {
    audio.src = src;
    audio.play();
  }
});



volumeUpButton.addEventListener("click", () => {
  changeVolume(audio, "up");
});

volumeDownButton.addEventListener("click", () => {
  changeVolume(audio, "down");
});

function changeVolume(audio, direction) {
  const increment = 0.1;
  if (direction === "up") {
    if (audio.volume < 1 - increment) {
      audio.volume += increment;
    } else {
      audio.volume = 1;
    }
  } else if (direction === "down") {
    if (audio.volume > increment) {
      audio.volume -= increment;
    } else {
      audio.volume = 0;
    }
  }
}


function loadSong(song) {
  playerImage.src = song.image;
  audio.src = song.url;
  document.querySelector(".player__artist").textContent = song.artist;
  document.querySelector(".player__song").textContent = song.name;
  audio.play();
}

function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  audio.play();
}

function playPreviousSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  audio.play();
}

loadSong(songs[currentSongIndex]);

document.addEventListener("keydown", (event) => { //pausa o play si apreto la barra
  if (event.code === "Space") {
    if (audio.paused || audio.ended) {
      playPause.querySelector(".pause-btn").classList.toggle("hide");
      playPause.querySelector(".play-btn").classList.toggle("hide");  //deberia haber una forma de unir los dos, pero no se como
      audio.play();
    } else {
      audio.pause();
      playPause.querySelector(".pause-btn").classList.toggle("hide");
      playPause.querySelector(".play-btn").classList.toggle("hide");
    }
  }
});


document.querySelector(".player__btn--medium.blue").addEventListener("click", () => {//pausa o play si hago click
  if (audio.paused || audio.ended) {
    playPause.querySelector(".pause-btn").classList.toggle("hide");
    playPause.querySelector(".play-btn").classList.toggle("hide");
    audio.play();
  } else {
    audio.pause();
    playPause.querySelector(".pause-btn").classList.toggle("hide");
    playPause.querySelector(".play-btn").classList.toggle("hide");
  }
});

document.querySelector(".player__btn--small.list").addEventListener("click",()=>{
  if (lista.style.display === "none") {
    lista.style.display = "flex";
  } else {
    lista.style.display = "none";
  }



})

document.querySelector(".player__btn--medium:nth-of-type(1)").addEventListener("click", playPreviousSong);

document.querySelector(".player__btn--medium:nth-of-type(3)").addEventListener("click", playNextSong);



function segundosStr(segundos){
  let segundosStr = segundos.toFixed(0);//se arregla para tener 0 decimales
  if (segundosStr < 10) {
    segundosStr = '0' + segundosStr;
    return(segundosStr);
  }else 
    return(segundosStr);
}

audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  const minutos = Math.floor(currentTime / 60); 
  const segundos = currentTime % 60; 

  const minutosT = Math.floor(duration / 60); 
  const segundosT = duration % 60; 

  const tiempoActual = `${minutos}:${segundosStr(segundos)}`; // se construye la cadena de tiempo en formato mm:ss
  const tiempoTotal = `${minutosT}:${segundosStr(segundosT)}`;
  document.querySelector(".start").textContent = tiempoActual;
  document.querySelector(".end").textContent = tiempoTotal;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.value = progressPercent;
  if(audio.currentTime >= audio.duration){
    playNextSong();
  }
});
