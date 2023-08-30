import allMusic from './music-list';

/**
 * Отображает на странице блок с аудиоплеером.
 *
 */
function showPlayer() {
  const playList = allMusic;

  const player = document.querySelector('.player')
  const playBtn = document.querySelector('.player__controls-play');
  const playPrevBtn = document.querySelector('.player__controls-play-prev');
  const playNextBtn = document.querySelector('.player__controls-play-next');
  const playListBtn = document.querySelector('.player__controls-play-list');
  const soundOffBtn = document.querySelector('.player__controls-sound-off');

  const progressBar = document.querySelector('.player__progress-bar');
  const progressArea = document.querySelector('.player__progress-area');

  const musicCurrentTime = document.querySelector('.player__progress-current');
  const musicDuration = document.querySelector('.player__progress-duration');
  const artist = document.querySelector('.player__artist');
  const songName = document.querySelector('.player__song-name')
  const playListContainer = document.querySelector('.player__play-list');

  let isPlay = false;
  let playNum = 0;
  let currentValue = 0;

  const audio = new Audio();

  /**
   * Запускает воспроизведение композиции (1) Определяет ссылку на воспроизводимую композици. (2) Указывает, что воспроизведение нужно начать со значения определенного currentValue (изначально 0 - начало композиции). (3) Включает воспроизведение мелодии. (4) Изменяет значение флага isPlay. (5) После загрузки композиции выводит время звучания (6) Дополнительно вызывает функции findItemActive (поиск активного элемента плэй листа) и toggleBtn (Смена отображения значка на кнопке)
   *
   */
  function playAudio() {
    audio.src = `./files/music/${playList[playNum].src}.mp3`;
    audio.currentTime = currentValue;
    audio.play();
    isPlay = true;
    audio.addEventListener('loadeddata', () => {
      let audioDuration = audio.duration;
      let totalMin = Math.floor(audioDuration / 60);
      let totalSec = Math.floor(audioDuration % 60);
      if (totalSec < 10) {
        totalSec = `0${totalSec}`;
      }
      musicDuration.innerText = `${totalMin}:${totalSec}`;
      artist.innerText = playList[playNum]['artist'];
      songName.innerText = playList[playNum]['songName'];
    });

    findItemActive();
    toggleBtn();
  }

  /**
   * Останавливает воспроизведение композиции (1) Отключает воспроизведение мелодии. (2) Сохраняет текущее время звучания в переменной currentValue  (3) Изменяет значение флага isPlay. (4) Дополнительно вызывает функции cleanStylesPlayList (очистка стилей плэй листа) и toggleBtn (Смена отображения значка на кнопке)
   *
   */
  function pauseAudio() {
    audio.pause();
    currentValue = audio.currentTime;
    isPlay = false;

    cleanStylesPlayList();
    toggleBtn();
  }

  /**
   * Меняет значек на кнопке в зависимости от того играет мелодия или нет
   *
   */
  function toggleBtn() {
    if (isPlay) {
      playBtn.classList.add('player__controls-pause');
    } else {
      playBtn.classList.remove('player__controls-pause');
    }
  }

  /**
   * Начинает воспроизведение следующей в плей листе мелодии, вызывается  при нажатии на кнопку Play-Next. (1) Определяет номер мелодии. (2) Обнуляет значение currentValue (3) Вызывает функцию playAudio() (Запуск воспроизведения)
   *
   */
  function playNextHandler() {
    playNum = playNum < playList.length - 1 ? playNum + 1 : 0;
    currentValue = 0;
    playAudio();
  }

  /**
   * Начинает воспроизведение предыдущей в плей листе мелодии, вызывается  при нажатии на кнопку Play-Prev (1) Определяет номер мелодии. (2) Обнуляет значение currentValue (3) Вызывает функцию playAudio() (Запуск воспроизведения)
   *
   */
  function playPrevHandler() {
    playNum = playNum > 0 ? playNum - 1 : playList.length - 1;
    currentValue = 0;
    playAudio();
  }

  /**
   * Начинает или останавливает воспроизведение мелодии, вызывается  при нажатии основной кнопки плеера
   *
   */
  function controlAudioHandler() {
    if (!isPlay) {
      playAudio();
    } else {
      pauseAudio();
    }
  }

  /**
   * Создает и выводит на экран плей лист, опираясь на массив со списком мелодий, формирует для каждой мелодии кнопку и вешает на нее событие нажатия
   *
   */
  function createPlayList() {
    playList.forEach((element, index) => {
      const item = document.createElement('li');
      item.classList.add('player__play-item');
      item.dataset.id = index;
      item.innerHTML = `<button class="player__controls-icon player__controls-play--min player__controls-icon--min"></button>
      <span>${element.artist} - ${element.songName}</span>`;
      playListContainer.append(item);
    });

    const buttonList = Array.from(
      document.querySelectorAll('.player__controls-play--min')
    );

    buttonList.forEach((button) => {
      button.addEventListener('click', () => {
        const item = button.closest('.player__play-item');
        if (!isPlay) {
          playNum = Number(item.dataset.id);
          playAudio();
        } else if (isPlay && Number(item.dataset.id) === playNum) {
          pauseAudio();
        } else {
          pauseAudio();
          playNum = Number(item.dataset.id);
          currentValue = 0;
          playAudio();
        }
      });
    });
  }

  /**
   * Находит в плей листе мелодию, которая сейчас играет и меняет ее отображение
   *
   */
  function findItemActive() {
    const itemList = cleanStylesPlayList();

    const searchItem = itemList.find((elem) => {
      return Number(elem.dataset.id) === playNum;
    });

    const searchItemBtn = searchItem.querySelector(
      '.player__controls-play--min'
    );

    searchItem.classList.add('player__play-item--active');

    searchItemBtn.classList.add('player__controls-pause--min');
  }

  /**
   * Удаляет активные стили со всех элементов плей листа
   *
   * @return {object} массив элементов плей листа.
   */
  function cleanStylesPlayList() {
    const itemList = Array.from(
      document.querySelectorAll('.player__play-item')
    );
    const buttonList = Array.from(
      document.querySelectorAll('.player__controls-play--min')
    );

    itemList.forEach((elem) => {
      elem.classList.remove('player__play-item--active');
    });

    buttonList.forEach((button) => {
      button.classList.remove('player__controls-pause--min');
    });

    return itemList;
  }

  createPlayList();

  audio.addEventListener('timeupdate', (event) => {
    const currentTime = event.target.currentTime;
    const duration = event.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
      currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
  });

  playBtn.addEventListener('click', controlAudioHandler);
  playNextBtn.addEventListener('click', playNextHandler);
  playPrevBtn.addEventListener('click', playPrevHandler);
  audio.addEventListener('ended', playNextHandler);
  playListBtn.addEventListener('click', (event) => {
    playListContainer.classList.toggle('player__play-list--active');
  });

  player.addEventListener('click', (event) => {
    event._isClickWithInPlayList = true;
  })

  document.body.addEventListener('click', (event) => {
    if (event._isClickWithInPlayList) return;
    playListContainer.classList.remove('player__play-list--active');
  });

  progressArea.addEventListener('click', (event) => {
    let progressWidthVal = progressArea.clientWidth;
    let clickedOffSetX = event.offsetX;
    let songDuration = audio.duration;

    currentValue = (clickedOffSetX / progressWidthVal) * songDuration;

    playAudio();
  });

  soundOffBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    soundOffBtn.classList.toggle('player__controls-sound-on');
    soundOffBtn.classList.toggle('player__controls-sound-off');
  });
}

export default showPlayer;
