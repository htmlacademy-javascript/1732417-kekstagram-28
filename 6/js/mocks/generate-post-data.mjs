import {DESCRIPTIONS, COMMENT_MESSAGES, OBJECTS_COUNT, USER_NAMES} from './const.mjs';
import {getRandomPositiveInteger, getRandomArrayElement, createRandomIdFromRangeGenerator} from './utils.mjs';

const generatePhotoId = createRandomIdFromRangeGenerator(1, OBJECTS_COUNT);
const generatePhotoUrlId = createRandomIdFromRangeGenerator(1, OBJECTS_COUNT);
const generateCommentId = createRandomIdFromRangeGenerator(1, 500);

//Функция которая возвращает разные комментарии.
function createComments() {
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(COMMENT_MESSAGES),
    name: getRandomArrayElement(USER_NAMES),
  };
}

function createObjectOfPhoto() {
  return {
    id: generatePhotoId(),
    url: `photos/${generatePhotoUrlId()}.jpg`,
    descriptions: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger(15, 200),
    comments: Array.from({length:getRandomPositiveInteger(1,20)}, createComments),
  };
}

function createPhotos(count) {
  return Array.from({length: count}, createObjectOfPhoto);
}

export {createPhotos};
