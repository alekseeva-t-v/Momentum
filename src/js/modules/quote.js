import randomIntInclusive from '../function/randomIntInclusive';
import hideShowBlock from '../function/hideShowBlock';
import vars from './vars';
import settings from './settings';

/**
 * Отображает на странице блок с цитатой.
 *
 */
function showQuote() {
  let hash = window.location.hash.substr(1);

  const {quoteWrapper, quote, author, changeQuote, checkQuote} = vars;

  if (!settings.blocks.includes('quote')) {
    checkQuote.checked = false;
    hideShowBlock(checkQuote, quoteWrapper, 'quote');
  }

  /**
   * Отвечает за получение данных о цитате и авторе и выводит их на страницу. Вызывается при обновлении страницы и нажатии на кнопку обновления
   *
   */
  async function getQuoteHandler(lang) {
    const URL = `./files/json/quote-${lang}.json`;

    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Something went wrong...');
      }
      const data = await response.json();
      const randomNum = randomIntInclusive(0, data.length - 1);
      quote.innerText = data[randomNum].text;
      author.innerText = data[randomNum].author;
    } catch {
      quoteWrapper.textContent = '';
    }
  }

  checkQuote.addEventListener('change', () => {
    hideShowBlock(checkQuote, quoteWrapper, 'quote');
  });

  window.addEventListener('load', getQuoteHandler(hash));

  changeQuote.addEventListener('click', () => getQuoteHandler(hash));
}

export default showQuote;
