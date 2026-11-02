let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');
let bgVideo = document.querySelector('.player-bg-video');
let ipodModal = document.getElementById('ipodModal');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

// Playlist for the Music popup.
// Each song:
//   img    : cover picture (also the popup background when there is no video)
//   name   : title shown in the player
//   artist : artist shown in the player
//   music  : the song file
//   video  : (optional) your edit, plays muted on a loop behind the player.
//            Use an .mp4 / .webm from assets/videos/ or a looping .gif.
//            Leave it out to show the cover with the spinning circle instead.
//
// Example:
//   {
//       img    : 'assets/img/Kulosa.png',
//       name   : 'Oxlade',
//       artist : 'Kulosa',
//       music  : 'assets/music/Kulosa1.mp3',
//       video  : 'assets/videos/KulosoEdit.mp4'
//   },
const music_list = [
    // {
    //     img : 'assets/img/thug11.png',
    //     name : 'With That',
    //     artist : 'Young Thug',
    //     music : 'assets/music/withthat.mp3'

    // },
    // {
    //     img : 'assets/img/Thug.png',
    //     name : 'Check',
    //     artist : 'Young Thug',
    //     music : 'assets/music/Check.mp3'

    // },
    // {
    //     img : 'assets/img/catchme.png',
    //     name : 'Catch me if you can',
    //     artist : 'Adekunle Gold',
    //     music : 'assets/music/catchmeifyoucan.mp3'

    // },






    // {
    //     img : 'assets/img/mickeyjoel2gifoptimize.gif',
    //     name : 'Mickey-Joell',
    //     artist : 'Rulay - 24hrs',
    //     music : 'assets/music/mickeyjoell-rulay.mp3'
    // },

    // {
    //     img : 'assets/img/mickeygifoptimize.gif',
    //     name : 'Mickey 24 Hrs',
    //     artist : 'Rulay',
    //     music : 'assets/music/mickey-rulay.mp3'
    // },

    // {
    //     img : 'assets/img/darielgifoptimize.gif',
    //     name : 'Dariel',
    //     artist : 'Alma Negra',
    //     music : 'assets/music/dariel-almanegra.mp3'
    // },
    
    

    



    
    // {
    //     img : 'assets/img/Royal.png',
    //     name : 'Royal Flush',
    //     artist : 'Thug ft.',
    //     music : 'assets/music/Royal.mp3'

    // },
    // {
    //     img : 'assets/img/panda.png',
    //     name : 'Panda',
    //     artist : 'Panda',
    //     music : 'assets/music/Panda.mp3'

    // },
    // {
    //     img : 'assets/img/Gunna2.png',
    //     name : 'One of Wu',
    //     artist : 'Gunna',
    //     music : 'assets/music/Gunna-oneofwun.mp3'

    // },





    // {
    //     img : 'assets/img/Soweto.png',
    //     name : 'Soweto',
    //     artist : 'Victony & Tempoe',
    //     music : 'assets/music/Victony.Tempoe-Soweto.mp3'
    // },
    // {
    //     img : 'assets/img/Kulosa.png',
    //     name : 'Oxlade',
    //     artist : 'Kulosa',
    //     music : 'assets/music/Kulosa1.mp3',
    //     video : 'assets/videos/KulosoEdit.mp4'
    // },
    {
        img : 'assets/img/BookerT.png',
        name : 'BookerT',
        artist : 'Bad Bunny & BookerT',
        music : 'assets/music/BookerT.mp3',
        video : 'assets/videos/BookerTcom.mp4'
    },
    {
        img : 'assets/img/biggestfan.png',
        name : 'Biggest Fan',
        artist : 'Vybz Kartel',
        music : 'assets/music/biggestfan.mp3'
    },
    
    {
        img : 'assets/img/compro.png',
        name : 'Compromise',
        artist : 'Fireboy',
        music : 'assets/music/compromise.mp3'
        
    },
    {
        img : 'assets/img/freefromdesire.png',
        name : 'Free From Desire',
        artist : 'Calvin Harris',
        music : 'assets/music/freefromdesire.mp3'

    },
    {
        img : 'assets/img/freemind.png',
        name : 'Free Mind',
        artist : 'Tems',
        music : 'assets/music/freemind.mp3'

    },
    
    {
        img : 'assets/img/oneandonly.png',
        name : 'One and Only',
        artist : 'ASE',
        music : 'assets/music/oneandonly.mp3'

    },
    // {
    //     img : 'assets/img/UnFlowZaza.gif',
    //     name : 'Fa Melz',
    //     artist : 'Tengo Un Flow',
    //     music : 'assets/music/UnFlowZaza.mp3'
    // },
    






































    {
        img : 'assets/img/Cirujano1.png',
        name : 'Cirujano Noturno',
        artist : 'Hip Hop',
        music : 'assets/music/cirujanohiphop.mp3'
        
    },

    {
        img : 'assets/img/Cirujano1.png',
        name : 'Cirujano Noturno',
        artist : 'En la Esquina',
        music : 'assets/music/cirujanoencualquieresquina.mp3'
        
    },
    {
        img : 'assets/img/Cirujano1.png',
        name : 'Cirujano Noturno',
        artist : 'Rap Por $$$',
        music : 'assets/music/cirujanorappordinero.mp3'
        
    },
    {
        img : 'assets/img/Cirujano1.png',
        name : 'Cirujano Noturno',
        artist : 'Home Run',
        music : 'assets/music/cirujanohomerun.mp3'
        
    },
    {
        img : 'assets/img/Cirujano1.png',
        name : 'Cirujano Noturno',
        artist : 'Plomo Por Pila',
        music : 'assets/music/cirujanoplomoporpila.mp3'
        
    },
    {
        img : 'assets/img/Cirujano1.png',
        name : 'Cirujano Noturno',
        artist : 'Un *** en tu Tinaco',
        music : 'assets/music/cirujanounmuertopicaoentutinaco.mp3'
        
    },
    {
        img : 'assets/img/Cirujano1.png',
        name : 'Cirujano Noturno',
        artist : 'Quieren Problema',
        music : 'assets/music/cirujanosiquierenproblema.mp3'
        
    },
    {
        img : 'assets/img/Cirujano1.png',
        name : 'Cirujano Noturno',
        artist : '#Bars',
        music : 'assets/music/Cirujano2.mp3'
        
    },
    {
        img : 'assets/img/Cirujano1.png',
        name : 'Cirujano Noturno',
        artist : 'Eh Eh Eh',
        music : 'assets/music/Cirujano4.mp3'
        
    },
    {
        img : 'assets/img/Cirujano1.png',
        name : 'Cirujano Noturno',
        artist : 'Cojelo Eazy',
        music : 'assets/music/Cirujano5.mp3'
        
    },
    {
        img : 'assets/img/Cirujano1.png',
        name : 'Cirujano Noturno',
        artist : 'Rap Puro',
        music : 'assets/music/Cirujano3.mp3'
        
    },
    
    // {
    //     img : 'assets/img/essence.png',
    //     name : 'Essence',
    //     artist : 'Essence',
    //     music : 'assets/music/essence.mp3'
        
    // },
   
    // {
    //     img : 'assets/img/Lastlast.png',
    //     name : 'For My Hand',
    //     artist : 'Burna Boy',
    //     music : 'assets/music/formyhand.mp3'

    // },
    
    // {
    //     img : 'assets/img/soundgasm.png',
    //     name : 'Soundgasm',
    //     artist : 'Rema',
    //     music : 'assets/music/soundgasm.mp3'

    // },
    // {
    //     img : 'assets/img/thewayyou.png',
    //     name : 'The Way You Move',
    //     artist : 'Jenn Champion',
    //     music : 'assets/music/thewayyoumove.mp3'

    // },


    // {
    //     img : 'assets/img/migos3rd.png',
    //     name : 'Casper',
    //     artist : 'Take Off',
    //     music : 'assets/music/migos-3rd.mp3'

    // },







    
    // {
    //     img : 'assets/img/ChoppaHate.png',
    //     name : 'Choppa Hate',
    //     artist : '21 Savage ft Off SET',
    //     music : 'assets/music/Choppahate.mp3'

    // },
    // {
    //     img : 'assets/img/dior.png',
    //     name : 'Dior',
    //     artist : 'Dior',
    //     music : 'assets/music/dior.mp3'

    // },
    
    // {
    //     img : 'assets/img/Gunna2.png',
    //     name : 'Gunna',
    //     artist : 'Relentless',
    //     music : 'assets/music/Gunna-Relentless.mp3'

    // },
    // {
    //     img : 'assets/img/Gunna2.png',
    //     name : 'Gunna',
    //     artist : 'F U Mean',
    //     music : 'assets/music/Gunna-fumean.mp3'

    // },
    // {
    //     img : 'assets/img/lilbaby2.png',
    //     name : 'Sum 2 Prove',
    //     artist : 'Lil Baby',
    //     music : 'assets/music/sum2prove.mp3'

    // },
    // {
    //     img : 'assets/img/migos1.png',
    //     name : 'Too Hoty',
    //     artist : 'Migos',
    //     music : 'assets/music/Toohotty.mp3'

    // },
    // {
    //     img : 'assets/img/future2.png',
    //     name : 'Timmmy Turner',
    //     artist : 'Future',
    //     music : 'assets/music/Timmy.mp3'

    // },
    // {
    //     img : 'assets/img/migos2.png',
    //     name : 'Guwop',
    //     artist : 'Young Thug',
    //     music : 'assets/music/Guwop.mp3'

    // },
    // {
    //     img : 'assets/img/bobby1.png',
    //     name : 'Hot Nigg',
    //     artist : 'Bobby Swmurda',
    //     music : 'assets/music/Hotniig.mp3'

    // },





    




    // {
    //     img : 'assets/img/codigosvid.gif',
    //     name : 'Nory Dolla',
    //     artist : 'Codigos',
    //     music : 'assets/music/Nory-Codigos.mp3'
    // },
    
   
















];



loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);



    // random_bg_color();

    updateBackgroundImage();



    
}





// function random_bg_color(){
//     let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
//     let a;

//     function populate(a){
//         for(let i=0; i<6; i++){
//             let x = Math.round(Math.random() * 14);
//             let y = hex[x];
//             a += y;
//         }
//         return a;
//     }
//     let Color1 = populate('#');
//     let Color2 = populate('#');
//     var angle = 'to right';

//     let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";


    

//     document.body.style.background = gradient;
    
//     document.querySelector('.wrapper').style.background = gradient;
// }





// Background of the Music popup:
// - song with a "video" (.mp4 / .webm) -> the video plays muted on a loop
// - song with a "video" that is a .gif  -> the GIF loops as the background
// - song without a "video"              -> the cover ("img") is the background
// When there is a video or GIF, the spinning cover circle is hidden.
function updateBackgroundImage() {
    const wrapper = document.querySelector('.wrapper');
    const track = music_list[track_index];
    const isGif = track.video && /\.gif$/i.test(track.video);
    const isVideo = track.video && !isGif;

    wrapper.classList.toggle('has-video', Boolean(track.video));
    wrapper.style.backgroundImage = `url("${isGif ? track.video : track.img}")`;
    wrapper.style.backgroundSize = 'cover';
    wrapper.style.backgroundPosition = 'center';
    wrapper.style.backgroundRepeat = 'no-repeat';

    if (!bgVideo) return;
    if (isVideo) {
        if (bgVideo.getAttribute('src') !== track.video) bgVideo.src = track.video;
        bgVideo.poster = track.img;
        playBackgroundVideo();
    } else {
        bgVideo.pause();
        bgVideo.removeAttribute('src');
        bgVideo.removeAttribute('poster');
        bgVideo.load();
    }
}

// Only play the background video while the Music popup is open (saves data)
function playBackgroundVideo() {
    if (!bgVideo || !bgVideo.getAttribute('src')) return;
    if (ipodModal && ipodModal.classList.contains('show')) bgVideo.play().catch(() => {});
    else bgVideo.pause();
}

if (ipodModal) {
    new MutationObserver(playBackgroundVideo)
        .observe(ipodModal, { attributes: true, attributeFilter: ['class'] });
}










function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    if (wave) wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    if (wave) wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}






