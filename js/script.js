const player            =   document.querySelector('.player');
const video             =   player.querySelector('.video_');
const toggle            =   player.querySelector('.toggle img');
const skipButtons       =   player.querySelectorAll('[data-skip]');
const volume            =   player.querySelector('.volume');
const progressBar       =   player.querySelector('.progress_bar');
const progressBarBack   =   player.querySelector('.progress_back');
const fullScreen        =   player.querySelector('.full_screen');
const volImg            =   document.querySelector('.vol_img');
const currentTime       =   document.getElementById("currentTime");
const miniVideos        =   document.querySelectorAll('.mini_video_box video');


// play video
function playVideo ()  {
    if (video.paused) {
        video.play();
        toggle.src = 'img/pause.svg';
    }
    else{
        video.pause();
        toggle.src = 'img/play.svg';
    }
    
}
// skip video back and forward secends
function skipVideo ()  {
    video.currentTime += parseFloat(this.dataset.skip);
}
// change volume
function changeVolume(e) {
    // video[this.name]=this.value;
    video.volume = volume.value;
    if (volume.value == 0) {
        volImg.src = 'img/vol0.svg';
    }else if(volume.value < 0.75 && volume.value > 0.55){
        volImg.src = 'img/vol2.svg';
    }else if(volume.value < 0.55){
        volImg.src = 'img/vol3.svg';
    }
    else if(volume.value == 1){
        volImg.src = 'img/vol1.svg';
    }
    
}
// progresbar animation with video duration
function handleProgressBar() {
    const parcent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${parcent}%`;
    convertTime(Math.round(video.currentTime));  //convert decimal no into intiger
}
// gadaxveva
function scrub(e) {
    const scrubTime = (e.offsetX / progressBarBack.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    // console.log(e.clientX + scrubTime);
}

// allow fullscreen
function toggleFullScreen() {
    // get full screen 
    if (video.requestFullscreen) {
        video.requestFullscreen();
    }else if(video.webkitRequestFullscreen){
        video.webkitRequestFullscreen();
    }
}
// convert video time
function convertTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    currentTime.textContent = min + ":" + sec;
    
    totalTime(Math.round(video.duration));
}
// convert video time    
function totalTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    currentTime.textContent += " / " + min + ":" + sec;
}

///// event listeners
document.querySelector('.vol_img').addEventListener('click',()=>{
    if (video.volume == 1) {
        video.volume = 0;
        volume.value = 0;
        volImg.src = 'img/vol0.svg';
    }else{
        video.volume = 1;
        volume.value = 1;
        volImg.src = 'img/vol1.svg';
    }
});

video.addEventListener('click',()=>{
    playVideo();
});
video.addEventListener('timeupdate',()=>{
    handleProgressBar();
    if (video.ended) {
        toggle.src = 'img/play.svg';
        progressBar.style.width = `0%`;
    }
});
toggle.addEventListener('click',()=>{
    playVideo();
});

fullScreen.addEventListener('click',()=>{
    toggleFullScreen();
});
// full screen with key F 
document.addEventListener("keypress", function(e) {
    if (e.keyCode === 102) {
        toggleFullScreen();
    }else if(e.keyCode === 32){
        playVideo();
    }
}, false);

let mousedown = false;
skipButtons.forEach(button => button.addEventListener('click',skipVideo));
volume.addEventListener('mousemove',changeVolume);
volume.addEventListener('click',changeVolume);
progressBarBack.addEventListener('click',scrub);
progressBarBack.addEventListener('mousemove',(e)=>mousedown && scrub(e));
progressBarBack.addEventListener('mousedown',()=> mousedown = true);
progressBarBack.addEventListener('mouseup',()=> mousedown = false);


////////////
// video gallery func
function changeVideo(item) {
    item.addEventListener('click',(e)=>{
        let videoLocation = e.target.getAttribute('src');
        video.setAttribute('src' , videoLocation);
        video.width = video.videoWidth;
        playVideo();

    })
}
miniVideos.forEach(item=>{
    changeVideo(item);
});

// video gallery func