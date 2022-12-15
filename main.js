window.onload = () => {
  const player = document.querySelector(".player");

  const video = document.getElementById("video");
  const playButton = document.getElementById("play-pause-button");
  const volumeButton = document.getElementById("volume-icon");

  const volumeRange = document.querySelector(".volume-range");
  const volumeBar = document.querySelector(".volume-bar");

  const playerSpeed = document.querySelector(".player-speed");
  
  const timeDuration = document.querySelector(".time-duration");
  const timeElapsed = document.querySelector(".time-elapsed");
  
  const progresRange = document.querySelector(".progress-range");
  const progresBar = document.querySelector(".progress-bar");
  
  const fullScreenButton = document.querySelector("#fullscreen");
  
  const videoInput = document.querySelector(".videoInput");
  const findButton = document.querySelector(".findButton");


  const muteVideo = () => {
    video.volume = 0;
    volumeButton.setAttribute("title", "Unmute");
    volumeButton.setAttribute("class", "fas fa-volume-mute");
    volumeBar.style.width = `0%`;
  };
  const unMuteVideo = () => {
    video.volume = 1;
    volumeButton.setAttribute("title", "Mute");
    volumeButton.setAttribute("class", "fas fa-volume-up");
    volumeBar.style.width = `100%`;
  };
  const toggleMute = () => {
    if (video.volume === 0) {
      unMuteVideo();
    } else {
      muteVideo();
    }
  };
  const playVideo = () => {
    video.play();
    playButton.setAttribute("title", "Pause");
    playButton.classList.replace("fa-play", "fa-pause");
  };
  const pauseVideo = () => {
    video.pause();
    playButton.setAttribute("title", "Play");
    playButton.classList.replace("fa-pause", "fa-play");
  };
  const toggleVideo = () => {
    if (!video.paused) {
      pauseVideo();
    } else {
      playVideo();
    }
  };
  const updateProgressLine = () => {
    const progressLineLevel = (video.currentTime / video.duration) * 100;
    progresBar.style.width = `${progressLineLevel}%`;
  };
  const updateProgress = () => {
    const currentSeconds = Math.floor(video.currentTime % 60);
    const currentMinutes = Math.floor(video.currentTime / 60);

    const currentTime =
      currentMinutes +
      ":" +
      (currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds);

    timeElapsed.textContent = currentTime;

    const durationSeconds = Math.floor(video.duration % 60);
    const durationMinutes = Math.floor(video.duration / 60);

    const durationTime =
      durationMinutes +
      ":" +
      (durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds);

    timeDuration.textContent = durationTime;

    updateProgressLine();

    // if video ends
    if (video.currentTime === video.duration) {
      pauseVideo();
    }
  };
  const updateVolume = (e) => {
    const progressLevel = (e.offsetX / volumeRange.offsetWidth) * 100;
    volumeBar.style.width = `${progressLevel}%`;
    if (e.offsetX === 0) {
      muteVideo();
    } else if (e.offsetX > 0 && e.offsetX <= volumeRange.offsetWidth / 2) {
      volumeButton.setAttribute("class", "fas fa-volume-down");
    } else {
      volumeButton.setAttribute("class", "fas fa-volume-up");
    }
    video.volume = `0.${Math.floor(progressLevel)}`;
  };

  // const updateProggresByClick = (e) => {
  //   const progressLevel = e.offsetX / progresRange.offsetWidth;

  //   if (isPlaying) {
  //     video.currentTime = `${video.duration * progressLevel}`;
  //     console.log(video.currentTime);
  //   }
  //   if (!isPlaying) {
  //     video.currentTime = `${video.duration * progressLevel}`;
  //     updateProgressTime();
  //   }
  // };
  // progresRange.addEventListener("click", updateProggresByClick);
  let isFullScreen = false;
  const openFullScreen = () => {
    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.mozRequestFullScreen) {
      /* Firefox */
      player.mozRequestFullScreen();
    } else if (player.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      player.webkitRequestFullscreen();
    } else if (player.msRequestFullscreen) {
      /* Internet Explorer/Edge */
      player.msRequestFullscreen();
    }
    video.classList.add("video-fullscreen"); 
  };
  const closeFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* Internet Explorer/Edge */
      document.msExitFullscreen();
    }
    video.classList.remove("video-fullscreen");
  };
  const toggleFullScreen = () =>{
    if(isFullScreen){
      closeFullScreen();
      fullScreenButton.classList.replace("fa-compress","fa-expand");
      fullScreenButton.setAttribute("title", "Expand");
    }
    if(!isFullScreen){
      openFullScreen();
      fullScreenButton.classList.replace("fa-expand", "fa-compress");
      fullScreenButton.setAttribute("title", "Compress");
    }
    isFullScreen = !isFullScreen;
  }

  fullScreenButton.addEventListener("click", toggleFullScreen);
  playButton.addEventListener("click", toggleVideo);
  volumeButton.addEventListener("click", toggleMute);
  volumeRange.addEventListener("click", updateVolume);
  playerSpeed.addEventListener("click", (e) => {
    const playBackSpeed = e.target.value;
    video.playbackRate = playBackSpeed;
  });
  video.addEventListener("click", toggleVideo);
  video.addEventListener("timeupdate", updateProgress);
};
