
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myprogressbar = document.getElementById("myprogressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
const navBar = document.querySelector("nav");
const menuBtns = document.querySelectorAll('.menu-icon');
const overLay = document.querySelector('.overlay');
let songitem = Array.from(document.getElementsByClassName('songitem'));
let songs = [
    { songName: "Hasti rahe tu", filePath: "songs/1.mp3", coverPath: "cover/1.jpg" }
    , { songName: "pyaar pyaar", filePath: "songs/2.mp3", coverPath: "cover/2.jpg" }
    , { songName: "blue eyes", filePath: "songs/3.mp3", coverPath: "cover/3.jpg" }
    , { songName: "king", filePath: "songs/4.mp3", coverPath: "cover/4.jpg" }
    , { songName: "tu rang sharbatoin ka ", filePath: "songs/5.mp3", coverPath: "cover/5.jpg" }
    , { songName: "karma 1 sei 23", filePath: "songs/6.mp3", coverPath: "cover/6.jpg" }
]

songitem.forEach((element, i) => {
    console.log(element, i)
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});
//for side menu bar
//for(let i=0; i< menuBtns.length; i++){
menuBtns.forEach((menuBtn) => {
    menuBtn.addEventListener("click", () => {
        navBar.classList.toggle('open');
        myprogressbar.classList.toggle('open');
    });
});

overLay.addEventListener('click', () => {
    navBar.classList.remove("open");
    myprogressbar.classList.remove('open');
});


//audioElement.play();
//audio play/pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('bx-play-circle');
        masterPlay.classList.add('bx-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('bx-pause-circle');
        masterPlay.classList.add('bx-play-circle');
        gif.style.opacity = 0;
    }
});
myprogressbar.value = 0;
//update prpogress bar
audioElement.addEventListener("timeupdate", () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogressbar.value = progress;
});

myprogressbar.addEventListener("change", () => {
    audioElement.currentTime = myprogressbar.value * audioElement.duration / 100;

});
const makeAllPlays = () => {

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('bx-pause-circle');
        element.classList.add('bx-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        audioElement.pause();
        makeAllPlays();
        songIndex = parseInt(e.target.id)-1;
        e.target.classList.remove('bx-play-circle');
        e.target.classList.add('bx-pause-circle');
        gif.style.opacity = 1;
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('bx-play-circle');
        masterPlay.classList.add('bx-pause-circle');
    
    });
});
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 7) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('bx-play-circle');
    masterPlay.classList.add('bx-pause-circle');
})



document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('bx-play-circle');
    masterPlay.classList.add('bx-pause-circle');
});
// Update time display
audioElement.addEventListener("timeupdate", () => {
    const currentTimeElement = document.getElementById("currentTime");
    const totalDurationElement = document.getElementById("totalDuration");
    const currentTime = audioElement.currentTime;
    const totalDuration = audioElement.duration;

    // Format the time in minutes and seconds
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const totalMinutes = Math.floor(totalDuration / 60);
    const totalSeconds = Math.floor(totalDuration % 60);

    // Format the time as "00:SS" (e.g., "2:30")
    currentTimeElement.textContent = `${currentMinutes < 10 ? "0" : ""}${currentMinutes}:${currentSeconds < 10 ? "0" : ""}${currentSeconds}`;
    totalDurationElement.textContent = `${totalMinutes < 10 ? "0" : ""}${totalMinutes}:${totalSeconds < 10 ? "0" : ""}${totalSeconds}`;
});
audioElement.addEventListener("ended", () => {
    // Handle song end here
    masterPlay.classList.remove('bx-pause-circle');
    masterPlay.classList.add('bx-play-circle');
    gif.style.opacity = 0;
    myprogressbar.value = 0;
});


// Call the 'timeupdate' event once to initialize the time display
audioElement.dispatchEvent(new Event('timeupdate'));




