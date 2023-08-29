import allMusic from './music-list';

/**
 * Отображает на странице блок с аудиоплеером.
 *
 */
function showPlayer() {
  const playList = allMusic;
  const play = document.querySelector('.play');
  const playPrev = document.querySelector('.play-prev');
  const playNext = document.querySelector('.play-next');
  const playListContainer = document.querySelector('.play-list');

  let isPlay = false;
  let playNum = 0;

  const audio = new Audio();

  /**
   * Определяет ссылку на воспроизводимую композицию, указав, что воспроизведение необходимо начать с начала. Включает воспроизведение мелодии, изменив при этом значение флага isPlay. Дополнительно вызывает функции findItemActive (поиск активного элемента плэй листа) и toggleBtn (Смена отображения значка на кнопке)
   *
   */
  function playAudio() {
    audio.src = `./files/music/${playList[playNum].src}.mp3`;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;

    findItemActive();
    toggleBtn();
  }

  /**
   * Останавливает воспроизведение мелодии, изменив при этом значение флага isPlay. Дополнительно вызывает функции cleanStylesPlayList (очистка стилей плэй листа) и toggleBtn (Смена отображения значка на кнопке)
   *
   */
  function pauseAudio() {
    audio.pause();
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
      play.classList.add('pause');
    } else {
      play.classList.remove('pause');
    }
  }

  /**
   * Начинает воспроизведение следующей в плей листе мелодии, вызывается  при нажатии на кнопку Play-Next
   *
   */
  function playNextHandler() {
    playNum = playNum < playList.length - 1 ? playNum + 1 : 0;

    playAudio();
  }

  /**
   * Начинает воспроизведение предыдущей в плей листе мелодии, вызывается  при нажатии на кнопку Play-Prev
   *
   */
  function playPrevHandler() {
    playNum = playNum > 0 ? playNum - 1 : playList.length - 1;

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

  /**
   * Находит в плей листе мелодию, которая сейчас играет и меняет ее отображение
   *
   */
  function findItemActive() {
    const itemList = cleanStylesPlayList();

    const searchItem = itemList.find((elem) => {
      return Number(elem.dataset.id) === playNum;
    });

    const searchItemBtn = searchItem.querySelector('.play-min');

    searchItem.classList.add('item-active');

    searchItemBtn.classList.add('pause');
  }

  /**
   * Удаляет активные стили со всех элементов плей листа
   *
   * @return {object} массив элементов плей листа.
   */
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
  audio.addEventListener('ended', playNextHandler);
}

export default showPlayer;
