import { langArr } from './modules/lang';
import settings from './modules/settings';
import vars from './modules/vars';
import updateLocal from './function/updateLocal';
import showGreetingContainer from './modules/time-date-greetings';
import showSlider from './modules/slider';
import showWeather from './modules/weather';
import showQuote from './modules/quote';
import showPlayer from './modules/player';
import showTodo from './modules/todo';

location.href = `${window.location.pathname}#${settings.language}`;
const langList = langArr;

const {
  body,
  settingsBtn,
  settingsBlock,
  settingsWrapper,
  radioLangList,
  inputTag,
} = vars;

/**
 * Меняет адресную строку, ориентируясь на язык в настройках
 *
 */
function changeURLLanguage() {
  location.href = `${window.location.pathname}#${settings.language}`;
}

/**
 * Использует язык, указанный в хэше. Производит перевод элементов страницы, помеченных классом `.lng-${...}`, а также меняет текст плэйсхолдера
 *
 */
function changeLanguagePage() {
  for (let key in langList) {
    let elems = document.querySelectorAll(`.lng-${key}`);
    elems.forEach((elem) => {
      if (elem) {
        elem.innerHTML = langList[key][settings.language];
      }
    });
  }

  inputTag.placeholder =
    settings.language === 'en' ? 'Enter tag' : 'Введите тег';
}

changeURLLanguage();
changeLanguagePage();
showGreetingContainer();
showSlider();
showWeather();
showQuote();
showPlayer();
showTodo();

radioLangList.forEach((radioElem) => {
  if (radioElem.id === settings.language) {
    radioElem.checked = true;
  }
});

radioLangList.forEach((radioElem) => {
  radioElem.addEventListener('click', () => {
    settings.language = radioElem.id;
    changeURLLanguage();
    updateLocal();
    showGreetingContainer();
    showWeather();
    showQuote();
    changeLanguagePage();
    showTodo();
  });
});

settingsBtn.addEventListener('click', () => {
  settingsBlock.classList.toggle('block--active');
});

settingsWrapper.addEventListener('click', (event) => {
  event._isClickWithInSettingsBlock = true;
});

body.addEventListener('click', (event) => {
  if (event._isClickWithInSettingsBlock) return;
  settingsBlock.classList.remove('block--active');
});
