import {DESCRIPTIONS, MESSAGES, OBJECTS_COUNT, NAME} from './const.mjs';
import {getRandomPositiveInteger, getRandomArrayElement, createRandomIdFromRangeGenerator} from './utils.mjs';

const generatePhotoId = createRandomIdFromRangeGenerator(1, OBJECTS_COUNT);
const generatePhotoUrlId = createRandomIdFromRangeGenerator(1, OBJECTS_COUNT);
const generateCommentId = createRandomIdFromRangeGenerator(1, 500);

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
export {createPhotos};
