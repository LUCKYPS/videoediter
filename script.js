const container  =  document.querySelector(".container"),
mainVideo = container.querySelector("video"),
progressBar = container.querySelector(".progress-bar"),
volumeBtn =  container.querySelector(".volume i"),
volumeSlider =  container.querySelector(".left input"),
playPausebtn  =  container.querySelector(".play-pause i"),
skipForward =  container.querySelector(".skip-forward i"),
skipBackward  =  container.querySelector(".skip-backward i"),
speedBtn =  container.querySelector(".playback-speed span"),
speedOptions  =  container.querySelector(".speed-options"),
picInPicBtn =  container.querySelector(".pic-in-pic span"),
fullscreenBtn =  container.querySelector(".fullscreen i");


mainVideo.addEventListener("timeupdate" , e => {
   let { currentTime, duration } =  e.target;
   let percent = (currentTime / duration) * 100;
   progressBar.style.width = '&{percent}%';
});

volumeBtn.addEventListener("click", () => {
   if(!volumeBtn.classList.contains("fa-volume-high")) {
    mainVideo.volume = 0.5;
    volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
   } else{
      mainVideo.volume = 0.0;
      volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
   }
   volumeSlider.value = mainVideo.volume;
});
volumeSlider.addEventListener("input", e => {
   mainVideo.volume = e.target.value;
   if(e.target.value == 0 ){
      volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
   } else {
       volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
   }
});
speedBtn.addEventListener("click" , () => {
   speedOptions.classList.toggle("show");
});

speedOptions.querySelectorAll("li").forEach(option => {
  option.addEventListener("click" , () => {
    mainVideo.playbackRate = option.dataset.speed;
    speedOptions.querySelector(".active").classList.remove("active");
    option.classList.add("active");
  });
});

picInPicBtn.addEventListener("click", () => {
   mainVideo.requestPictureInPicture();
});
fullscreenBtn.addEventListener("click" , () => {
   container.classList.toggle("fullscreen");
   if(document.fullscreenElement) {
      fullscreenBtn.classList.replace("fa-compress" ,"fa-expand");
      return document.exitFullscreen;

   }
   fullscreenBtn.classList.replace("fa-expand" ,"fa-compress");
      container.requestFullscreen();
});

document.addEventListener("click" , e => {
  if(e.target.tagName !== "SPAN" || e.target.className !== "fa-solid fa-repeat") {
   speedOptions.classList.remove("show");
  }
});
skipForward.addEventListener("click" , () => {
   mainVideo.currentTime += 5;
 });
 
skipBackward.addEventListener("click" , () => {
  mainVideo.currentTime -= 5;
});




 playPausebtn.addEventListener("click" , () => {
    mainVideo.paused ? mainVideo.play() : mainVideo.pause();
 });
 mainVideo.addEventListener("play" , () => {
  playPausebtn.classList.replace("fa-play" , "fa-pause");
});
mainVideo.addEventListener("pause" , () => {
   playPausebtn.classList.replace("fa-pause" , "fa-play"); 
});
