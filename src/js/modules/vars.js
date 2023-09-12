const vars = {
  // ESSENTIAL ELEMENTS
  body: document.querySelector('body'),

  // SETTINGS block
  settingsBtn: document.querySelector('.settings__header'),
  settingsBlock: document.querySelector('.settings__block'),
  settingsWrapper: document.querySelector('.settings__wrapper'),
  radioLangList: document.querySelectorAll('.radio-lang'),
  radioBg: document.querySelectorAll('.radio-bg'),
  radioGithub: document.getElementById('github'),
  radioUnsplash: document.getElementById('unsplash'),
  radioFlickr: document.getElementById('flickr'),
  inputTag: document.getElementById('tag'),
  addTagBtn: document.getElementById('add-tag'),
  tagList: document.querySelector('.tag-list'),
  checkWeather: document.getElementById('check-weather'),
  checkTime: document.getElementById('check-time'),
  checkDate: document.getElementById('check-date'),
  checkGreetings: document.getElementById('check-greetings'),
  checkQuote: document.getElementById('check-quote'),
  checkTodo: document.getElementById('check-todo'),

  // WEATHER block
  weatherBlock: document.querySelector('.weather'),
  weatherIcon: document.querySelector('.weather-icon'),
  weatherDescription: document.querySelector('.weather-description'),
  temperature: document.querySelector('.temperature'),
  wind: document.querySelector('.wind'),
  humidity: document.querySelector('.humidity'),
  city: document.querySelector('.city'),
  weatherError: document.querySelector('.weather-error'),

  // TIME block
  timeBlock: document.querySelector('.time-block'),
  time: document.querySelector('.time'),
  date: document.querySelector('.date'),
  greetingContainer: document.querySelector('.greeting-container'),
  greeting: document.querySelector('.greeting'),
  name: document.querySelector('.name'),
  preloader: document.querySelector('#preloader'),

  // SLIDER block
  slideNext: document.querySelector('.slide-next'),
  slidePrev: document.querySelector('.slide-prev'),

  // QUOTE block
  quoteWrapper: document.querySelector('.quote__wrapper'),
  quote: document.querySelector('.quote'),
  author: document.querySelector('.author'),
  changeQuote: document.querySelector('.change-quote'),

  // TODO block
  todoWrapper: document.querySelector('.todo__wrapper')
};

export default vars;
