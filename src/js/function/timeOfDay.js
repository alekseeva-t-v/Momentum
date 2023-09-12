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

export const timeOfDayRu = (hours) => {
  if (hours >= 6 && hours < 12) {
    return 'Доброе утро';
  } else if (hours >= 12 && hours < 17) {
    return 'Добрый день';
  } else if (hours >= 17 && hours < 24) {
    return 'Добрый вечер';
  } else {
    return 'Доброй ночи';
  }
};

export default timeOfDay;
