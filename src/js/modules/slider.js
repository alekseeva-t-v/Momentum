import randomIntInclusive from '../function/randomIntInclusive';
import timeOfDay from '../function/timeOfDay';
import updateLocal from '../function/updateLocal';
import vars from './vars';
import settings from './settings';

function showSlider() {
  const {
    body,
    slideNext,
    slidePrev,
    radioBg,
    radioGithub,
    radioUnsplash,
    radioFlickr,
    inputTag,
    addTagBtn,
    tagList,
  } = vars;

  let randomNum = 0;
  let photoArrLength = 0;

  if (settings.photoSource === 'github') {
    radioGithub.checked = true;
  }

  if (settings.photoSource === 'unsplash') {
    radioUnsplash.checked = true;
  }

  if (settings.photoSource === 'flickr') {
    radioFlickr.checked = true;
  }

  if (settings.tags.length) {
    createTagList();
    createTagButtonAction();
  }

  /**
   * Возвращает число в заданном диапазоне, преобразованное в строку с добавлением 0 в начале, если чесло однозначное.
   *
   * @return {string} преобразованное в необходимый формат число.
   */
  function getRandomNum() {
    return String(randomIntInclusive(1, 20)).padStart(2, '0');
  }

  /**
   * Загружает изображение и отображает на странице только после загрузки.
   * @param {string} src адрес изображения.
   *
   */
  function loadImageBg(src) {
    const img = new Image();
    img.src = src;
    img.addEventListener('load', () => {
      body.style.backgroundImage = `url(${img.src})`;
    });
  }

  /**
   * Получает текущее время и преобразует его во время суток
   * @return {string} время суток.
   *
   */
  function updateTimeOfDay() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    return timeOfDay(hours);
  }

  /**
   * Запускает функцию загрузки изображения в зависимости от параметра settings.photoSource
   *
   */
  function setBg() {
    let tag = '';
    const timeOfDay = updateTimeOfDay();

    if (settings.tags.length) {
      const index = randomIntInclusive(0, settings.tags.length - 1);
      tag = settings.tags[index];
    }

    if (settings.photoSource === 'flickr') {
      settings.tags.length
        ? setBgLinkToImageFlickr(tag, randomIntInclusive(0, photoArrLength - 1))
        : setBgLinkToImageFlickr(
            timeOfDay,
            randomIntInclusive(0, photoArrLength - 1)
          );

      inputTag.disabled = false;
    } else if (settings.photoSource === 'unsplash') {
      settings.tags.length
        ? setBgLinkToImageUnsplash(tag)
        : setBgLinkToImageUnsplash(timeOfDay);

      inputTag.disabled = false;
    } else {
      setBgGit(getRandomNum());

      inputTag.disabled = true;
    }
  }

  /**
   * Обновляет фон страницы в соответствии с заданными параметрами.
   *
   * @param {string} bgNum преобразованный в необходимый строковый формат номер изображения.
   */
  function setBgGit(bgNum) {
    const timeOfDay = updateTimeOfDay();
    randomNum = bgNum;
    loadImageBg(`./img/${timeOfDay}/${bgNum}.jpg`);
    settings.tags = [];
    updateLocal();
    tagList.textContent = '';
  }

  /**
   * Обновляет фон страницы в соответствии с заданными параметрами.
   *
   * @param {string} tag Тег, необходимый для получения изображения.
   */
  async function setBgLinkToImageUnsplash(tag) {
    const url = `https://api.unsplash.com/photos/random?query=${tag}&client_id=S_pba8IuJJN66g2ksU6QyPjM-6gDhbhsbozGYDpdlag`;
    const res = await fetch(url);
    const data = await res.json();
    loadImageBg(`${data.urls.regular}`);
  }

  /**
   * Обновляет фон страницы в соответствии с заданными параметрами.
   *
   * @param {string} tag Тег, необходимый для получения изображения.
   * @param {number} bgNum Номер изображения в массиве изображений.
   */
  async function setBgLinkToImageFlickr(tag, bgNum) {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=4ad25702fc121fbc517f23809559c8b4&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    photoArrLength = data.photos.photo.length;
    loadImageBg(`${data.photos.photo[bgNum].url_l}`);
  }

  setBg();

  /**
   * Обновляет номер изображения, вызывается при нажатии на кнопку вперед.
   *
   * @return {string} преобразованный в необходимый строковый формат номер изображения.
   */
  function getSlideNext() {
    if (randomNum < 20) {
      return String(++randomNum).padStart(2, '0');
    } else {
      return String((randomNum = 1)).padStart(2, '0');
    }
  }

  /**
   * Обновляет номер изображения, вызывается при нажатии на кнопку назад.
   *
   * @return {string} преобразованный в необходимый строковый формат номер изображения.
   */
  function getSlidePrev() {
    if (randomNum > 1) {
      return String(--randomNum).padStart(2, '0');
    } else {
      return String((randomNum = 20)).padStart(2, '0');
    }
  }

  /**
   * Формирует HTML элемент тега.
   */
  function createTagElem(text) {
    const newTagButton = document.createElement('button');
    newTagButton.className = 'tag-item';
    newTagButton.textContent = text;
    tagList.append(newTagButton);
  }

  /**
   * Формирует HTML блок со списком тегов.
   */
  function createTagList() {
    settings.tags.forEach((elem) => {
      createTagElem(elem);
    });
  }

  /**
   * Определяет событие для каждой кнопки тега.
   */
  function createTagButtonAction() {
    const tagItemList = document.querySelectorAll('.tag-item');
    tagItemList.forEach((tagItem) => {
      tagItem.addEventListener('click', (event) => {
        event.preventDefault();
        const updatedTagBgArr = settings.tags.filter((value) => {
          return value !== tagItem.textContent;
        });

        settings.tags = updatedTagBgArr;
        tagList.textContent = '';
        updateLocal();
        createTagList();
        createTagButtonAction();
        setBg();
      });
    });
  }

  /**
   * Добавляет тег в список, вызывает функции формирующие HTML разметку и обновляющие локальное хранилище.
   */
  function addTag() {
    if (
      inputTag.value.trim() &&
      !settings.tags.includes(inputTag.value.trim())
    ) {
      settings.tags.push(inputTag.value.trim());
      createTagElem(inputTag.value.trim());
      settings.tags.push(inputTag.value.trim());
      settings.tags = [...new Set(settings.tags)];
      inputTag.value = '';

      createTagButtonAction();
      setBg();
    } else {
      inputTag.value = '';
    }
  }

  slideNext.addEventListener('click', function () {
    if (settings.photoSource === 'github') {
      setBgGit(getSlideNext());
    } else {
      setBg();
    }
  });

  slidePrev.addEventListener('click', function () {
    if (settings.photoSource === 'github') {
      setBgGit(getSlidePrev());
    } else {
      setBg();
    }
  });

  radioBg.forEach((radioElem) => {
    radioElem.addEventListener('change', () => {
      settings.photoSource = radioElem.id;
      updateLocal();
      setBg();
    });
  });

  addTagBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addTag();
    updateLocal();
  });

  inputTag.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      addTag();
      updateLocal();
    }
  });
}

export default showSlider;
