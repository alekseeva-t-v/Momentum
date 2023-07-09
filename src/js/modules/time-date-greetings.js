/**
 * Отображает на странице блок с датой, временем, текстом приветствия.
 *
 */
function showGreetingContainer() {
  const greeting = document.querySelector('.greeting');
  const name = document.querySelector('.name');
  const time = document.querySelector('.time');
  const date = document.querySelector('.date');

  name.addEventListener('change', () => {
    localStorage.setItem('name', name.value);
  });

  window.addEventListener('load', () => {
    if (localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
  });

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

export default showGreetingContainer;
