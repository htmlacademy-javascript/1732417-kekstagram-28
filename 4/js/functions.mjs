import {DESCRIPTIONS, MESSAGES, OBJECTS_COUNT, generateCommentId, generatePhotoId, generatePhotoUrlId, NAME} from './const.mjs';

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

function createPhotos() {
  return Array.from({length: OBJECTS_COUNT}, createObjectsOfPhoto);
}
export {getRandomPositiveInteger, createRandomIdFromRangeGenerator, createObjectsOfPhoto, createPhotos};
