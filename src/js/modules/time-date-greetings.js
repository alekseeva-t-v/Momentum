function showGreetingContainer() {
  const greeting = document.querySelector('.greeting');
  const name = document.querySelector('.name');
  const time = document.querySelector('.time');
  const date = document.querySelector('.date');

  /**
   * Возвращает название времени суток, в зависимости от определенного часа.
   *
   * @param {number} hours Числовое значение часа.
   * @return {string} время суток.
   */
  const timeOfDay = (hours) => {
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

	name.addEventListener('blur', () => {
		localStorage.setItem('name', name.value);
	})

	window.addEventListener('load', () => {
		if (localStorage.getItem('name')) {
			name.value = localStorage.getItem('name');
		}
	})

  /**
   * Отображает на странице дату, время и текст приветствия.
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
