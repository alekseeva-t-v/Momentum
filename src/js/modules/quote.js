import randomIntInclusive from '../function/randomIntInclusive';

/**
 * Отображает на странице блок с цитатой.
 *
 */
function showQuote() {
  const quoteWrapper = document.querySelector('.quote-wrapper');
  const quote = document.querySelector('.quote');
  const author = document.querySelector('.author');
  const changeQuote = document.querySelector('.change-quote');

  /**
   * Отвечает за получение данных о цитате и авторе и выводит их на страницу. Вызывается при обновлении страницы и нажатии на кнопку обновления
   *
   */
  async function getQuoteHandler() {
    const URL = `./../files/json/quote-en.json`;
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

  window.addEventListener('load', getQuoteHandler);

  changeQuote.addEventListener('click', getQuoteHandler);
}

export default showQuote;
