import timeOfDay from "../function/timeOfDay";

/**
 * Отображает на странице блок с датой, временем, текстом приветствия.
 *
 */
function showGreetingContainer() {
  const greeting = document.querySelector('.greeting');
  const name = document.querySelector('.name');
  const time = document.querySelector('.time');
  const date = document.querySelector('.date');

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

  name.addEventListener('change', changeNameHandler);

  window.addEventListener('load', getNameHandler);

  /**
   * Обновляет на странице дату, время, текст приветствия.
   *
   */
  function updateGreetingContainer() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const currentTime = currentDate.toLocaleTimeString();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    date.textContent = new Date().toLocaleDateString('en-US', options);
    time.textContent = currentTime;
    greeting.textContent = `Good ${timeOfDay(hours)},`;
  }

  setInterval(updateGreetingContainer, 1000);
}

export default showGreetingContainer;
