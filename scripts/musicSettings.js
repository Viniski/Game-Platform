const audio = document.getElementById("audio");
var playPromise = audio.play();

if (playPromise !== undefined) {
    playPromise.then(_ => {
      // Automatic playback started!
      // Show playing UI.
    })
    .catch(error => {
      // Auto-play was prevented
      // Show paused UI.
    });
  }

audio.addEventListener('ended', function() {
    audio.currentTime = 0;
    audio.play();
}
);

const playButton = document.getElementById("play");
let musicStatus = false;

const handleButton = () => {
    if(musicStatus === true){
        audio.pause();
        playButton.innerHTML = "ON";
        musicStatus = !musicStatus;
    } else {
        audio.play();
        playButton.innerHTML = "OFF";
        musicStatus = !musicStatus;
    }
}

playButton.addEventListener("click", handleButton);



