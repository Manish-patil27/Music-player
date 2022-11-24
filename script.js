const image= document.getElementById("photo");
const backImage= document.getElementById("full");
const title=document.querySelector('h2');
const artist=document.querySelector('h3');
const music=document.querySelector('audio');
const durationEl=document.getElementById("duration");
const currentTimeEl=document.getElementById("current-time");
const progressContainer=document.getElementById("progress-container");
const progressBar=document.getElementById("progress")
const prevBtn=document.getElementById("prev");
const playBtn=document.getElementById("play");
const nextBtn=document.getElementById("next");


const songs=[

    {
        name:'Aahatein',
        displayName:'Aahatein-Samyak Prasana',
        artist:'Manuu',
        color:'rgba(152, 72, 43, 0.9)'
    },

    {
        name:'ArRahuman',
        displayName:'Nadhiye Nadhiye',
        artist:'Manuu',
        color:'#000046'
    },

    {
        name:'Believer',
        displayName:'Imagine Drangons',
        artist:'Manuu',
        color:'rgb(253, 157, 0)'
    },

    {
        name:'joker',
        displayName:'Lai la la BGM',
        artist:'Manuu',
        color:' linear-gradient(to left, #0f9b0f, #000000)'
    },

    {
        name:'Anirudh',
        displayName:'Master-the-Blaster',
        artist:'Manuu',
        color:'rgba(0, 20,255, 0.9)'
    },
	 
	 {
        name:'Arabic kuthu',
        displayName:'Arabic kuthu-Anirudh',
        artist:'Manuu',
        color:'rgba(245, 145,39, 0.9)'
    },
	 
	 {
        name:'Extremes',
        displayName:'Extremes-Alan walker',
        artist:'Manuu',
        color:'rgba(38, 38,37, 0.9)'
    },
	 
	 {
        name:'Heat Waves',
        displayName:'Heat Waves-glass animal',
        artist:'Manuu',
        color:'rgba(84, 222,151, 0.9)'
    },
	 
	 {
        name:'Hippi Sabotage',
        displayName:'devil eyes',
        artist:'Manuu',
        color:'rgba(231, 236,193, 0.9)'
    },
	 
	 {
        name:'Hymn',
        displayName:'Hymn-coldplay',
        artist:'Manuu',
        color:'rgba(38, 38,37, 0.9)'
    },
	 
	 {
        name:'Montero',
        displayName:'Montero-lil Nas X',
        artist:'Manuu',
        color:'rgba(195, 37, 17, 0.9)'
    },
	 
	 {
        name:'Safari',
        displayName:'Safari-Serena',
        artist:'Manuu',
        color:'rgba(69, 0, 153, 0.9)'
    },
	 
	 



]






let isPlaying=false;

function playSong(){
    isPlaying=true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute("title","pause");
    music.play();
}

function pauseSong(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute("title","play")
    music.pause()
}

playBtn.addEventListener('click',() => ( isPlaying ? pauseSong() : playSong()));


//dom update

function loadSong(song){
    artist.textContent=song.name;
    title.textContent=song.displayName;
    music.src=`music/${song.name}.mp3`
    image.src=`img/${song.name}.jpg`;
    document.body.style.background=song.color
}

let songIndex=0
loadSong(songs[songIndex]);


function prevSong(){

    songIndex--;

    if(songIndex<0){
        songIndex=songs.length-1
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();

}


function nextSong(){

    songIndex++;

    if(songIndex>songs.length-1){
        songIndex=0
    }

    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();

}

function updateProgress(e){
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // progress bar width

        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Calculate display  duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
          durationSeconds = `0${durationSeconds}`;
        }
        // to avoid NaN
        if (durationSeconds) {
          durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for currentTime
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
          currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
      }
}


function setProgressBar(e){
    
    const width =this.clientWidth;
      console.log('width',width);
    const clickX=e.offsetX;
    console.log('clickX',clickX);

     const { duration }=music;
    music.currentTime=(clickX/width)*duration;
    
}






prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate',updateProgress)
progressContainer.addEventListener("click",setProgressBar);
