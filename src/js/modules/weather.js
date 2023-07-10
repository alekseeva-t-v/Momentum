function showWeather() {
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');
  const wind = document.querySelector('.wind');
  const humidity = document.querySelector('.humidity');
  const city = document.querySelector('.city');
  const weatherError = document.querySelector('.weather-error');

  /**
   * Получает данные о погоде с удаленного сервера. Выводит их на экран в случае успеха и информацию об ошибке, в случае ошибки
   *
   */
  async function getWeather() {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=34a8094155f7b4c99e972c8d19d77c1a&units=metric`;

    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(
          'Something went wrong. Check if the query you entered is correct...'
        );
      }
      const data = await response.json();

      if (response.ok) {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
        humidity.textContent = `Humidity: ${data.main.humidity} %`;
        weatherError.textContent = '';
      }
    } catch (error) {
      weatherIcon.className = 'weather-icon owf';
      weatherError.textContent = error.message;
      temperature.textContent = '';
      weatherDescription.textContent = '';
      wind.textContent = '';
      humidity.textContent = '';
    }
  }

  /**
   * Вызывает повтроно функцию отображения погоды. Обновляет данные города в localStorage (если такой город есть). Вызывается в случае, если пользователь ввел новый город.
   *
   */
  function changeCityHandler() {
    getWeather();
    console.log(weatherError.textContent)
    if (weatherError.textContent === '') {
      localStorage.setItem('city', city.value);
    }
  }

  /**
   * Извлекает из localStorage название города, если он там есть. Вызывается при загрузке страницы
   *
   */
  function getCityHandler() {
    if (localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
    }
  }

  getWeather();

  city.addEventListener('change', changeCityHandler);

  window.addEventListener('load', getCityHandler);
}

export default showWeather;
