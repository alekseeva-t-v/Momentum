import randomIntInclusive from "../function/randomIntInclusive";
import timeOfDay from "../function/timeOfDay";

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

export default showSlider;
