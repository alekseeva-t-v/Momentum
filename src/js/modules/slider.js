function showSlider() {
  const body = document.querySelector('body');
  const slideNext = document.querySelector('.slide-next');
  const slidePrev = document.querySelector('.slide-prev');

  let randomNum = 0;

  /**
   * Возвращает число в заданном диапазоне, преобразованное в строку с добавлением 0 в начале, если чесло однозначное.
   *
   * @return {string} преобразованное в необходимый формат число.
   */
  function getRandomNum() {
    return String(randomIntInclusive(1, 20)).padStart(2, '0');
  }

  /**
   * Обновляет фон страницы в соответствии с заданными параметрами.
   *
   * @param {function} timeOfDay функция определяющая время суток.
   * @param {string} bgNum преобразованный в необходимый строковый формат номер изображения.
   */
  function setBg(timeOfDay, bgNum) {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const img = new Image();
    randomNum = bgNum;
    img.src = `./img/${timeOfDay(hours)}/${bgNum}.jpg`;
    img.addEventListener('load', () => {
      body.style.backgroundImage = `url(${img.src})`;
    });
  }

  setBg(timeOfDay, getRandomNum());

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

  slideNext.addEventListener('click', function () {
    setBg(timeOfDay, getSlideNext());
  });

  slidePrev.addEventListener('click', function () {
    setBg(timeOfDay, getSlidePrev());
  });
}

/**
 * Возвращает случайное число из заданного диапазона.
 *
 * @param {number} min Минимальное число диапазона (включительно).
 * @param {number} max Максимальное число диапазона (включительно).
 * @return {number} случайное число из диапазона.
 */
const randomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Возвращает название времени суток, в зависимости от определенного часа.
 *
 * @param {number} hours Числовое значение часа.
 * @return {string} время суток.
 */
export const timeOfDay = (hours) => {
  if (hours >= 6 && hours < 12) {
    return 'morning';
  } else if (hours >= 12 && hours < 17) {
    return 'afternoon';
  } else if (hours >= 17 && hours < 24) {
    return 'evening';
  } else {
    return 'night';
  }
};

export default showSlider;
