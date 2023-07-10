import allMusic from './music-list';

function showPlayer() {
  const playList = allMusic;
  const play = document.querySelector('.play');
  const playPrev = document.querySelector('.play-prev');
  const playNext = document.querySelector('.play-next');
  const playListContainer = document.querySelector('.play-list');

  let isPlay = false;
  let playNum = 0;

  const audio = new Audio();

  function playAudio() {
    audio.src = `./files/music/${playList[playNum].src}.mp3`;
    audio.currentTime = 0;
    console.log(audio.src);
    audio.play();
    isPlay = true;
    findItemActive();
    toggleBtn();
  }

  function pauseAudio() {
    audio.pause();
    isPlay = false;

    cleanStylesPlayList();
    toggleBtn();
  }

  function toggleBtn() {
    if (isPlay) {
      play.classList.add('pause');
    } else {
      play.classList.remove('pause');
    }
  }

  function playNextHandler() {
    playNum = playNum < playList.length - 1 ? playNum + 1 : 0;

    playAudio();
  }

  function playPrevHandler() {
    playNum = playNum > 0 ? playNum - 1 : playList.length - 1;

    playAudio();
  }

  function controlAudioHandler() {
    if (!isPlay) {
      playAudio();
    } else {
      pauseAudio();
    }
  }

  function createPlayList() {
    playList.forEach((element, index) => {
      const item = document.createElement('li');
      item.classList.add('play-item');
      item.dataset.id = index;
      item.innerHTML = `<button class="play-min player-icon player-icon-min"></button>
      <span>${element.artist} - ${element.songName}</span>`;
      playListContainer.append(item);
    });

    const buttonList = Array.from(document.querySelectorAll('.play-min'));
    buttonList.forEach((button) => {
      button.addEventListener('click', () => {
        if (!isPlay) {
          const item = button.closest('.play-item');
          playNum = Number(item.dataset.id);
          playAudio();
        } else {
          pauseAudio();
        }
      });
    });
  }

  function findItemActive() {
    const itemList = cleanStylesPlayList();

    const searchItem = itemList.find((elem) => {
      return Number(elem.dataset.id) === playNum;
    });

    const searchItemBtn = searchItem.querySelector('.play-min');

    searchItem.classList.add('item-active');

    searchItemBtn.classList.add('pause');
  }

  function cleanStylesPlayList() {
    const itemList = Array.from(document.querySelectorAll('.play-item'));
    const buttonList = Array.from(document.querySelectorAll('.play-min'));

    itemList.forEach((elem) => {
      elem.classList.remove('item-active');
    });

    buttonList.forEach((button) => {
      button.classList.remove('pause');
    });

    return itemList;
  }

  createPlayList();

  play.addEventListener('click', controlAudioHandler);
  playNext.addEventListener('click', playNextHandler);
  playPrev.addEventListener('click', playPrevHandler);
  audio.addEventListener('ended', playNextHandler)
}

export default showPlayer;
