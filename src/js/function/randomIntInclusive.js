/**
 * Возвращает случайное число из заданного диапазона.
 *
 * @param {number} min Минимальное число диапазона (включительно).
 * @param {number} max Максимальное число диапазона (включительно).
 * @return {number} случайное число из диапазона.
 */
const randomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default randomIntInclusive;
