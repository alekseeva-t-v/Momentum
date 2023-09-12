import timeOfDay from '../function/timeOfDay';
import { timeOfDayRu } from '../function/timeOfDay';
import vars from './vars';
import settings from './settings';
import hideShowBlock from '../function/hideShowBlock';

/**
 * Отображает на странице блок с датой, временем, текстом приветствия.
 *
 */
function showGreetingContainer() {
  const {
    timeBlock,
    time,
    date,
    greetingContainer,
    greeting,
    name,
    preloader,
    checkTime,
    checkDate,
    checkGreetings
  } = vars;

  let hash = window.location.hash.substr(1);

  /**
   * Обновляет данные имени в localStorage. Вызывается в случае, если пользователь ввел новое имя.
   *
   */
  function changeNameHandler() {
    if (name.value.trim().length) {
      localStorage.setItem('name', name.value);
    }
  }

  /**
   * Извлекает из localStorage имя, если оно там есть. Вызывается при загрузке страницы
   *
   */
  function getNameHandler() {
    if (localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
  }

  /**
   * Обновляет на странице дату, время, текст приветствия.
   *
   */
  function updateGreetingContainer(lang) {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const currentTime = currentDate.toLocaleTimeString();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    date.textContent =
      lang === 'en'
        ? new Date().toLocaleDateString('en-US', options)
        : new Date().toLocaleDateString('ru', options);
    time.textContent = currentTime;
    greeting.textContent =
      lang === 'en' ? `Good ${timeOfDay(hours)},` : `${timeOfDayRu(hours)},`;
    name.placeholder = lang === 'en' ? 'Your name' : 'Ваше имя';
  }

  if (!settings.blocks.includes('time')) {
    checkTime.checked = false;
    hideShowBlock(checkTime, time, 'time');
  }

  if (!settings.blocks.includes('date')) {
    checkDate.checked = false;
    hideShowBlock(checkDate, date, 'date');
  }

  if (!settings.blocks.includes('greeting')) {
    checkGreetings.checked = false;
    hideShowBlock(checkGreetings, greetingContainer, 'greeting');
  }

  name.addEventListener('change', changeNameHandler);

  window.addEventListener('load', getNameHandler);

  setInterval(updateGreetingContainer(hash), 1000);

  setTimeout(function () {
    if (preloader) {
      preloader.remove();
    }
    timeBlock.style.display = 'flex';
  }, 1000);

  checkTime.addEventListener('change', () => {
    hideShowBlock(checkTime, time, 'time');
  });

  checkDate.addEventListener('change', () => {
    hideShowBlock(checkDate, date, 'date');
  });

  checkGreetings.addEventListener('change', () => {
    hideShowBlock(checkGreetings, greetingContainer, 'greeting');
  });
}

export default showGreetingContainer;
