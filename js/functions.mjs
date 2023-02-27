import {DESCRIPTIONS, MESSAGES, generateCommentId, generatePhotoId, generatePhotoUrlId, NAME} from './const.mjs';

//Функция для проверки длины строки
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}
checkStringLength('проверяемая строка', 20);

//Функция для проверки, является ли строка палиндромом
function checkIsPalindrome(string) {
  const joinString = string.replace(/\P{L}/gu, '').toLowerCase(); //Удаляем пробелы, цифры и символы в строке с помощью регулярного выражения и приводим в нижний регистр
  const length = joinString.length;
  for (let i = 0; i < length / 2; i++) {
    if (joinString[i] !== joinString[length - i - 1]) {
      return false;
    }
  }
  return true;
}
checkIsPalindrome('Лёша на полке клопа нашёл ');

//Функция, которая принимает аргумент и извлекает содержащиеся в нём цифры
function extractNumber(string) {
  if (typeof string === 'number') { //Делаем проверку на тип аргумента
    return Math.abs(string); //Возвращаем абсолютное число без "-"
  }
  const foundNumbers = string.match(/\d/g); //Ищем цифры и записываем в массив
  return foundNumbers ? parseInt(foundNumbers.join(''), 10) : NaN; //Делаем проверку. Выводим из массива и преобразуем в цифры
}
extractNumber(223);

/* Функция, которая принимает три параметра: исходную строку,
 минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины.
 Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться.
 Если «добивка» слишком длинная, она обрезается с конца. */
function padString (string, minLength, symbols) {
  const different = minLength - string.length;
  if (different <= 0) {
    return string;
  }
  const fragment = symbols.slice(0, different);
  const numberOfUses = Math.floor(different / symbols.length);
  const leftoverSymbols = symbols.slice(0, different % symbols.length);
  let stringOfCharacters = '';
  for (let i = 0; i < numberOfUses; i++) {
    stringOfCharacters += fragment;
  }
  return leftoverSymbols + stringOfCharacters + string;
}
padString('q', 4, 'we');

//Функция генератор получения случайных чисел из диапозона.
function getRandomPositiveInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

//Получаем случайный элемент из массива.
function getRandomArrayElement(elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

//Получаем случайное число из диапозона, которое не должно повторяться.
function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while(previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

//Функция которая возвращает разные комментарии.
function createComments() {
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${createRandomIdFromRangeGenerator(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAME),
  };
}


function createObjectsOfPhoto() {
  return {
    id: generatePhotoId(),
    url: `photos/${generatePhotoUrlId()}.jpg`,
    descriptions: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger(15, 200),
    comments: Array.from({length:getRandomPositiveInteger(1,2)}, createComments),
  };
}

export {getRandomPositiveInteger, createRandomIdFromRangeGenerator, createObjectsOfPhoto};
